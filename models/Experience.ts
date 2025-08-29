import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String, required: true },
  location: { type: String },
  technologies: [{ type: String }],
}, {
  timestamps: true,
});

export default mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);