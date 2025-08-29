import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  proficiency: { type: Number, required: true, min: 1, max: 100 },
  icon: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);