import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isBanned: { type: Boolean, default: false },
  // NEW: Track saved posts
  savedConfessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Confession' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', UserSchema);