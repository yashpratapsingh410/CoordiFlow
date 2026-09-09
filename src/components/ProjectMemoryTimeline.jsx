import React, { useState } from 'react';
import {
  Clock,
  FileText,
  CheckCircle2,
  PlusCircle,
  Send,
  History,
  User,
  Filter,
  Plus
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function ProjectMemoryTimeline() {
  const { projectMemory, addProjectMemoryItem } = useDashboard();
  const [newLogText, setNewLogText] = useState('');
  const [logType, setLogType] = useState('status');
  const [filterType, setFilterType] = useState('all');

  const handleLogSubmit = (e) => {
    e.preventDefault();
    if (!newLogText.trim()) return;
    addProjectMemoryItem(newLogText.trim(), logType);
    setNewLogText('');
  };

  const filteredMemory = projectMemory.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col h-full">
      {/* Timeline Card Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
            <History className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 tracking-tight">
              PROJECT MEMORY
            </h3>
            <span className="text-xs text-slate-400 block -mt-0.5">
              Historical Timeline & Event Audit Trail
            </span>
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-600 font-semibold focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Events</option>
            <option value="file">Files</option>
            <option value="status">Status</option>
            <option value="task">Tasks</option>
            <option value="alert">Alerts</option>
          </select>
        </div>
      </div>

      {/* Vertical Timeline Track */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-6 relative before:absolute before:top-2 before:bottom-2 before:left-[17px] before:w-0.5 before:bg-slate-200">
        {filteredMemory.map((item) => {
          let IconComponent = Clock;
          if (item.type === 'file') IconComponent = FileText;
          if (item.type === 'task') IconComponent = PlusCircle;
          if (item.type === 'alert') IconComponent = Send;

          return (
            <div key={item.id} className="relative flex items-start gap-4 group">
              {/* Timeline Node Icon Circle */}
              <div className="relative z-10 w-9 h-9 rounded-full bg-white border-2 border-slate-900 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                <IconComponent className="w-4 h-4 text-slate-800" />
              </div>

              {/* Memory Item Details Card */}
              <div className="flex-1 bg-slate-50/70 hover:bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded-md">
                    {item.timestamp}
                  </span>
                  {item.badgeColor && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                      {item.type.toUpperCase()}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-800 font-medium leading-snug">
                  <span className="font-bold text-slate-900">{item.user}</span>{' '}
                  {item.action}
                </p>

                {item.meta && (
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">
                    {item.meta}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Add Log Activity Form */}
      <form onSubmit={handleLogSubmit} className="mt-5 pt-4 border-t border-slate-100 space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Log Activity to Project Memory
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newLogText}
            onChange={(e) => setNewLogText(e.target.value)}
            placeholder="e.g. Yash completed API testing guidelines..."
            className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-800 placeholder-slate-400"
          />
          <button
            type="submit"
            className="p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors shadow-xs"
            title="Add Log"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
