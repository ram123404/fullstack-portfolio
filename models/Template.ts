import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  sections: [{ type: String }],
  colorScheme: {
    primary: { type: String, required: true },
    secondary: { type: String, required: true },
    accent: { type: String, required: true },
  },
  features: [{ type: String }],
  preview: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Template || mongoose.model('Template', TemplateSchema);