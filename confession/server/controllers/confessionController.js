import Confession from "../models/Confession.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";

export const getConfessions = async (req, res) => {
  const { page = 1, limit = 20, sort = "latest", topic, search } = req.query;
  let query = {};

  // 1. Text Search Logic
  if (search) {
    query.$text = { $search: search };
  }

  // 2. Exact Topic Filter (if user clicks a category tag)
  if (topic) {
    query.topic = topic;
  }

  // 3. Sorting logic with Meta Score
  // If searching, we sort by "relevance" (textScore) unless "latest" is explicitly requested
  let sortOption = { createdAt: -1 };

  if (search && sort === "relevance") {
    sortOption = { score: { $meta: "textScore" } };
  } else if (sort === "popular") {
    sortOption = { upvotes: -1, views: -1 };
  }

  const confessions = await Confession.find(
    query,
    search ? { score: { $meta: "textScore" } } : {}, // Project score if searching
  )
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean();

  res.status(200).json({
    success: true,
    results: confessions.length,
    data: confessions,
  });
};

export const getTrending = async (req, res) => {
  // We only consider posts from the last 7 days to keep it relevant
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const trending = await Confession.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo },
        status: "Public",
      },
    },
    {
      $addFields: {
        // Calculate hours since post
        hoursPassed: {
          $divide: [
            { $subtract: [new Date(), "$createdAt"] },
            3600000, // Convert milliseconds to hours
          ],
        },
      },
    },
    {
      $addFields: {
        trendingScore: {
          $divide: [
            {
              $add: [
                "$upvotes",
                { $multiply: ["$commentsCount", 2] },
                1, // Base score of 1 to avoid 0
              ],
            },
            { $pow: [{ $add: ["$hoursPassed", 2] }, 1.5] }, // Gravity = 1.5
          ],
        },
      },
    },
    { $sort: { trendingScore: -1 } },
    { $limit: 15 }, // Only return top 15 trending items
    {
      $project: {
        secretCode: 0, // Never leak this
        trendingScore: 0, // Hide the internal score from the frontend
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: trending,
  });
};
export const createConfession = async (req, res) => {
  const { content, topic, secretCode } = req.body;

  if (!content || !topic || !secretCode || secretCode.length !== 4) {
    throw new AppError(
      "Invalid input. A 4-digit secret code is required.",
      400,
    );
  }

  const hashedSecret = await bcrypt.hash(secretCode, 10);

  const confession = await Confession.create({
    content,
    topic,
    authorId: req.user._id,
    authorAlias: req.user.alias,
    authorAvatar: req.user.avatarSeed,
    secretCode: hashedSecret,
  });

  confession.secretCode = undefined;
  res.status(201).json({ success: true, data: confession });
};

export const getConfession = async (req, res) => {
  const confession = await Confession.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true },
  ).lean();

  if (!confession) throw new AppError("Confession not found", 404);

  res.status(200).json({ success: true, data: confession });
};

export const updateConfession = async (req, res) => {
  const { content, secretCode } = req.body;
  const confession = await Confession.findById(req.params.id).select(
    "+secretCode",
  );

  if (!confession) throw new AppError("Confession not found", 404);
  if (confession.authorId.toString() !== req.user._id.toString()) {
    throw new AppError("Unauthorized action", 403);
  }

  const isMatch = await bcrypt.compare(secretCode, confession.secretCode);
  if (!isMatch) throw new AppError("Invalid secret code", 401);

  confession.content = content || confession.content;
  await confession.save();

  confession.secretCode = undefined;
  res.status(200).json({ success: true, data: confession });
};

export const deleteConfession = async (req, res) => {
  const { secretCode } = req.body;
  const confession = await Confession.findById(req.params.id).select(
    "+secretCode",
  );

  if (!confession) throw new AppError("Confession not found", 404);
  if (confession.authorId.toString() !== req.user._id.toString()) {
    throw new AppError("Unauthorized action", 403);
  }

  const isMatch = await bcrypt.compare(secretCode, confession.secretCode);
  if (!isMatch) throw new AppError("Invalid secret code", 401);

  await confession.deleteOne();
  res.status(200).json({ success: true, message: "Confession deleted" });
};

export const voteConfession = async (req, res) => {
  const { action } = req.body;
  if (!["upvote", "downvote"].includes(action))
    throw new AppError("Invalid action", 400);

  const incrementField =
    action === "upvote" ? { upvotes: 1 } : { downvotes: 1 };

  const confession = await Confession.findByIdAndUpdate(
    req.params.id,
    { $inc: incrementField },
    { new: true },
  );

  if (!confession) throw new AppError("Confession not found", 404);
  res.status(200).json({ success: true, data: confession });
};
