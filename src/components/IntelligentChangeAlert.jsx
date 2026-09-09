import React from 'react';
import {
  AlertOctagon,
  Calendar,
  User,
  Send,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function IntelligentChangeAlert() {
  const {
    changeAlert,
    notifyStakeholder,
    openReassignModal,
    setArchitectureModalOpen,
    setSimulateModalOpen
  } = useDashboard();

  if (!changeAlert) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden transition-all duration-300">
      {/* Top Banner (Header with Red/Navy Accent) */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3 shadow-inner">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-sm animate-pulse-subtle">
            <AlertOctagon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black tracking-wider uppercase font-mono">
                INTELLIGENT CHANGE ALERT
              </h2>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border border-white/20">
                Core Feature
              </span>
            </div>
            <p className="text-xs text-rose-100 font-medium">
              Impact Identification & Automated Stakeholder Cascade
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSimulateModalOpen(true)}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg border border-white/20 flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Simulate Event
          </button>
          <button
            onClick={() => setArchitectureModalOpen(true)}
            className="px-3 py-1.5 bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1 transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            Logic Info
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Event Trigger Summary Box */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Triggered Event</span>
            </div>
            <div className="flex items-center gap-2 text-base sm:text-lg font-extrabold text-slate-900">
              <span>Project Deadline Changed:</span>
              <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-lg border border-rose-200 font-mono text-sm sm:text-base">
                20 Sept <ArrowRight className="w-4 h-4" /> 25 Sept
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:border-l border-slate-200 sm:pl-5">
            <img
              src={changeAlert.triggerAvatar}
              alt={changeAlert.triggeredBy}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
            />
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                Triggered By
              </span>
              <span className="text-sm font-bold text-slate-800">
                {changeAlert.triggeredBy}
              </span>
            </div>
          </div>
        </div>

        {/* Section Heading: Impact Analysis */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                Impact Analysis (Downstream Stakeholder Cascade)
              </h3>
              <p className="text-xs text-slate-500">
                CoordiFlow identified 2 dependent modules affected by the schedule shift.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
              Engine: RuleCascade-v2
            </span>
          </div>

          {/* Impact Cards List */}
          <div className="space-y-4">
            {changeAlert.impacts.map((imp) => {
              const isHigh = imp.severity === 'HIGH';
              const isMed = imp.severity === 'MEDIUM';

              return (
                <div
                  key={imp.id}
                  className={`rounded-xl p-4 sm:p-5 border transition-all duration-200 ${
                    isHigh
                      ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300'
                      : isMed
                      ? 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left Details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Severity Badge */}
                        <span
                          className={`text-xs font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1 font-mono ${
                            isHigh
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-amber-500 text-white shadow-xs'
                          }`}
                        >
                          {isHigh ? '🔴 HIGH' : '🟡 MEDIUM'}
                        </span>

                        {/* Task Title */}
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {imp.taskName}
                        </h4>
                      </div>

                      {/* Details Subtext */}
                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                        {imp.impactDetails}
                      </p>

                      {/* Affected Stakeholder Badge */}
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs text-slate-500 font-medium">
                          Affected Stakeholder:
                        </span>
                        <div className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs">
                          <img
                            src={imp.stakeholderAvatar}
                            alt={imp.affectedStakeholder}
                            className="w-4 h-4 rounded-full object-cover"
                          />
                          <span>
                            {imp.affectedStakeholder} ({imp.stakeholderRole})
                          </span>
                        </div>

                        {/* Status Tags */}
                        {imp.notified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                            <CheckCircle2 className="w-3 h-3" /> Notified
                          </span>
                        )}
                        {imp.reassigned && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                            <User className="w-3 h-3" /> Re-assigned to {imp.assignedTo}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                      {/* Notify Button */}
                      <button
                        onClick={() =>
                          notifyStakeholder(imp.id, imp.affectedStakeholder)
                        }
                        disabled={imp.notified}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                          imp.notified
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : isHigh
                            ? 'bg-rose-600 hover:bg-rose-700 text-white active:scale-95'
                            : 'bg-amber-600 hover:bg-amber-700 text-white active:scale-95'
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{imp.notified ? 'Notified' : `Notify ${imp.affectedStakeholder}`}</span>
                      </button>

                      {/* Re-assign Button (Only on High Impact or when supported) */}
                      {imp.actionButtons.includes('Re-assign') && (
                        <button
                          onClick={() => openReassignModal(imp)}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs"
                        >
                          <UserPlus className="w-3.5 h-3.5 text-blue-600" />
                          <span>Re-assign</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
