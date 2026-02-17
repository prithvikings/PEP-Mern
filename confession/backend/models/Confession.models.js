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
  reactions: {
    like: { type: Number, default: 0 },
    love: { type: Number, default: 0 },
    laugh: { type: Number, default: 0 }
  },
  reactionHistory: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      type: { type: String, enum: ['like', 'love', 'laugh'] }
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

ConfessionSchema.index({ createdAt: -1 });
ConfessionSchema.index({ 'reactions.like': -1 });

export default mongoose.model('Confession', ConfessionSchema);