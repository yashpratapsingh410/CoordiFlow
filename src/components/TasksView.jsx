import React from 'react';
import { CheckSquare, AlertCircle, Clock, UserCheck } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function TasksView() {
  const { tasks, searchQuery, openReassignModal } = useDashboard();

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.assignee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Project Tasks Board</h2>
          <p className="text-xs text-slate-500">Track pending tasks & impact dependencies</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="p-4">Task Name</th>
                <th className="p-4">Assignee</th>
                <th className="p-4">Impact Level</th>
                <th className="p-4">Status</th>
                <th className="p-4">Due Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredTasks.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{t.title}</td>
                  <td className="p-4">{t.assignee}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-md font-mono font-bold text-[10px] ${
                        t.impact === 'HIGH'
                          ? 'bg-rose-100 text-rose-800'
                          : t.impact === 'MEDIUM'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {t.impact}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        t.status === 'Delayed'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : t.status === 'In-Progress'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono">{t.dueDate}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() =>
                        openReassignModal({
                          id: t.id,
                          taskName: t.title,
                          affectedStakeholder: t.assignee,
                          stakeholderRole: 'Assignee'
                        })
                      }
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
                    >
                      Re-assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
