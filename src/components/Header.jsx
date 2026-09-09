import React, { useState } from 'react';
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  User,
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function Header({ setMobileOpen }) {
  const {
    searchQuery,
    setSearchQuery,
    selectedProject,
    setSelectedProject,
    projects,
    unreadNotifications,
    markNotificationRead,
    setSimulateModalOpen
  } = useDashboard();

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const unreadCount = unreadNotifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Global Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Input Bar */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, tasks, or members..."
              className="w-full pl-10 pr-12 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-800 placeholder-slate-400 shadow-xs"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200 rounded-md">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action, Notifications, Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Simulate Button */}
          <button
            onClick={() => setSimulateModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all shadow-blue-500/20 active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Simulate Change</span>
          </button>

          {/* Project Switcher Dropdown */}
          <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs">
            <span className="text-slate-400 mr-1.5 font-medium">Project:</span>
            <select
              value={selectedProject.id}
              onChange={(e) => {
                const found = projects.find((p) => p.id === e.target.value);
                if (found) setSelectedProject(found);
              }}
              className="bg-transparent font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Menu */}
            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2 px-1">
                  <h3 className="font-semibold text-sm text-slate-800">Coordination Alerts</h3>
                  <span className="text-[11px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
                    {unreadCount} New
                  </span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {unreadNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        notif.read
                          ? 'bg-slate-50 border-slate-100 text-slate-500'
                          : 'bg-amber-50/70 border-amber-200/70 text-slate-800 font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold mb-1">
                        <span className="text-amber-800 flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">{notif.time}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-tight">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Badge */}
          <div className="relative border-l border-slate-200 pl-3">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                alt="Yash Profile"
                className="w-8 h-8 rounded-full object-cover border border-blue-500/30"
              />
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-bold text-slate-900 leading-tight">Yash</span>
                <span className="block text-[11px] text-slate-500 leading-none">Dev</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="font-bold text-slate-800">Yash Pratap Singh</p>
                  <p className="text-slate-400 text-[11px]">yash.dev@coordiflow.com</p>
                </div>
                <button
                  onClick={() => setProfileDropdownOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-600"
                >
                  <User className="w-3.5 h-3.5" /> Profile Settings
                </button>
                <button
                  onClick={() => setProfileDropdownOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-600"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> System Status: Optimal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
