import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  detailedContent: { type: String, required: true },
  image: { type: String, required: true },
  images: [{ type: String }],
  technologies: [{ type: String }],
  githubUrl: { type: String },
  liveUrl: { type: String },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['completed', 'in-progress', 'planned'], default: 'completed' },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);