import React from 'react';
import { FolderKanban, ClipboardList, AlertTriangle, Activity } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function KPICards() {
  const { kpiStats, changeAlert } = useDashboard();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
      {/* KPI 1: Active Projects */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Projects
          </span>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FolderKanban className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-black text-slate-900 tracking-tight">
            {String(kpiStats.activeProjects).padStart(2, '0')}
          </span>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            +1 this month
          </span>
        </div>
        <p className="text-xs text-slate-500 truncate">
          Active: E-Commerce, Hospital App, Portfolio...
        </p>
      </div>

      {/* KPI 2: Pending Tasks */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Pending Tasks
          </span>
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ClipboardList className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-black text-slate-900 tracking-tight">
            {kpiStats.pendingTasks}
          </span>
          <span className="text-xs font-medium text-slate-400">across 4 sprints</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mt-2 flex">
          <div className="bg-red-500 w-1/4" title="4 High Priority" />
          <div className="bg-amber-500 w-2/4" title="8 Medium Priority" />
          <div className="bg-blue-500 w-1/4" title="5 Low Priority" />
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5 flex justify-between">
          <span>4 High</span> <span>8 Med</span> <span>5 Low</span>
        </p>
      </div>

      {/* KPI 3: Alerts (Highlighted in Yellow/Amber as required) */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl p-5 border-2 border-amber-300 shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-200/30 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center justify-between mb-3 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
            Alerts
          </span>
          <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-700 flex items-center justify-center group-hover:rotate-12 transition-transform">
            <AlertTriangle className="w-5 h-5 fill-amber-400 text-amber-800" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-1 relative z-10">
          <span className="text-3xl font-black text-amber-950 tracking-tight">
            {String(kpiStats.alerts).padStart(2, '0')}
          </span>
          <span className="text-xs font-bold text-amber-800 bg-amber-200/70 border border-amber-300 px-2 py-0.5 rounded-full animate-pulse-subtle">
            Active Shift
          </span>
        </div>
        <p className="text-xs font-medium text-amber-800 truncate relative z-10">
          {changeAlert ? changeAlert.eventTitle : 'Recent change detected'}
        </p>
      </div>

      {/* KPI 4: Coordination Intelligence Score (Hidden on small mobile, visible on desktop) */}
      <div className="hidden xl:block bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Coordination Score
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-black text-slate-900 tracking-tight">94%</span>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            Optimal
          </span>
        </div>
        <p className="text-xs text-slate-500 truncate">
          0 unhandled black-hole delays
        </p>
      </div>
    </div>
  );
}
