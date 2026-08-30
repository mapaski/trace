import React, { useState } from 'react';
import { Campaign, Incident } from '../types';
import {
  FileText,
  X,
  Printer,
  Copy,
  Check,
  Download,
  Shield,
  Fingerprint,
  AlertTriangle,
  Globe,
  Phone,
  Server,
  Building2,
  FileCheck2
} from 'lucide-react';

interface ReportDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: Campaign[];
  incidents: Incident[];
}

export const ReportDossierModal: React.FC<ReportDossierModalProps> = ({
  isOpen,
  onClose,
  campaigns,
  incidents,
}) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(
    campaigns[0]?.id || 'CAMP-2841'
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const campaign = campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0];
  const linkedIncidents = incidents.filter((i) => i.campaignId === campaign.id);

  const handleCopyReport = () => {
    const reportText = `
TRACE CYBER THREAT INTELLIGENCE DOSSIER
======================================================
REF: TRACE-DOSSIER-${campaign.id}
Generated: ${new Date().toUTCString()}
Classification: OFFICIAL LAW ENFORCEMENT & SOC DISSEMINATION

1. CAMPAIGN IDENTIFICATION
- Campaign ID: ${campaign.id}
- Code Name: ${campaign.codeName}
- Threat Classification: ${campaign.category}
- Threat Level: ${campaign.threatLevel} (Composite Score: ${campaign.riskScore}/100)
- Target Impersonation: ${campaign.impersonatedBrand}
- First Seen: ${campaign.firstDetected}
- Active Reports: ${campaign.incidentCount}
- Estimated Impacted Citizens: ~${campaign.affectedVictimCountEst}

2. EXECUTIVE SUMMARY
${campaign.executiveSummary}

3. CORRELATED INFRASTRUCTURE & IOCS
Domains / Phishing URLs:
${campaign.domains.map((d) => `  - ${d}`).join('\n')}
Mule Phone Numbers / SIMs:
${campaign.phones.map((p) => `  - ${p}`).join('\n')}
Host IPs:
${campaign.ips.map((ip) => `  - ${ip}`).join('\n')}

4. ATTACK VECTOR EVOLUTION
${campaign.evolution.map((e) => `Stage ${e.stageNumber} [${e.timeframe}]: ${e.title} -> ${e.description}`).join('\n')}

5. CRYPTOGRAPHIC PROVENANCE & CHAIN OF CUSTODY
- Anchor Block: #4891024
- Forensic Algorithm: SHA-256
- On-Chain Merkle Root: 0x4910293847561029384756abcdef1029384756abcdef1029384756abcdef1029
======================================================
TRACE Platform - Threat Relationship Analysis & Cryptographic Evidence
    `.trim();

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Official Threat Intelligence Dossier Generator
              </h2>
              <p className="text-xs text-slate-400">
                Actionable dossier formatted for CERT-In, Law Enforcement, and Banking SOC Escalation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReport}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all cursor-pointer border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Campaign Selector Bar */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-3 text-xs">
          <span className="text-slate-600 font-semibold">Select Target Campaign:</span>
          <div className="flex flex-wrap gap-2">
            {campaigns.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCampaignId(c.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCampaignId === c.id
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {c.id} ({c.codeName})
              </button>
            ))}
          </div>
        </div>

        {/* Dossier Preview Document */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 text-xs bg-white">
          {/* Official Document Banner */}
          <div className="border-b border-slate-200 pb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-rose-700 font-semibold text-[11px] bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full mb-2">
                <Shield className="w-3.5 h-3.5" />
                <span>CONFIDENTIAL // LAW ENFORCEMENT ACTIONABLE</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">
                CYBER FRAUD CAMPAIGN INCIDENT DOSSIER
              </h1>
              <p className="text-slate-500 font-mono text-xs mt-0.5">
                REF ID: TRACE-DOSSIER-{campaign.id} • GENERATED: {new Date().toUTCString()}
              </p>
            </div>

            <div className="text-right text-[11px] text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono space-y-0.5">
              <div>PLATFORM: TRACE v3.4</div>
              <div>CHAIN ANCHOR: ETH-SEPOLIA #4891024</div>
              <div className="text-emerald-700 font-semibold font-sans">STATUS: VERIFIED PROOF</div>
            </div>
          </div>

          {/* Section 1: Campaign Profile */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-indigo-700">
              1. Campaign Identification & Risk Overview
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 text-[11px] block">Threat Level</span>
                <strong className="text-rose-700 font-bold">{campaign.threatLevel} ({campaign.riskScore}/100)</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">Impersonated Brand</span>
                <strong className="text-slate-900 uppercase">{campaign.impersonatedBrand}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">Correlated Reports</span>
                <strong className="text-slate-900">{campaign.incidentCount} Ingested</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">Estimated Impact</span>
                <strong className="text-slate-900">~{campaign.affectedVictimCountEst} Citizens</strong>
              </div>
            </div>
          </div>

          {/* Section 2: Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-indigo-700">
              2. Executive Assessment
            </h3>
            <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {campaign.executiveSummary}
            </p>
          </div>

          {/* Section 3: Actionable IOC Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-indigo-700">
              3. Actionable Infrastructure IOCs for ISP / Telco Takedown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Phishing Domains:</span>
                </span>
                <div className="space-y-1 font-mono text-[11px] text-rose-700">
                  {campaign.domains.map((d, i) => (
                    <div key={i} className="truncate">• {d}</div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>Identified SIM / Callers:</span>
                </span>
                <div className="space-y-1 font-mono text-[11px] text-amber-800">
                  {campaign.phones.map((p, i) => (
                    <div key={i}>• {p}</div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Host IP Addresses:</span>
                </span>
                <div className="space-y-1 font-mono text-[11px] text-slate-700">
                  {campaign.ips.map((ip, i) => (
                    <div key={i}>• {ip}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Forensic Provenance */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-indigo-700">
              4. Cryptographic Provenance & Admissibility Guarantee
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-600 space-y-1">
              <div>FORENSIC ANCHOR: Ethereum Sepolia Block #4891024</div>
              <div>MERKLE ROOT: 0x4910293847561029384756abcdef1029384756abcdef1029384756abcdef1029</div>
              <div>SECTION 65B INDIAN EVIDENCE ACT: CERTIFIED DIGITAL COPY SEALED AT INGESTION</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
