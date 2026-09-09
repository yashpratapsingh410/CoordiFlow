import React, { useState } from 'react';
import { Settings, Bell, Shield, Database, Check } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function SettingsView() {
  const { addToast } = useDashboard();
  const [autoNotify, setAutoNotify] = useState(true);
  const [threshold, setThreshold] = useState('Medium');

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Settings saved successfully!', 'success');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">System Settings</h2>
        <p className="text-xs text-slate-500">Configure Coordination Intelligence thresholds & preferences</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" /> Automated Notifications
          </h3>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div>
              <p className="font-bold text-slate-800">Auto-notify Stakeholders</p>
              <p className="text-slate-500">Trigger immediate alerts when deadline shifts exceed 2 days.</p>
            </div>
            <input
              type="checkbox"
              checked={autoNotify}
              onChange={(e) => setAutoNotify(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded-sm cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-600" /> Impact Identification Sensitivity
          </h3>
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Threshold Sensitivity</label>
            <select
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
            >
              <option value="High">High (Alert on all 1+ day shifts)</option>
              <option value="Medium">Medium (Recommended: Alert on critical path delays)</option>
              <option value="Low">Low (Alert on major milestone changes only)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" /> Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
