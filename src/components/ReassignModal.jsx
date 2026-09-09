import React, { useState } from 'react';
import { X, UserCheck, UserPlus, AlertTriangle } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function ReassignModal() {
  const {
    reassignModalOpen,
    setReassignModalOpen,
    impactToReassign,
    teamMembers,
    submitReassignment
  } = useDashboard();

  const [selectedMember, setSelectedMember] = useState('Yash (Dev)');
  const [note, setNote] = useState('');

  if (!reassignModalOpen || !impactToReassign) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitReassignment(impactToReassign.id, selectedMember, note);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setReassignModalOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Re-assign Task</h3>
              <p className="text-xs text-slate-500">Coordination Intelligence Module</p>
            </div>
          </div>
          <button
            onClick={() => setReassignModalOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 mb-4 text-xs">
          <div className="flex items-center gap-1.5 text-rose-800 font-bold mb-1">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            Impacted Task: {impactToReassign.taskName}
          </div>
          <p className="text-rose-700">
            Currently assigned to <span className="font-bold">{impactToReassign.affectedStakeholder} ({impactToReassign.stakeholderRole})</span>. Re-assigning will update workload & log audit trail.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select New Owner
            </label>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-600"
            >
              {teamMembers.map((m) => (
                <option key={m.id} value={`${m.name} (${m.role})`}>
                  {m.name} ({m.role}) - {m.activeTasks} Active Tasks
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Re-assignment Note / Context (Optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="e.g. Reassigned to prevent Auth bottleneck while Priya works on QA suite."
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-purple-600 text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setReassignModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              Confirm Re-assign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
