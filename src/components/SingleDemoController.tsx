import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  X,
  Play,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Shield,
  FileText,
  GitBranch,
  TrendingUp,
  Lock,
  UserCheck,
  AlertTriangle,
  RotateCcw,
  Volume2
} from 'lucide-react';

export interface SingleDemoStep {
  stepNumber: number;
  timeframe: string;
  title: string;
  pillar: string;
  spokenScript: string;
  actionSummary: string;
  targetView: {
    role: 'citizen' | 'investigator';
    citizenTab?: 'scanner' | 'track_report' | 'awareness';
    investigatorTab?: 'campaigns_stream' | 'threat_graph' | 'vector_evolution' | 'evidence_vault';
  };
}

export const SINGLE_DEMO_STEPS: SingleDemoStep[] = [
  {
    stepNumber: 1,
    timeframe: '0:00 - 0:25',
    title: 'Citizen Ingestion & Multi-Signal AI Triage',
    pillar: 'Pillar 01: Ingest & Detect',
    spokenScript: `Respected Jury, when a citizen receives a scam message, they don't know who to trust. Let's see what happens when a citizen receives an urgent SMS: "Your SBI YONO account will be blocked today. Click this link."
The citizen pastes it into TRACE's Citizen Safety Portal. In milliseconds, our multi-signal engine extracts the phishing link, the sender's SIM, the brand impersonation, and issues a 94/100 Threat Score with a 3-step immediate safety plan and a 1930 emergency helpline recommendation.`,
    actionSummary: 'Citizen portal ingests SMS, analyzes phishing domain yono-sbi-update.xyz, phone +919823411029, and outputs plain-language advisory.',
    targetView: {
      role: 'citizen',
      citizenTab: 'scanner',
    },
  },
  {
    stepNumber: 2,
    timeframe: '0:25 - 0:55',
    title: 'SOC Threat Graph & Campaign Hub Correlation',
    pillar: 'Pillar 02: Connect & Correlate',
    spokenScript: `Now, switching hats to the Cyber Crime Police and Bank SOC Console:
Instead of treating this as an isolated SMS, TRACE's Threat Relationship Graph automatically correlates this individual report with 18 other complaints across India. It connects the new phishing domain to a shared hosting IP in Singapore, SIM pools, and a centralized threat cluster code-named Operation PhishYono.`,
    actionSummary: 'SOC Threat Graph connects isolated citizen incident into active campaign cluster CAMP-2841 via shared IP and domain heuristics.',
    targetView: {
      role: 'investigator',
      investigatorTab: 'threat_graph',
    },
  },
  {
    stepNumber: 3,
    timeframe: '0:55 - 1:20',
    title: 'Predictive Vector Evolution & Countermeasures',
    pillar: 'Pillar 03: Predict & Track',
    spokenScript: `Scammers constantly adapt. In the Vector Evolution Timeline, TRACE tracks how this syndicate started with SMS smishing, pivoted to WhatsApp spoofing, placed fake QR stickers on ATM kiosks, and is now dropping trojanized Android APKs.
TRACE's AI generates proactive next-hop predictions—enabling ISPs to sinkhole variations of the domain and banks to block fraudulent mule accounts before they launch.`,
    actionSummary: 'Visualizes the 4-stage progression across SMS -> WhatsApp -> QR -> APK and generates proactive ISP sinkhole rules.',
    targetView: {
      role: 'investigator',
      investigatorTab: 'vector_evolution',
    },
  },
  {
    stepNumber: 4,
    timeframe: '1:20 - 1:45',
    title: 'Cryptographic Court Proof & Section 65B Tamper Test',
    pillar: 'Pillar 04: Prove & Anchor',
    spokenScript: `The biggest bottleneck in prosecuting cybercriminals is electronic evidence tampering in court. Under Evidence Vault, every raw payload is SHA-256 hashed at ingestion and anchored to an immutable blockchain ledger.
Watch what happens if a malicious actor or insider attempts to alter a single digit in the perpetrator's phone number—the live hash computation instantly fails, ensuring 100% compliance with Section 65B of the Indian Evidence Act.`,
    actionSummary: 'Demonstrates live hash divergence and immutable ledger proof when a single character in the raw evidence is altered.',
    targetView: {
      role: 'investigator',
      investigatorTab: 'evidence_vault',
    },
  },
  {
    stepNumber: 5,
    timeframe: '1:45 - 2:00',
    title: 'Law Enforcement Dossier & ISP Takedown Export',
    pillar: 'Action: Takedown & Dispatch',
    spokenScript: `With one click on Export Dossier, the SOC generates an official, standardized threat intelligence brief ready for CERT-In, Law Enforcement FIRs, and ISP takedown orders.
From a scared citizen's SMS to a court-admissible takedown in under 2 minutes—that is TRACE. Thank you.`,
    actionSummary: 'Generates comprehensive legal & forensic brief with all IOCs, Merkle roots, and chain-of-custody anchors for CERT-In & Police.',
    targetView: {
      role: 'investigator',
      investigatorTab: 'campaigns_stream',
    },
  },
];

interface SingleDemoControllerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateView: (target: SingleDemoStep['targetView']) => void;
  onOpenReportModal: () => void;
  onTriggerTamper?: () => void;
  onTriggerGraphCollapse?: () => void;
}

export const SingleDemoController: React.FC<SingleDemoControllerProps> = ({
  isOpen,
  onClose,
  onNavigateView,
  onOpenReportModal,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isScriptViewMode, setIsScriptViewMode] = useState(false);
  const [copiedFullScript, setCopiedFullScript] = useState(false);
  const [copiedStepScript, setCopiedStepScript] = useState(false);

  const step = SINGLE_DEMO_STEPS[currentStepIndex];

  // Sync view whenever step changes
  useEffect(() => {
    if (isOpen && step) {
      onNavigateView(step.targetView);
      if (step.stepNumber === 5) {
        onOpenReportModal();
      }
    }
  }, [currentStepIndex, isOpen]);

  const handleNextStep = () => {
    if (currentStepIndex < SINGLE_DEMO_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleJumpToStep = (index: number) => {
    setCurrentStepIndex(index);
  };

  const handleCopyStepScript = () => {
    navigator.clipboard.writeText(step.spokenScript);
    setCopiedStepScript(true);
    setTimeout(() => setCopiedStepScript(false), 2000);
  };

  const handleCopyFullScript = () => {
    const full = `TRACE SIH UNIFIED 120-SECOND DEMO SCRIPT (One Single Cohesive Story)
========================================================================

${SINGLE_DEMO_STEPS.map(
  (s) => `[STEP ${s.stepNumber} - ${s.timeframe}] ${s.title.toUpperCase()} (${s.pillar})
------------------------------------------------------------------------
WHAT YOU SAY:
"${s.spokenScript}"

ACTION ON SCREEN:
${s.actionSummary}
`
).join('\n\n')}
========================================================================
    `.trim();

    navigator.clipboard.writeText(full);
    setCopiedFullScript(true);
    setTimeout(() => setCopiedFullScript(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  TRACE Unified SIH Evaluation Demo
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  120s Single Story
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                One continuous, end-to-end walkthrough covering all 4 core pillars
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsScriptViewMode(!isScriptViewMode)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-all cursor-pointer"
            >
              {isScriptViewMode ? 'Interactive Stepper' : 'Full Script Mode'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isScriptViewMode ? (
          /* Full Continuous Script View */
          <div className="p-6 overflow-y-auto space-y-6 bg-slate-50 flex-1">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Full 120-Second Presentation Script</h3>
                <p className="text-xs text-slate-500">Read or copy this exact script for the evaluation pitch</p>
              </div>
              <button
                onClick={handleCopyFullScript}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                {copiedFullScript ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFullScript ? 'Copied Full Script' : 'Copy All Text'}</span>
              </button>
            </div>

            <div className="space-y-4">
              {SINGLE_DEMO_STEPS.map((s) => (
                <div key={s.stepNumber} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-indigo-700">
                      Step {s.stepNumber} ({s.timeframe}) — {s.title}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {s.pillar}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-sans font-medium whitespace-pre-line bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{s.spokenScript}"
                  </p>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <strong>Action:</strong> <span>{s.actionSummary}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Interactive Step-By-Step Guided Controller */
          <div className="p-6 overflow-y-auto space-y-6 flex-1 flex flex-col justify-between bg-white">
            {/* Step Progress Pills */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">
                  Step {step.stepNumber} of {SINGLE_DEMO_STEPS.length}: {step.title}
                </span>
                <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                  {step.timeframe}
                </span>
              </div>

              {/* Progress Bar Grid */}
              <div className="grid grid-cols-5 gap-2">
                {SINGLE_DEMO_STEPS.map((s, idx) => (
                  <button
                    key={s.stepNumber}
                    onClick={() => handleJumpToStep(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      idx === currentStepIndex
                        ? 'bg-indigo-600 ring-2 ring-indigo-300 ring-offset-1'
                        : idx < currentStepIndex
                        ? 'bg-emerald-500'
                        : 'bg-slate-200 hover:bg-slate-300'
                    }`}
                    title={`Jump to Step ${s.stepNumber}: ${s.title}`}
                  />
                ))}
              </div>
            </div>

            {/* Main Step Presentation Box */}
            <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[11px] font-bold">
                    Stage {step.stepNumber}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    {step.pillar}
                  </span>
                </div>
                <button
                  onClick={handleCopyStepScript}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-semibold cursor-pointer"
                >
                  {copiedStepScript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedStepScript ? 'Copied' : 'Copy Script'}</span>
                </button>
              </div>

              {/* Spoken Script Box */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                  <span>Exact Pitch Script (What to say right now):</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans font-medium whitespace-pre-line shadow-xs">
                  "{step.spokenScript}"
                </div>
              </div>

              {/* Live UI State Synchronization Info */}
              <div className="bg-indigo-50/70 p-3.5 rounded-xl border border-indigo-100 text-xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-slate-700 leading-snug">
                  <strong className="text-indigo-900 block font-semibold mb-0.5">
                    Live UI Synchronized:
                  </strong>
                  {step.actionSummary}
                </div>
              </div>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Stage</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onNavigateView(step.targetView);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer transition-all"
                >
                  View Screen & Interact
                </button>

                {currentStepIndex < SINGLE_DEMO_STEPS.length - 1 ? (
                  <button
                    onClick={handleNextStep}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm cursor-pointer transition-all"
                  >
                    <span>Next Stage ({SINGLE_DEMO_STEPS[currentStepIndex + 1].timeframe})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Finish Demo</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
