import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, default: 'Active' },
  deadline: { type: String, required: true },
  description: { type: String },
  tasksCount: { type: Number, default: 0 },
  teamCount: { type: Number, default: 0 },
  progress: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
