import React, { useState } from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KPICards from './components/KPICards';
import IntelligentChangeAlert from './components/IntelligentChangeAlert';
import ProjectMemoryTimeline from './components/ProjectMemoryTimeline';
import ReassignModal from './components/ReassignModal';
import SimulateAlertModal from './components/SimulateAlertModal';
import ArchitectureModal from './components/ArchitectureModal';
import ToastContainer from './components/Toast';
import ProjectsView from './components/ProjectsView';
import TeamMembersView from './components/TeamMembersView';
import TasksView from './components/TasksView';
import SettingsView from './components/SettingsView';
import { Layers, HelpCircle, ChevronRight, FolderKanban } from 'lucide-react';

function DashboardContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeTab, selectedProject, setArchitectureModalOpen } = useDashboard();

  return (
    <div className="flex h-screen bg-slate-100/70 text-slate-800 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Outer Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header setMobileOpen={setMobileOpen} />

        {/* Scrollable Workspace View */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Context Subheader */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <FolderKanban className="w-3.5 h-3.5 text-blue-600" /> PROJECT OVERVIEW:
                </span>
                <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  {selectedProject ? selectedProject.name : 'E-Commerce Platform'}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  Status: Active
                </span>
                <button
                  onClick={() => setArchitectureModalOpen(true)}
                  className="hidden sm:flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-blue-600 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Node.js / MongoDB Logic</span>
                </button>
              </div>
            </div>

            {/* Dynamic View Rendering based on activeTab */}
            {activeTab === 'dashboard' && (
              <>
                {/* KPI Cards (Top Row) */}
                <KPICards />

                {/* Main 2-Column Responsive Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Hero Section: Intelligent Change Alert (Left / Main Col - 7 cols) */}
                  <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                    <IntelligentChangeAlert />
                  </div>

                  {/* Right Column: Project Memory Timeline (Right Col - 5 cols) */}
                  <div className="lg:col-span-5 xl:col-span-4 h-full">
                    <ProjectMemoryTimeline />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'projects' && <ProjectsView />}
            {activeTab === 'team' && <TeamMembersView />}
            {activeTab === 'tasks' && <TasksView />}
            {activeTab === 'settings' && <SettingsView />}
          </div>
        </main>
      </div>

      {/* Global Dialog Modals & Toasts */}
      <ReassignModal />
      <SimulateAlertModal />
      <ArchitectureModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
