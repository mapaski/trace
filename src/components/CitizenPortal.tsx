import React, { useState } from 'react';
import {
  MessageSquare,
  Globe,
  QrCode,
  Image as ImageIcon,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Zap,
  ArrowRight,
  Fingerprint,
  Lock,
  Search,
  Copy,
  Check,
  FileCode,
  Sparkles,
  PhoneCall,
  ExternalLink,
  HelpCircle,
  Clock,
  Send,
  Eye,
  Info,
  Shield,
  FileText,
  FileCheck2,
  BookOpen
} from 'lucide-react';
import { ChannelType, Incident } from '../types';
import { extractIOCsAndSignals, matchToCampaign } from '../utils/detectionEngine';
import { calculateSHA256, generateMerkleRoot, generateTxHash } from '../utils/crypto';
import { CitizenSubTab } from './Navbar';

interface CitizenPortalProps {
  activeSubTab?: CitizenSubTab;
  onIncidentCreated: (incident: Incident) => void;
  onNavigateToCampaign: (campaignId: string) => void;
  incidentsHistory?: Incident[];
}

export const CitizenPortal: React.FC<CitizenPortalProps> = ({
  activeSubTab = 'scanner',
  onIncidentCreated,
  onNavigateToCampaign,
  incidentsHistory = [],
}) => {
  const [channel, setChannel] = useState<ChannelType>('SMS');
  const [inputText, setInputText] = useState(
    'Dear SBI Customer, Your YONO Account will be blocked today within 24 hours. Please update your PAN Card immediately by clicking https://yono-sbi-update.xyz to avoid suspension. Helpline: +919823411029'
  );
  const [analyzing, setAnalyzing] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState<ReturnType<typeof extractIOCsAndSignals> | null>(null);
  const [createdIncident, setCreatedIncident] = useState<Incident | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);
  const [searchTicketQuery, setSearchTicketQuery] = useState('');

  // Quick Preset Samples for Testing
  const presets = [
    {
      label: 'Bank KYC Expiry (SBI Smishing)',
      channel: 'SMS' as ChannelType,
      text: 'Dear SBI Customer, Your YONO Account will be blocked today within 24 hours. Please update your PAN Card immediately by clicking https://yono-sbi-update.xyz to avoid suspension. Helpline: +919823411029',
      tag: 'Banking Scam',
    },
    {
      label: 'Electricity Power Cut Tonight (Urgent Bill)',
      channel: 'SMS' as ChannelType,
      text: 'Dear consumer your electricity power will be disconnected tonight at 9.30 pm from electricity office because your previous month bill was not updated. Please immediately contact officer +919412077123 or visit https://bijli-bill-payment.live',
      tag: 'Utility Scam',
    },
    {
      label: 'Fake FedEx / Customs Video Arrest',
      channel: 'WHATSAPP' as ChannelType,
      text: 'FedEx Alert: Parcel #FDX-88192 detained by Mumbai Customs. Illegal narcotics found under your Aadhaar. Connect immediately with Cyber Officer on WhatsApp +919910422091 to avoid urgent FIR and arrest.',
      tag: 'Digital Arrest',
    },
    {
      label: 'Work From Home / YouTube Video Likes',
      channel: 'WHATSAPP' as ChannelType,
      text: 'Earn ₹3,500 daily by simply liking YouTube videos and rating hotels from home! Daily payout guaranteed. Click https://task-vip-rewards.online or message Manager on Telegram @vip_task_bot to start right now.',
      tag: 'Part-Time Job',
    },
  ];

  const handleRunAnalysis = async () => {
    if (!inputText.trim()) return;
    setAnalyzing(true);
    setCreatedIncident(null);

    // Simulate analysis latency
    await new Promise((r) => setTimeout(r, 600));

    const analysis = extractIOCsAndSignals(inputText);
    setActiveAnalysis(analysis);

    // Generate Cryptographic Anchor
    const sha256 = await calculateSHA256(inputText);
    const incidentId = `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const matchedCampaign = matchToCampaign(analysis.entities, inputText);
    const txHash = generateTxHash();
    const merkleRoot = generateMerkleRoot([sha256]);
    const blockNum = 4891100 + Math.floor(Math.random() * 500);

    const now = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

    const newIncident: Incident = {
      id: incidentId,
      reporterPseudonym: `Citizen_Reporter_${Math.floor(100 + Math.random() * 900)}`,
      timestamp: now,
      channel,
      rawInput: inputText,
      extractedEntities: analysis.entities,
      threatScore: analysis.threatScore,
      riskLevel: analysis.riskLevel,
      signalScores: analysis.signals,
      explainableReasons: analysis.reasons,
      campaignId: matchedCampaign,
      status: 'INVESTIGATING',
      evidenceRecord: {
        id: `EVID-${incidentId.split('-')[2]}`,
        incidentId,
        sha256Hash: sha256,
        originalPayload: inputText,
        currentPayload: inputText,
        timestamp: now,
        version: '1.0.0',
        modelVersion: 'TRACE-MultiSignal-v3.4',
        blockNumber: blockNum,
        txHash,
        merkleRoot,
        isTampered: false,
        chainOfCustody: [
          {
            id: `AUD-${Date.now().toString().slice(-4)}`,
            timestamp: now,
            stage: 'SUBMITTED',
            actor: 'Citizen Anonymous Ingestion Layer',
            details: `Submitted anonymously via ${channel} intake`,
            hashSnapshot: sha256,
          },
          {
            id: `AUD-${(Date.now() + 1).toString().slice(-4)}`,
            timestamp: now,
            stage: 'HASHED',
            actor: 'Cryptographic Hashing Engine',
            details: `Immutable hash anchored to Block #${blockNum}`,
            hashSnapshot: sha256,
          },
          {
            id: `AUD-${(Date.now() + 2).toString().slice(-4)}`,
            timestamp: now,
            stage: 'ANALYZED',
            actor: 'AI Threat Analyzer',
            details: `Extracted ${analysis.entities.urls.length} URLs, ${analysis.entities.phoneNumbers.length} Phone Numbers, ${analysis.entities.brands.length} Brands`,
            hashSnapshot: sha256,
          },
          {
            id: `AUD-${(Date.now() + 3).toString().slice(-4)}`,
            timestamp: now,
            stage: 'CORRELATED',
            actor: 'Threat Intelligence Correlation',
            details: `Matched to cluster ${matchedCampaign} with score ${analysis.threatScore}/100`,
            hashSnapshot: sha256,
          },
        ],
      },
    };

    setCreatedIncident(newIncident);
    onIncidentCreated(newIncident);
    setAnalyzing(false);
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  // If viewing Awareness tab
  if (activeSubTab === 'awareness') {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Banner */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <Shield className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  Scam Awareness & Emergency Helplines
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-semibold">
                  MHA ADVISORY
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                GOLDEN HOUR RESPONSE PROTOCOL • 24x7 INCIDENT ESCALATION
              </p>
            </div>
          </div>

          <div className="bg-slate-900 text-white px-5 py-2.5 rounded-xl shadow-xs flex items-center gap-4 shrink-0 border border-slate-800">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Helpline:</span>
            </div>
            <div className="text-2xl font-extrabold tracking-tight text-white font-mono">1930</div>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              Toll-Free 24x7
            </span>
          </div>
        </div>

        {/* 4 Common Scam Modus Operandi Cards */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Recognize Common Scam Tactics in India</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                  High Risk
                </span>
                <span className="text-xs text-slate-500 font-medium">Banking Fraud</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Fake Bank KYC / Account Block SMS</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Messages claiming your SBI YONO, HDFC, or PNB account will be suspended within 24 hours unless you click a link and update your PAN card.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-700 space-y-1">
                <strong>Golden Rule:</strong> Banks never ask for PAN card updates or passwords via SMS links. Never enter credentials on unofficial domains.
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                  High Risk
                </span>
                <span className="text-xs text-slate-500 font-medium">Coercion / Extortion</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Fake "Digital Arrest" & Police Video Call</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scammers posing as Mumbai Police, CBI, or FedEx claiming illegal drugs or passports were found under your Aadhaar, demanding money over Skype/WhatsApp.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-700 space-y-1">
                <strong>Golden Rule:</strong> No law enforcement agency or court ever arrests citizens over WhatsApp or video call. Disconnect immediately.
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                  Medium Risk
                </span>
                <span className="text-xs text-slate-500 font-medium">Urgent Threat</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Electricity Bill Power Disconnection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                SMS claiming power supply will be cut tonight at 9:30 PM due to unpaid bill, providing a fake officer phone number to download a malicious APK.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-700 space-y-1">
                <strong>Golden Rule:</strong> Electricity boards notify bill dues on official utility bills and never send personal WhatsApp numbers.
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                  Medium Risk
                </span>
                <span className="text-xs text-slate-500 font-medium">Financial Fraud</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Part-Time YouTube Like & Telegram Job</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Promises of ₹3,000–₹10,000 daily earnings for liking videos, which transitions into a "prepaid task" crypto investment where funds are trapped.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-700 space-y-1">
                <strong>Golden Rule:</strong> Any job asking you to deposit money in advance to withdraw your earnings is a guaranteed scam.
              </div>
            </div>
          </div>
        </div>

        {/* Official Channels to Report */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold">Official Government Portals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-800/80 p-4 rounded-xl space-y-1.5 border border-slate-700">
              <span className="font-bold text-indigo-300 text-sm block">1. Cyber Crime Portal</span>
              <p className="text-slate-300">File an official police cyber FIR for financial fraud or identity theft.</p>
              <div className="text-slate-400 font-mono pt-1">www.cybercrime.gov.in</div>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-xl space-y-1.5 border border-slate-700">
              <span className="font-bold text-indigo-300 text-sm block">2. Chakshu (DoT)</span>
              <p className="text-slate-300">Report fraudulent SMS headers, WhatsApp calls, and scam mobile numbers.</p>
              <div className="text-slate-400 font-mono pt-1">sancharsaathi.gov.in/sfc</div>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-xl space-y-1.5 border border-slate-700">
              <span className="font-bold text-indigo-300 text-sm block">3. Bank Helpline</span>
              <p className="text-slate-300">Call your bank immediately to block debit cards, net banking, and UPI IDs.</p>
              <div className="text-slate-400 font-mono pt-1">Toll-free on back of debit card</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If viewing Track Report tab
  if (activeSubTab === 'track_report') {
    const listToDisplay = incidentsHistory.length > 0 ? incidentsHistory : createdIncident ? [createdIncident] : [];

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <FileCheck2 className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  Submitted Report Dossiers & Tracker
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-semibold">
                  {listToDisplay.length} Ingests
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                SEC. 65B ANCHORED LEDGER • REAL-TIME SOC FORWARDING STATUS
              </p>
            </div>
          </div>

          <div className="w-full md:w-72 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ticket ID (e.g. INC-2026-8801)..."
                value={searchTicketQuery}
                onChange={(e) => setSearchTicketQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 font-mono"
              />
            </div>
          </div>
        </div>

        {listToDisplay.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">Your Submitted Incident Dossiers</h2>
            <div className="grid grid-cols-1 gap-4">
              {listToDisplay
                .filter((inc) =>
                  searchTicketQuery
                    ? inc.id.toLowerCase().includes(searchTicketQuery.toLowerCase()) ||
                      inc.rawInput.toLowerCase().includes(searchTicketQuery.toLowerCase())
                    : true
                )
                .map((inc) => (
                  <div
                    key={inc.id}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100">
                          {inc.id}
                        </span>
                        <span className="text-xs font-semibold text-slate-700">
                          Channel: {inc.channel}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            inc.riskLevel === 'CRITICAL'
                              ? 'bg-rose-100 text-rose-700'
                              : inc.riskLevel === 'HIGH'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          Threat Score: {inc.threatScore}/100 ({inc.riskLevel})
                        </span>
                      </div>

                      <span className="text-xs text-slate-400 font-mono">{inc.timestamp}</span>
                    </div>

                    <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl font-mono leading-relaxed truncate">
                      "{inc.rawInput}"
                    </div>

                    {/* Step-by-step Forensic Lifecycle Pipeline */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                        Lifecycle Pipeline Status:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                        <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-200/60 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div>
                            <div className="font-bold">1. Ingested</div>
                            <div className="text-[10px] text-emerald-700">Privacy Encrypted</div>
                          </div>
                        </div>

                        <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-200/60 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div>
                            <div className="font-bold">2. AI Scored</div>
                            <div className="text-[10px] text-emerald-700">{inc.threatScore}/100 Match</div>
                          </div>
                        </div>

                        <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-200/60 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div>
                            <div className="font-bold">3. Hash Anchored</div>
                            <div className="text-[10px] text-emerald-700 font-mono">Block #{inc.evidenceRecord.blockNumber}</div>
                          </div>
                        </div>

                        <div className="bg-indigo-50 text-indigo-800 p-2.5 rounded-xl border border-indigo-200/60 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                          <div>
                            <div className="font-bold">4. SOC Action</div>
                            <div className="text-[10px] text-indigo-700">Queued for Blocklist</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span>SHA-256: {inc.evidenceRecord.sha256Hash.slice(0, 24)}...</span>
                      <span className="text-emerald-700 font-sans font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Immutable Legal Receipt
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-3">
            <Search className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-semibold text-slate-800">No Reports Found Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Scan a message or link in the "Verify Message or Link" tab to generate your first anonymous report receipt.
            </p>
          </div>
        )}
      </div>
    );
  }

  // Default: Scanner Tab
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Friendly Citizen Header Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Scam & Phishing Verification Portal
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-semibold">
                CITIZEN DESK
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              MULTI-SIGNAL TRIAGE • ZERO-KNOWLEDGE ANONYMOUS INGEST
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-semibold shrink-0">
          <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>100% Anonymous & End-to-End Encrypted</span>
        </div>
      </div>

      {/* Main Intake Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Intake Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>Choose Submission Type</span>
              </h2>
              <span className="text-[11px] text-slate-400 font-medium">Easy Intake</span>
            </div>

            {/* Channel Selector */}
            <div className="grid grid-cols-4 gap-2">
              <button
                id="channel-sms"
                onClick={() => setChannel('SMS')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  channel === 'SMS'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <MessageSquare className="w-4 h-4 mb-1 text-indigo-600" />
                <span>SMS</span>
              </button>

              <button
                id="channel-whatsapp"
                onClick={() => setChannel('WHATSAPP')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  channel === 'WHATSAPP'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <MessageSquare className="w-4 h-4 mb-1 text-emerald-600" />
                <span>WhatsApp</span>
              </button>

              <button
                id="channel-qr"
                onClick={() => {
                  setChannel('QR');
                  setInputText('https://yono-sbi-update.xyz/sbi-patch.apk (Decoded from QR sticker on payment standee)');
                }}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  channel === 'QR'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <QrCode className="w-4 h-4 mb-1 text-amber-600" />
                <span>QR Code</span>
              </button>

              <button
                id="channel-screenshot"
                onClick={() => {
                  setChannel('SCREENSHOT');
                  setInputText('[OCR Extracted from Screenshot]: "URGENT WARNING: Your SBI YONO access will expire today. Update PAN immediately at https://yono-sbi-update.xyz or call 9823411029"');
                }}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  channel === 'SCREENSHOT'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ImageIcon className="w-4 h-4 mb-1 text-purple-600" />
                <span>Screenshot</span>
              </button>
            </div>

            {/* Quick Test Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Try a Sample Scam Scenario:</span>
                <span className="text-[10px] text-indigo-600 font-medium">Click to load</span>
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    id={`preset-sample-${idx}`}
                    onClick={() => {
                      setChannel(p.channel);
                      setInputText(p.text);
                    }}
                    className="text-left px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-indigo-300 bg-slate-50 hover:bg-indigo-50/40 text-xs text-slate-800 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span className="font-medium truncate">{p.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200/70 text-slate-600 font-semibold shrink-0 ml-2">
                      {p.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">
                Message Content, Suspicious Link, or Phone Number:
              </label>
              <textarea
                id="input-scam-payload"
                rows={5}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste the suspicious text, link, phone number, or UPI ID here..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 font-sans leading-relaxed"
              />
            </div>

            {/* Action Button */}
            <button
              id="btn-analyze-incident"
              disabled={analyzing || !inputText.trim()}
              onClick={handleRunAnalysis}
              className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-500/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {analyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing Threat Indicators...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Verify & Check for Scam</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Real-Time Results & Action Plan (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {createdIncident ? (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6 animate-fadeIn">
              {/* Verdict Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-extrabold text-xl shadow-sm ${
                      createdIncident.riskLevel === 'CRITICAL'
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : createdIncident.riskLevel === 'HIGH'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    <span>{createdIncident.threatScore}</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider opacity-80">/ 100</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          createdIncident.riskLevel === 'CRITICAL'
                            ? 'bg-rose-600 text-white'
                            : createdIncident.riskLevel === 'HIGH'
                            ? 'bg-amber-600 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {createdIncident.riskLevel} Scam Risk
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {createdIncident.id}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      {createdIncident.riskLevel === 'CRITICAL'
                        ? 'Dangerous Fraud Attempt Detected'
                        : 'Suspicious / Potentially Malicious'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Target Brand Identified: <strong className="text-slate-800 uppercase">{createdIncident.extractedEntities.brands[0] || 'Unknown Brand'}</strong>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Report Logged Anonymously</span>
                  </div>
                </div>
              </div>

              {/* Citizen Action Plan Box: What you should do next */}
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Immediate Action Plan for Your Safety:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-rose-900">
                  <div className="bg-white p-3 rounded-xl border border-rose-200/80 space-y-1">
                    <strong className="block font-bold">1. Do Not Click or Call</strong>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Do not open links, download attachments, or share OTPs with this sender.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-rose-200/80 space-y-1">
                    <strong className="block font-bold">2. Block Sender Number</strong>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Block {createdIncident.extractedEntities.phoneNumbers[0] || 'the sender'} on your mobile carrier and WhatsApp.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-rose-200/80 space-y-1">
                    <strong className="block font-bold">3. Call 1930 if Money Lost</strong>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Dial 1930 national helpline immediately if any funds were transferred.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why is this suspicious? (Explainable AI reasons) */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-indigo-600" />
                  <span>Why Our System Flagged This:</span>
                </h4>
                <div className="space-y-1.5">
                  {createdIncident.explainableReasons.map((reason, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extracted IOCs */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Identified Scam Indicators:
                </span>
                <div className="flex flex-wrap gap-2">
                  {createdIncident.extractedEntities.domains.map((dom, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs font-mono font-medium"
                    >
                      Domain: {dom}
                    </span>
                  ))}
                  {createdIncident.extractedEntities.phoneNumbers.map((ph, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono font-medium"
                    >
                      Phone: {ph}
                    </span>
                  ))}
                  {createdIncident.extractedEntities.brands.map((br, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold uppercase"
                    >
                      Impersonating: {br}
                    </span>
                  ))}
                </div>
              </div>

              {/* Legal Reference & Proof Receipt */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Fingerprint className="w-4 h-4 text-indigo-600" />
                    <span>Cryptographic Evidence Receipt</span>
                  </span>
                  <span className="font-mono text-slate-500 text-[11px]">
                    Ticket: {createdIncident.id}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-600 break-all flex items-center justify-between gap-2">
                  <span className="truncate">SHA-256: {createdIncident.evidenceRecord.sha256Hash}</span>
                  <button
                    onClick={() => handleCopyHash(createdIncident.evidenceRecord.sha256Hash)}
                    className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer shrink-0"
                    title="Copy Hash"
                  >
                    {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  This timestamped proof is archived on the blockchain and can be referenced in official complaints at cybercrime.gov.in.
                </p>
              </div>
            </div>
          ) : (
            /* Idle State */
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-4 min-h-[420px] flex flex-col items-center justify-center shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
                <Search className="w-7 h-7" />
              </div>
              <div className="max-w-md space-y-1.5">
                <h3 className="text-base font-bold text-slate-900">Ready to Analyze</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Select a sample scam scenario or paste any message, phone number, or link on the left to verify its safety and receive actionable guidance.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 pt-2">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Instant Verdict
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Zero PII Stored
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Court-Admissible Receipt
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

