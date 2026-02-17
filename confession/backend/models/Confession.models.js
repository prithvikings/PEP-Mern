import mongoose from 'mongoose';

const ConfessionSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: [true, 'Confession text is required'], 
    maxlength: [1000, 'Confession cannot exceed 1000 characters']
  },
  secretCodeHash: { 
    type: String, 
    required: true,
    select: false 
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  alias: { type: String, default: 'Anonymous' },
  tags: {
    type: [String],
    enum: ['College', 'Relationships', 'Family', 'Funny', 'Dark', 'Mental Health', 'Other'],
    default: ['Other']
  },
  // NEW: Voting System
  score: { type: Number, default: 0 }, // Useful for sorting (upvotes - downvotes)
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  
  // Track user votes: [{ userId: '123', vote: 1 }] (1 = up, -1 = down)
  voteHistory: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      vote: { type: Number, enum: [1, -1] } // 1 for Up, -1 for Down
    }
  ],
  views: { type: Number, default: 0 },
  reports: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      reason: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  isHidden: { type: Boolean, default: false }, 
}, { timestamps: true });

// Index for sorting by Score (Trending/Popular)
ConfessionSchema.index({ score: -1 });
ConfessionSchema.index({ createdAt: -1 });

export default mongoose.model('Confession', ConfessionSchema);