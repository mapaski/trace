import React, { useState } from 'react';
import {
  Campaign,
  Incident,
  RiskLevel,
  ChannelType
} from '../types';
import {
  ShieldAlert,
  Flame,
  Globe,
  Phone,
  Server,
  GitBranch,
  TrendingUp,
  FileText,
  Search,
  Filter,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Lock,
  Layers,
  Sparkles,
  Shield,
  Activity,
  FileCheck2,
  X
} from 'lucide-react';

interface InvestigationConsoleProps {
  campaigns: Campaign[];
  incidents: Incident[];
  onSelectCampaignForGraph: (campaignId: string) => void;
  onSelectCampaignForEvolution: (campaignId: string) => void;
  onOpenReportModal: () => void;
}

export const InvestigationConsole: React.FC<InvestigationConsoleProps> = ({
  campaigns,
  incidents,
  onSelectCampaignForGraph,
  onSelectCampaignForEvolution,
  onOpenReportModal,
}) => {
  const [selectedChannel, setSelectedChannel] = useState<string>('ALL');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeIncidentDetail, setActiveIncidentDetail] = useState<Incident | null>(
    incidents[0] || null
  );

  const filteredIncidents = incidents.filter((inc) => {
    if (selectedChannel !== 'ALL' && inc.channel !== selectedChannel) return false;
    if (selectedRisk !== 'ALL' && inc.riskLevel !== selectedRisk) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchRaw = inc.rawInput.toLowerCase().includes(q);
      const matchId = inc.id.toLowerCase().includes(q);
      const matchDomain = inc.extractedEntities.domains.some((d) => d.toLowerCase().includes(q));
      const matchPhone = inc.extractedEntities.phoneNumbers.some((p) => p.includes(q));
      return matchRaw || matchId || matchDomain || matchPhone;
    }
    return true;
  });

  const totalIOCs = campaigns.reduce(
    (acc, c) => acc + c.domains.length + c.phones.length + c.ips.length,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Console Header Bar */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
            <Activity className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Threat Campaign Intelligence Feed
              </h1>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE STREAM
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              SOC NODE: IN-CERT-DL-09 • {campaigns.length} Active Syndicates • {incidents.length} Correlated Ingests
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            id="btn-export-dossier-header"
            onClick={onOpenReportModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-indigo-300" />
            <span>Export Law Enforcement Dossier</span>
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Tracked Campaigns</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl font-bold text-slate-900">{campaigns.length}</span>
            <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
              2 Active Clusters
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-snug">
            Correlated across domains, phone pools, and fake apps
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Ingested Reports</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl font-bold text-slate-900">
              {campaigns.reduce((a, b) => a + b.incidentCount, 0) + incidents.length}
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Live Stream
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-snug">
            Aggregated from citizen portal, SMS gateway, & OCR
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Identified IOCs</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl font-bold text-slate-900">{totalIOCs}</span>
            <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              Domains / IPs / Phones
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-snug">
            Cataloged indicators ready for ISP and Telco takedown
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Cryptographic Integrity</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl font-bold text-slate-900">100%</span>
            <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
              SHA-256 Anchored
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-snug">
            Tamper-evident chain of custody for legal court compliance
          </p>
        </div>
      </div>

      {/* Active Threat Campaigns Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-slate-900">Active Threat Campaigns</h2>
            <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-slate-200">
              {campaigns.length} Tracked
            </span>
          </div>
          <span className="text-xs text-slate-500">Grouped by infrastructure similarity and semantic vector match</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {camp.id}
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {camp.codeName}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          camp.threatLevel === 'CRITICAL'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {camp.threatLevel} ({camp.riskScore}/100)
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-2">{camp.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Target Brand: <strong className="text-slate-800 uppercase">{camp.impersonatedBrand}</strong>
                    </p>
                  </div>

                  <div className="text-right shrink-0 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div className="text-xl font-bold text-slate-900">{camp.incidentCount}</div>
                    <div className="text-[10px] uppercase font-semibold text-slate-500">Incidents</div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed">
                  {camp.executiveSummary}
                </p>

                {/* IOC Quick Badges */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-600">
                    Identified Infrastructure IOCs:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {camp.domains.slice(0, 3).map((d, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 font-medium"
                      >
                        {d}
                      </span>
                    ))}
                    {camp.phones.slice(0, 2).map((p, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-medium"
                      >
                        {p}
                      </span>
                    ))}
                    {camp.domains.length > 3 && (
                      <span className="text-[11px] font-mono text-slate-500 px-1.5 py-0.5">
                        +{camp.domains.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  id={`btn-graph-${camp.id}`}
                  onClick={() => onSelectCampaignForGraph(camp.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all cursor-pointer"
                >
                  <GitBranch className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Inspect in Graph</span>
                </button>

                <button
                  id={`btn-evolution-${camp.id}`}
                  onClick={() => onSelectCampaignForEvolution(camp.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>View Attack Evolution</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ingested Incidents Table & Stream */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Live Incident Ingestion Stream</h2>
            <p className="text-xs text-slate-500">Normalized, risk-scored, and cryptographically anchored records</p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search IOC, phone, domain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 w-48 font-sans"
              />
            </div>

            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Channels</option>
              <option value="SMS">SMS</option>
              <option value="WHATSAPP">WhatsApp</option>
              <option value="QR">QR Code</option>
              <option value="SCREENSHOT">Screenshot</option>
            </select>

            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="CRITICAL">Critical (80-100)</option>
              <option value="HIGH">High (60-79)</option>
              <option value="MEDIUM">Medium (35-59)</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Detected Payload / IOC</th>
                <th className="py-3 px-4">Threat Score</th>
                <th className="py-3 px-4">Associated Campaign</th>
                <th className="py-3 px-4">SHA-256 Seal</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIncidents.map((inc) => (
                <tr
                  key={inc.id}
                  onClick={() => setActiveIncidentDetail(inc)}
                  className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                    activeIncidentDetail?.id === inc.id ? 'bg-indigo-50/40' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900">{inc.id}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                      {inc.channel}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-slate-700">
                    {inc.extractedEntities.domains[0] || inc.extractedEntities.phoneNumbers[0] || inc.rawInput}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        inc.riskLevel === 'CRITICAL'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {inc.threatScore}/100 ({inc.riskLevel})
                    </span>
                  </td>
                  <td className="py-3 px-4 text-indigo-700 font-medium">
                    {inc.campaignId || 'Unlinked'}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400 truncate max-w-[120px]" title={inc.evidenceRecord.sha256Hash}>
                    {inc.evidenceRecord.sha256Hash.slice(0, 12)}...
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Incident Quick Drawer */}
        {activeIncidentDetail && (
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-slate-800 bg-white px-2.5 py-1 rounded border border-slate-200">
                  {activeIncidentDetail.id}
                </span>
                <span className="text-xs font-semibold text-slate-600">
                  Detailed Forensics Snapshot
                </span>
              </div>
              <button
                onClick={() => setActiveIncidentDetail(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1.5">
                <div className="font-semibold text-slate-700">Raw Submission Payload:</div>
                <p className="text-slate-600 font-mono text-[11px] leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100 break-all">
                  {activeIncidentDetail.rawInput}
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1.5">
                <div className="font-semibold text-slate-700">Identified Indicators:</div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeIncidentDetail.extractedEntities.domains.map((d, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-mono text-[11px]">
                      Domain: {d}
                    </span>
                  ))}
                  {activeIncidentDetail.extractedEntities.phoneNumbers.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono text-[11px]">
                      Phone: {p}
                    </span>
                  ))}
                  {activeIncidentDetail.extractedEntities.brands.map((b, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold text-[11px] uppercase">
                      Brand: {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
