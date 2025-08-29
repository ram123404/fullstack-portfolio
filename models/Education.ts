import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String },
  gpa: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Education || mongoose.model('Education', EducationSchema);