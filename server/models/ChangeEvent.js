import mongoose from 'mongoose';

const ImpactSchema = new mongoose.Schema({
  id: { type: String },
  severity: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], required: true },
  taskName: { type: String, required: true },
  affectedStakeholder: { type: String, required: true },
  stakeholderRole: { type: String, required: true },
  stakeholderAvatar: { type: String },
  notified: { type: Boolean, default: false },
  reassigned: { type: Boolean, default: false },
  assignedTo: { type: String },
  impactDetails: { type: String },
  actionButtons: [{ type: String }]
});

const ChangeEventSchema = new mongoose.Schema({
  eventTitle: { type: String, required: true },
  triggeredBy: { type: String, required: true },
  triggerRole: { type: String, default: 'Manager' },
  triggerAvatar: { type: String },
  reason: { type: String },
  project: { type: String, default: 'E-Commerce Platform' },
  impacts: [ImpactSchema]
}, { timestamps: true });

export default mongoose.models.ChangeEvent || mongoose.model('ChangeEvent', ChangeEventSchema);
