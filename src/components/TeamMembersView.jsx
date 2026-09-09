import React from 'react';
import { Users, Mail, CheckCircle, Clock } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function TeamMembersView() {
  const { teamMembers, searchQuery, addToast } = useDashboard();

  const filteredMembers = teamMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Team Members & Stakeholders</h2>
        <p className="text-xs text-slate-500">Coordination status, active workload & role permissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredMembers.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center"
          >
            <div className="relative mb-3">
              <img
                src={m.avatar}
                alt={m.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 shadow-xs"
              />
              <span
                className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${
                  m.status === 'Online'
                    ? 'bg-emerald-500'
                    : m.status === 'Busy'
                    ? 'bg-amber-500'
                    : 'bg-slate-400'
                }`}
              />
            </div>

            <h3 className="font-extrabold text-slate-900 text-base">{m.name}</h3>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md mb-2">
              {m.role}
            </span>
            <p className="text-xs text-slate-400 mb-4">{m.email}</p>

            <div className="w-full bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Active Tasks:</span>
                <span className="font-bold text-slate-800">{m.activeTasks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Completed:</span>
                <span className="font-bold text-emerald-600">{m.completedTasks}</span>
              </div>
            </div>

            <button
              onClick={() => addToast(`Direct notification dispatched to ${m.name}`, 'info')}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" /> Message {m.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
