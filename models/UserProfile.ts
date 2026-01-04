import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  selectedTemplate: { type: String, required: true, default: 'developer' },
  username: { type: String, required: true, unique: true },
  customizations: {
    colorScheme: {
      primary: { type: String },
      secondary: { type: String },
      accent: { type: String },
    },
    layout: {
      showBlog: { type: Boolean, default: false },
      showTestimonials: { type: Boolean, default: false },
      showCertifications: { type: Boolean, default: false },
    },
  },
  seoSettings: {
    title: { type: String },
    description: { type: String },
    keywords: [{ type: String }],
  },
}, {
  timestamps: true,
});

export default mongoose.models.UserProfile || mongoose.model('UserProfile', UserProfileSchema);