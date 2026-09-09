import React, { useState } from 'react';
import { X, Sparkles, AlertOctagon } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function SimulateAlertModal() {
  const { simulateModalOpen, setSimulateModalOpen, simulateNewChangeEvent } = useDashboard();

  const [eventTitle, setEventTitle] = useState('Project Deadline Changed: 20 Sept → 30 Sept');
  const [triggeredBy, setTriggeredBy] = useState('Aman (Manager)');
  const [reason, setReason] = useState('Architectural Review & Structural Inspection Delay');
  const [highTask, setHighTask] = useState('Database Auth & User API (Critical Delay)');
  const [medTask, setMedTask] = useState('CAD Drawings & Blueprint UI Sync');

  if (!simulateModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    simulateNewChangeEvent({
      eventTitle,
      triggeredBy,
      reason,
      highTask,
      medTask
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setSimulateModalOpen(false)}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Simulate Change Event</h3>
              <p className="text-xs text-slate-500">Test Impact Identification Algorithm</p>
            </div>
          </div>
          <button
            onClick={() => setSimulateModalOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Event Title</label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Triggered By</label>
              <input
                type="text"
                value={triggeredBy}
                onChange={(e) => setTriggeredBy(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Reason</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-rose-700 mb-1">High Impact Module Task</label>
            <input
              type="text"
              value={highTask}
              onChange={(e) => setHighTask(e.target.value)}
              className="w-full px-3 py-2 bg-rose-50 border border-rose-200 rounded-xl text-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-amber-700 mb-1">Medium Impact Module Task</label>
            <input
              type="text"
              value={medTask}
              onChange={(e) => setMedTask(e.target.value)}
              className="w-full px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-slate-900 font-medium"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setSimulateModalOpen(false)}
              className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
              Generate Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
