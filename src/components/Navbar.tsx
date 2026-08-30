import React from 'react';
import {
  Shield,
  ShieldAlert,
  Activity,
  GitGraph,
  TrendingUp,
  FileCheck2,
  FileText,
  Sparkles,
  Search,
  BookOpen,
  UserCheck,
  Lock,
  ArrowRight
} from 'lucide-react';

export type UserRole = 'citizen' | 'investigator';

export type CitizenSubTab = 'scanner' | 'track_report' | 'awareness';
export type InvestigatorSubTab =
  | 'campaigns_stream'
  | 'threat_graph'
  | 'vector_evolution'
  | 'evidence_vault';

export type ActiveView = {
  role: UserRole;
  citizenTab: CitizenSubTab;
  investigatorTab: InvestigatorSubTab;
};

interface NavbarProps {
  currentView: ActiveView;
  onChangeView: (view: Partial<ActiveView>) => void;
  onOpenJuryDemo: () => void;
  onOpenReportModal: () => void;
  stats: {
    activeCampaigns: number;
    totalIncidents: number;
    monitoredIOCs: number;
    verifiedBlocks: number;
  };
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onChangeView,
  onOpenJuryDemo,
  onOpenReportModal,
  stats,
}) => {
  const isCitizen = currentView.role === 'citizen';

  return (
    <header className="bg-white border-b border-slate-200/90 sticky top-0 z-40 shadow-xs">
      {/* Top Banner: Logo, Role Mode Switcher, and Quick Action buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-slate-900">TRACE</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                National Cyber Intelligence
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Threat Relationship Analysis & Cryptographic Evidence
            </p>
          </div>
        </div>

        {/* Primary Role Switcher (Citizen vs Investigator) */}
        <div className="flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200">
          <button
            id="role-btn-citizen"
            onClick={() => onChangeView({ role: 'citizen' })}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isCitizen
                ? 'bg-white text-indigo-700 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Citizen Safety Portal</span>
          </button>

          <button
            id="role-btn-investigator"
            onClick={() => onChangeView({ role: 'investigator' })}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              !isCitizen
                ? 'bg-slate-900 text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Investigator & SOC Console</span>
          </button>
        </div>

        {/* Quick Tools */}
        <div className="flex items-center gap-2.5">
          <button
            id="btn-jury-demos"
            onClick={onOpenJuryDemo}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition-all cursor-pointer shadow-xs"
            title="Launch the continuous 120-second end-to-end evaluation demo"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Single 120s Demo</span>
          </button>

          {!isCitizen && (
            <button
              id="btn-generate-dossier"
              onClick={onOpenReportModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-all shadow-sm cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-300" />
              <span>Export Dossier</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-Navigation Bar based on Selected Role */}
      <div className="border-t border-slate-100 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {isCitizen ? (
            /* Citizen Navigation Sub-Tabs */
            <div className="flex items-center gap-1 py-1.5 overflow-x-auto">
              <button
                id="subnav-citizen-scanner"
                onClick={() => onChangeView({ citizenTab: 'scanner' })}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  currentView.citizenTab === 'scanner'
                    ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200/80 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Search className="w-3.5 h-3.5 text-indigo-600" />
                <span>Verify Message or Link</span>
              </button>

              <button
                id="subnav-citizen-tracking"
                onClick={() => onChangeView({ citizenTab: 'track_report' })}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  currentView.citizenTab === 'track_report'
                    ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200/80 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5 text-slate-500" />
                <span>My Submitted Reports</span>
              </button>

              <button
                id="subnav-citizen-awareness"
                onClick={() => onChangeView({ citizenTab: 'awareness' })}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  currentView.citizenTab === 'awareness'
                    ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200/80 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>Scam Awareness & 1930 Helpline</span>
              </button>
            </div>
          ) : (
            /* Investigator & SOC Console Navigation Sub-Tabs */
            <div className="flex items-center gap-1 py-1.5 overflow-x-auto">
              <button
                id="subnav-soc-campaigns"
                onClick={() => onChangeView({ investigatorTab: 'campaigns_stream' })}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  currentView.investigatorTab === 'campaigns_stream'
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>1. Threat Campaigns & Feed</span>
              </button>

              <button
                id="subnav-soc-graph"
                onClick={() => onChangeView({ investigatorTab: 'threat_graph' })}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  currentView.investigatorTab === 'threat_graph'
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <GitGraph className="w-3.5 h-3.5" />
                <span>2. Threat Relationship Graph</span>
              </button>

              <button
                id="subnav-soc-evolution"
                onClick={() => onChangeView({ investigatorTab: 'vector_evolution' })}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  currentView.investigatorTab === 'vector_evolution'
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>3. Vector Evolution Timeline</span>
              </button>

              <button
                id="subnav-soc-vault"
                onClick={() => onChangeView({ investigatorTab: 'evidence_vault' })}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  currentView.investigatorTab === 'evidence_vault'
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>4. Evidence Vault & Chain of Custody</span>
              </button>
            </div>
          )}

          {/* Quick Metrics Ticker */}
          <div className="hidden md:flex items-center gap-4 text-xs text-slate-500 py-1 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-700 font-sans font-medium">Engine Status:</span>
              <span className="text-emerald-700 font-semibold font-sans">Active</span>
            </span>
            <span className="text-slate-300">•</span>
            <span>
              <strong className="text-slate-800">{stats.activeCampaigns}</strong> Campaigns
            </span>
            <span className="text-slate-300">•</span>
            <span>
              <strong className="text-slate-800">{stats.totalIncidents}</strong> Reports
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

