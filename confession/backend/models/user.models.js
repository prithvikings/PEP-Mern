import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isBanned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Use export default
export default mongoose.model('User', UserSchema);