import mongoose from 'mongoose';

const SocialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, required: true },
  order: { type: Number, default: 0 },
}, {
  timestamps: true,
});

export default mongoose.models.SocialLink || mongoose.model('SocialLink', SocialLinkSchema);