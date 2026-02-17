import Confession from '../models/Confession.models.js'; // Ensure .js extension
import bcrypt from 'bcryptjs';

// Helper for alias
const animals = ['Tiger', 'Lion', 'Eagle', 'Shark', 'Panda', 'Wolf', 'Fox'];
const adjectives = ['Anonymous', 'Secret', 'Hidden', 'Silent', 'Mysterious'];
const generateAlias = () => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const num = Math.floor(Math.random() * 1000);
  return `${adj} ${animal} #${num}`;
};

export const getConfessions = async (req, res) => {
  try {
    const { sort, tag, page = 1 } = req.query;
    const limit = 10;
    const query = { isHidden: false };
    
    if (tag) query.tags = tag;

    let sortOption = { createdAt: -1 }; 
    if (sort === 'popular') sortOption = { 'reactions.like': -1 };
    if (sort === 'oldest') sortOption = { createdAt: 1 };

    const confessions = await Confession.find(query)
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-reactionHistory -reports');

    const count = await Confession.countDocuments(query);

    res.json({
      confessions,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createConfession = async (req, res) => {
  try {
    const { text, secretCode, tags } = req.body;

    if (!text || !secretCode || secretCode.length < 4) {
      return res.status(400).json({ message: 'Text and 4-char secret code required' });
    }

    const salt = await bcrypt.genSalt(10);
    const secretCodeHash = await bcrypt.hash(secretCode, salt);

    const newConfession = await Confession.create({
      text,
      secretCodeHash,
      author: req.user.id,
      alias: generateAlias(),
      tags: tags || ['Other']
    });

    res.status(201).json(newConfession);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const reactToConfession = async (req, res) => {
  try {
    const { type } = req.body; 
    if (!['like', 'love', 'laugh'].includes(type)) {
      return res.status(400).json({ message: 'Invalid reaction type' });
    }

    const confession = await Confession.findById(req.params.id);
    if (!confession) return res.status(404).json({ message: 'Confession not found' });

    const existingReactionIndex = confession.reactionHistory.findIndex(
      (r) => r.userId.toString() === req.user.id
    );

    if (existingReactionIndex !== -1) {
      const oldType = confession.reactionHistory[existingReactionIndex].type;
      confession.reactions[oldType] = Math.max(0, confession.reactions[oldType] - 1);
      
      if (oldType === type) {
        confession.reactionHistory.splice(existingReactionIndex, 1);
      } else {
        confession.reactions[type] += 1;
        confession.reactionHistory[existingReactionIndex].type = type;
      }
    } else {
      confession.reactions[type] += 1;
      confession.reactionHistory.push({ userId: req.user.id, type });
    }

    await confession.save();
    res.json(confession.reactions);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const editConfession = async (req, res) => {
  try {
    const { secretCode, text } = req.body;
    const confession = await Confession.findById(req.params.id).select('+secretCodeHash');

    if (!confession) return res.status(404).json({ message: 'Not found' });

    if (confession.author.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isMatch = await bcrypt.compare(secretCode, confession.secretCodeHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid Secret Code' });

    confession.text = text || confession.text;
    await confession.save();

    res.json(confession);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteConfession = async (req, res) => {
  try {
    const { secretCode } = req.body;
    const confession = await Confession.findById(req.params.id).select('+secretCodeHash');

    if (!confession) return res.status(404).json({ message: 'Not found' });

    if (confession.author.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isMatch = await bcrypt.compare(secretCode, confession.secretCodeHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid Secret Code' });

    await confession.deleteOne();
    res.json({ message: 'Confession deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const reportConfession = async (req, res) => {
  try {
    const { reason } = req.body;
    const confession = await Confession.findById(req.params.id);
    
    if (!confession) return res.status(404).json({ message: 'Not found' });

    const alreadyReported = confession.reports.find(r => r.userId.toString() === req.user.id);
    if (alreadyReported) return res.status(400).json({ message: 'You already reported this' });

    confession.reports.push({ userId: req.user.id, reason });
    
    if (confession.reports.length >= 5) {
        confession.isHidden = true;
    }

    await confession.save();
    res.json({ message: 'Report submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};