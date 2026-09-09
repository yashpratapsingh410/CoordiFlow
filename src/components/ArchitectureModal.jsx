import React, { useState } from 'react';
import { X, Database, Server, Code, Layers, ArrowRight, CheckCircle2, Copy } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function ArchitectureModal() {
  const { architectureModalOpen, setArchitectureModalOpen, addToast } = useDashboard();
  const [activeTab, setActiveTab] = useState('diagram');

  if (!architectureModalOpen) return null;

  const expressCode = `// Node.js + Express Controller: /api/alerts/impact-analysis
const express = require('express');
const router = express.Router();
const ChangeEvent = require('../models/ChangeEvent');
const ProjectMemory = require('../models/ProjectMemory');

// Trigger intelligent change alert & calculate stakeholder cascade
router.post('/impact-analysis', async (req, res) => {
  try {
    const { projectId, newDeadline, oldDeadline, managerName } = req.body;
    
    // Rule Engine: Query dependent tasks blocked by date shift
    const highImpactTasks = await Task.find({ projectId, dependenciesRequired: true });
    
    const changeAlert = new ChangeEvent({
      eventTitle: \`Project Deadline Changed: \${oldDeadline} → \${newDeadline}\`,
      triggeredBy: managerName,
      impacts: highImpactTasks.map(t => ({
        severity: t.priority === 'CRITICAL' ? 'HIGH' : 'MEDIUM',
        taskName: \`\${t.title} (Delayed)\`,
        stakeholder: t.assignedTo
      }))
    });
    
    await changeAlert.save();
    res.status(200).json({ success: true, alert: changeAlert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});`;

  const mongooseCode = `// MongoDB Mongoose Schemas (CoordiFlow Engine)
const mongoose = require('mongoose');

const ImpactSchema = new mongoose.Schema({
  severity: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], required: true },
  taskName: { type: String, required: true },
  affectedStakeholder: { type: String, required: true },
  notified: { type: Boolean, default: false },
  reassignedTo: { type: String }
});

const ChangeEventSchema = new mongoose.Schema({
  eventTitle: { type: String, required: true },
  triggeredBy: { type: String, required: true },
  project: { type: String, required: true },
  impacts: [ImpactSchema]
}, { timestamps: true });

const ProjectMemorySchema = new mongoose.Schema({
  timestamp: { type: String, required: true },
  user: { type: String, required: true },
  action: { type: String, required: true },
  type: { type: String, enum: ['file', 'status', 'task', 'alert'], required: true }
}, { timestamps: true });

module.exports = {
  ChangeEvent: mongoose.model('ChangeEvent', ChangeEventSchema),
  ProjectMemory: mongoose.model('ProjectMemory', ProjectMemorySchema)
};`;

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    addToast('Code snippet copied to clipboard!', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
        onClick={() => setArchitectureModalOpen(false)}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full p-6 z-10 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Database className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                CoordiFlow Architecture & Backend Guide
              </h3>
              <p className="text-xs text-slate-500">
                Node.js / Express REST API & MongoDB Schema Documentation
              </p>
            </div>
          </div>
          <button
            onClick={() => setArchitectureModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4 shrink-0">
          <button
            onClick={() => setActiveTab('diagram')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'diagram'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Architecture Flow Diagram
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'routes'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Node.js / Express Route
          </button>
          <button
            onClick={() => setActiveTab('schemas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'schemas'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            MongoDB Mongoose Schemas
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto pr-1">
          {activeTab === 'diagram' && (
            <div className="space-y-6 text-xs">
              {/* Architecture Diagram Box */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
                <h4 className="font-bold text-sky-400 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4" /> MERN Stack Data Flow
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 mx-auto flex items-center justify-center mb-2">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h5 className="font-bold text-slate-200">React Frontend</h5>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Dashboard UI, Impact Cards, Project Memory Timeline
                    </p>
                  </div>

                  <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 relative">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-2">
                      <Server className="w-4 h-4" />
                    </div>
                    <h5 className="font-bold text-slate-200">Node.js / Express</h5>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Impact Rule Cascade Engine & REST Controllers
                    </p>
                  </div>

                  <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-2">
                      <Database className="w-4 h-4" />
                    </div>
                    <h5 className="font-bold text-slate-200">MongoDB Database</h5>
                    <p className="text-[11px] text-slate-400 mt-1">
                      ChangeEvents, ProjectMemory, Tasks & Users
                    </p>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Logic */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-blue-900 text-sm">
                  Impact Identification Logic Engine
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-slate-700 leading-relaxed">
                  <li>
                    <span className="font-semibold">Event Trigger:</span> Manager changes deadline (e.g. 20 Sept → 25 Sept).
                  </li>
                  <li>
                    <span className="font-semibold">Dependency Evaluation:</span> Backend queries dependent API services & UI tasks linked to the project.
                  </li>
                  <li>
                    <span className="font-semibold">Severity Mapping:</span> Tasks blocking critical paths are marked 🔴 HIGH Impact; non-blocking docs are 🟡 MEDIUM Impact.
                  </li>
                  <li>
                    <span className="font-semibold">Stakeholder Cascade:</span> Notifies Pushkar (Tester) & Saksham (Designer) while updating Project Memory timeline.
                  </li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'routes' && (
            <div className="relative">
              <button
                onClick={() => handleCopyCode(expressCode)}
                className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 border border-slate-700"
              >
                <Copy className="w-3 h-3" /> Copy
              </button>
              <pre className="bg-slate-950 text-slate-100 p-4 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                {expressCode}
              </pre>
            </div>
          )}

          {activeTab === 'schemas' && (
            <div className="relative">
              <button
                onClick={() => handleCopyCode(mongooseCode)}
                className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 border border-slate-700"
              >
                <Copy className="w-3 h-3" /> Copy
              </button>
              <pre className="bg-slate-950 text-slate-100 p-4 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                {mongooseCode}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
