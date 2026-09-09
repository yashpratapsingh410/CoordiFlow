import React from 'react';
import { FolderKanban, Clock, Users, CheckCircle, ArrowUpRight } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function ProjectsView() {
  const { projects, setSelectedProject, setActiveTab, searchQuery } = useDashboard();

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Active Projects</h2>
          <p className="text-xs text-slate-500">Manage construction & architecture project workflows</p>
        </div>
        <button
          onClick={() => alert('New project wizard feature available in production build')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs"
        >
          + Create New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                  {project.code}
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {project.status}
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">{project.name}</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span>Overall Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Deadline: {project.deadline}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" /> {project.teamCount} Members
                </span>
              </div>

              <button
                onClick={() => {
                  setSelectedProject(project);
                  setActiveTab('dashboard');
                }}
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 flex items-center justify-center gap-1 transition-colors"
              >
                <span>Select for Coordination View</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
