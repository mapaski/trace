import React, { useState } from 'react';
import { Campaign, EvolutionStage } from '../types';
import {
  TrendingUp,
  AlertTriangle,
  Layers,
  ArrowRight,
  ShieldAlert,
  Clock,
  Zap,
  Globe,
  MessageSquare,
  QrCode,
  Smartphone,
  ShieldCheck,
  Flame,
  ChevronRight
} from 'lucide-react';

interface CampaignEvolutionViewProps {
  campaigns: Campaign[];
  selectedCampaignId?: string;
}

export const CampaignEvolutionView: React.FC<CampaignEvolutionViewProps> = ({
  campaigns,
  selectedCampaignId: initialSelectedId,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    initialSelectedId || campaigns[0]?.id || 'CAMP-2841'
  );

  const campaign = campaigns.find((c) => c.id === selectedId) || campaigns[0];

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'SMS':
        return <MessageSquare className="w-4 h-4 text-indigo-600" />;
      case 'WHATSAPP':
        return <Smartphone className="w-4 h-4 text-emerald-600" />;
      case 'QR':
        return <QrCode className="w-4 h-4 text-purple-600" />;
      default:
        return <Globe className="w-4 h-4 text-sky-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Campaign Vector Evolution Timeline
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-semibold">
                {campaign.evolution.length} Lifecycle Stages
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              PREDICTIVE ENGINE: MULTI-CHANNEL HOP TRACKING • ACTIVE SYNDICATE: {campaign.id}
            </p>
          </div>
        </div>

        {/* Campaign Selector */}
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-semibold pl-2">Campaign:</span>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer shadow-2xs"
          >
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} - {c.codeName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Campaign Summary Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded border border-slate-200">
                {campaign.id}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-700">
                {campaign.category}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-2">{campaign.name}</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 text-right">
              <div className="text-xl font-bold text-slate-900">{campaign.incidentCount}</div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Correlated Reports</div>
            </div>
            <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 text-right">
              <div className="text-xl font-bold text-rose-600">~{campaign.affectedVictimCountEst}</div>
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Estimated Exposed</div>
            </div>
          </div>
        </div>

        {/* Attack Vector Evolution Timeline Stages */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Multi-Stage Vector Shift Timeline</span>
            </h3>
            <span className="text-xs text-slate-500">Chronological attack evolution</span>
          </div>

          <div className="relative border-l-2 border-indigo-100 ml-4 pl-6 space-y-6 py-2">
            {campaign.evolution.map((stage: EvolutionStage) => (
              <div key={stage.stageNumber} className="relative group">
                {/* Timeline node marker */}
                <div className="absolute -left-[31px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center text-[10px] font-bold text-indigo-700 shadow-sm">
                  {stage.stageNumber}
                </div>

                <div className="bg-slate-50 hover:bg-slate-100/70 p-5 rounded-2xl border border-slate-200 transition-all space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                        {getChannelIcon(stage.channel)}
                      </div>
                      <span className="text-xs font-semibold text-slate-500 font-mono">
                        {stage.timeframe}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {stage.title}
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      Channel: {stage.channel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1 border-t border-slate-200/60">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 font-medium">New IOCs:</span>
                      <div className="flex flex-wrap gap-1">
                        {stage.newIOCs.map((ioc, idx) => (
                          <code key={idx} className="text-rose-700 font-mono text-[11px] font-semibold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            {ioc}
                          </code>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 font-medium">Risk Shift:</span>
                      <span className="text-rose-700 font-semibold bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[11px]">
                        {stage.riskShift}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Predictive Next-Hop Prevention Guidance */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-2xl border border-indigo-100 space-y-3">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>Automated AI Next-Hop Prediction & Proactive Countermeasures</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Based on historical vector trajectory, this campaign is predicted to shift towards <strong>voice phishing (Vishing) with AI-generated audio cloning</strong> and dynamic APK drops hosted on decentralized storage.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div className="bg-white p-3 rounded-xl border border-indigo-200/80 space-y-1">
              <strong className="text-slate-900 block font-semibold">1. ISP Domain Pre-Emptive Sinkhole</strong>
              <p className="text-slate-600 text-[11px]">Sinkhole variations of yono-*.xyz domains across national DNS resolvers.</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-indigo-200/80 space-y-1">
              <strong className="text-slate-900 block font-semibold">2. Telco Header Filter Rule</strong>
              <p className="text-slate-600 text-[11px]">Block SMS header masks attempting SBI / Bank KYC permutations.</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-indigo-200/80 space-y-1">
              <strong className="text-slate-900 block font-semibold">3. APK Package Hash Broadcast</strong>
              <p className="text-slate-600 text-[11px]">Push SHA-256 package hashes to Google Play Protect and security engines.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
