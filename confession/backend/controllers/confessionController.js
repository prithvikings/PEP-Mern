import Confession from "../models/Confession.models.js"; // Ensure .js extension
import bcrypt from "bcryptjs";

// Helper for alias
const animals = ["Tiger", "Lion", "Eagle", "Shark", "Panda", "Wolf", "Fox"];
const adjectives = ["Anonymous", "Secret", "Hidden", "Silent", "Mysterious"];
const generateAlias = () => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const num = Math.floor(Math.random() * 1000);
  return `${adj} ${animal} #${num}`;
};

export const getConfessions = async (req, res) => {
  try {
    const { sort, topic, search, page = 1 } = req.query;
    const limit = 10;

    // 1. Build Query Object
    let query = { isHidden: false };

    // Topic filtering (Frontend sends 'topic', not 'tag')
    if (topic && topic !== "All") {
      query.topic = topic;
    }

    // Text Search Logic
    if (search) {
      query.$text = { $search: search };
    }

    // 2. Sorting Logic
    let sortOption = { createdAt: -1 }; // Default: Latest

    if (search) {
      // If searching, sort by text relevance score
      sortOption = { score: { $meta: "textScore" } };
    } else if (sort === "popular") {
      // Sort by upvotes (or whatever your popularity metric is)
      sortOption = { upvotes: -1, createdAt: -1 };
    } else if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    // 3. Execute Query
    const confessions = await Confession.find(
      query,
      search ? { score: { $meta: "textScore" } } : {}, // Project score if searching
    )
      .sort(sortOption)
      .limit(limit)
      .skip((page - 1) * limit)
      .select("-reactionHistory -reports -secretCode");

    const totalConfessions = await Confession.countDocuments(query);

    // 4. Response (Matched to your Frontend expectation: { success: true, data: [] })
    res.json({
      success: true,
      data: confessions,
      pagination: {
        total: totalConfessions,
        totalPages: Math.ceil(totalConfessions / limit),
        currentPage: Number(page),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const createConfession = async (req, res) => {
  try {
    const { text, secretCode, tags } = req.body;

    if (!text || !secretCode || secretCode.length < 4) {
      return res
        .status(400)
        .json({ message: "Text and 4-char secret code required" });
    }

    const salt = await bcrypt.genSalt(10);
    const secretCodeHash = await bcrypt.hash(secretCode, salt);

    const newConfession = await Confession.create({
      text,
      secretCodeHash,
      author: req.user.id,
      alias: generateAlias(),
      tags: tags || ["Other"],
    });

    res.status(201).json(newConfession);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
// @desc    Vote on confession (Up/Down) with "Floor 0" Logic
// @route   POST /confessions/:id/vote
export const voteConfession = async (req, res) => {
  try {
    const { type } = req.body; // 'up' or 'down'
    if (!["up", "down"].includes(type)) {
      return res.status(400).json({ message: "Invalid vote type" });
    }

    const confession = await Confession.findById(req.params.id);
    if (!confession)
      return res.status(404).json({ message: "Confession not found" });

    const userId = req.user.id;
    const voteValue = type === "up" ? 1 : -1;

    // Check existing vote
    const existingVoteIndex = confession.voteHistory.findIndex(
      (v) => v.userId.toString() === userId,
    );

    if (existingVoteIndex !== -1) {
      // --- USER HAS VOTED BEFORE ---
      const previousVote = confession.voteHistory[existingVoteIndex].vote;

      if (previousVote === voteValue) {
        // 1. TOGGLE OFF (Remove vote)
        // e.g., Click Up when already Upvoted -> Remove Up
        confession.voteHistory.splice(existingVoteIndex, 1);
        if (voteValue === 1)
          confession.upvotes = Math.max(0, confession.upvotes - 1);
        else confession.downvotes = Math.max(0, confession.downvotes - 1);
      } else {
        // 2. SWITCH VOTE (Swap)
        // e.g., Click Down when Upvoted
        confession.voteHistory[existingVoteIndex].vote = voteValue;
        if (voteValue === 1) {
          // Switch Down -> Up
          confession.upvotes++;
          confession.downvotes = Math.max(0, confession.downvotes - 1);
        } else {
          // Switch Up -> Down
          confession.upvotes = Math.max(0, confession.upvotes - 1);
          confession.downvotes++;
        }
      }
    } else {
      // --- NEW VOTE ---
      // 3. ADD NEW VOTE
      confession.voteHistory.push({ userId, vote: voteValue });
      if (voteValue === 1) confession.upvotes++;
      else confession.downvotes++;
    }

    // --- CRITICAL LOGIC: PREVENT NEGATIVE SCORE ---
    // Recalculate score before saving
    confession.score = confession.upvotes - confession.downvotes;

    if (confession.score < 0) {
      // If the action resulted in a negative score, we REJECT it.
      // We do not save. The user's vote is effectively ignored.
      return res.status(400).json({ message: "Score cannot go below zero." });
    }

    await confession.save();

    res.json({
      score: confession.score,
      upvotes: confession.upvotes,
      downvotes: confession.downvotes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ... keep other functions ...
export const editConfession = async (req, res) => {
  try {
    const { secretCode, text } = req.body;
    const confession = await Confession.findById(req.params.id).select(
      "+secretCodeHash",
    );

    if (!confession) return res.status(404).json({ message: "Not found" });

    if (confession.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isMatch = await bcrypt.compare(secretCode, confession.secretCodeHash);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Secret Code" });

    confession.text = text || confession.text;
    await confession.save();

    res.json(confession);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteConfession = async (req, res) => {
  try {
    const { secretCode } = req.body;
    const confession = await Confession.findById(req.params.id).select(
      "+secretCodeHash",
    );

    if (!confession) return res.status(404).json({ message: "Not found" });

    if (confession.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isMatch = await bcrypt.compare(secretCode, confession.secretCodeHash);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Secret Code" });

    await confession.deleteOne();
    res.json({ message: "Confession deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const reportConfession = async (req, res) => {
  try {
    const { reason } = req.body;
    const confession = await Confession.findById(req.params.id);

    if (!confession) return res.status(404).json({ message: "Not found" });

    const alreadyReported = confession.reports.find(
      (r) => r.userId.toString() === req.user.id,
    );
    if (alreadyReported)
      return res.status(400).json({ message: "You already reported this" });

    confession.reports.push({ userId: req.user.id, reason });

    if (confession.reports.length >= 5) {
      confession.isHidden = true;
    }

    await confession.save();
    res.json({ message: "Report submitted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
