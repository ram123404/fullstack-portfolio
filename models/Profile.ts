import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  shortBio: { type: String, required: true },
  location: { type: String, required: true },
  profileImage: { type: String, required: true },
  resumeUrl: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);