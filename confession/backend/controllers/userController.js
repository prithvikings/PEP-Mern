import User from '../models/user.models.js';
import Confession from '../models/Confession.models.js';

// @desc    Get User Profile (My Posts + Saved Posts)
// @route   GET /users/profile
export const getUserProfile = async (req, res) => {
  try {
    // 1. Get my posts
    const myConfessions = await Confession.find({ author: req.user.id })
      .sort({ createdAt: -1 })
      .select('-secretCodeHash -reactionHistory -reports');

    // 2. Get saved posts (Populate details)
    const user = await User.findById(req.user.id).populate({
      path: 'savedConfessions',
      select: '-secretCodeHash -reactionHistory -reports', // Exclude sensitive info
      match: { isHidden: false } // Don't show hidden posts
    });

    res.json({
      user: {
        displayName: req.user.displayName,
        email: req.user.email,
        avatar: req.user.avatar,
        role: req.user.role
      },
      myConfessions,
      savedConfessions: user.savedConfessions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Toggle Save Confession
// @route   POST /users/save/:id
export const toggleSaveConfession = async (req, res) => {
  try {
    const confessionId = req.params.id;
    const user = await User.findById(req.user.id);
    
    // Check if valid confession
    const confession = await Confession.findById(confessionId);
    if (!confession) return res.status(404).json({ message: 'Confession not found' });

    // Check if already saved
    const isSaved = user.savedConfessions.includes(confessionId);

    if (isSaved) {
      // Unsave
      user.savedConfessions = user.savedConfessions.filter(id => id.toString() !== confessionId);
    } else {
      // Save
      user.savedConfessions.push(confessionId);
    }

    await user.save();
    res.json({ saved: !isSaved }); // Return new status
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};