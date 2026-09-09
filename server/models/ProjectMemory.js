import mongoose from 'mongoose';

const ProjectMemorySchema = new mongoose.Schema({
  timestamp: { type: String, required: true },
  user: { type: String, required: true },
  role: { type: String, default: 'Dev' },
  action: { type: String, required: true },
  type: { type: String, enum: ['file', 'status', 'task', 'alert'], required: true },
  meta: { type: String },
  iconType: { type: String, default: 'clock' },
  badgeColor: { type: String }
}, { timestamps: true });

export default mongoose.models.ProjectMemory || mongoose.model('ProjectMemory', ProjectMemorySchema);
