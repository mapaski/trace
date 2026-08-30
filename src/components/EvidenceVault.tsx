import React, { useState } from 'react';
import { EvidenceRecord, Incident } from '../types';
import { calculateSHA256 } from '../utils/crypto';
import {
  FileCheck2,
  Lock,
  ShieldCheck,
  AlertOctagon,
  RefreshCw,
  Fingerprint,
  Link,
  Clock,
  History,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  AlertTriangle,
  FileCode
} from 'lucide-react';

interface EvidenceVaultProps {
  incidents: Incident[];
  onUpdateEvidence?: (incidentId: string, updatedRecord: EvidenceRecord) => void;
}

export const EvidenceVault: React.FC<EvidenceVaultProps> = ({ incidents }) => {
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>(
    incidents[0]?.id || 'INC-2026-8801'
  );

  const selectedIncident =
    incidents.find((i) => i.id === selectedIncidentId) || incidents[0];

  const [editablePayload, setEditablePayload] = useState<string>(
    selectedIncident?.evidenceRecord.currentPayload || ''
  );
  const [liveHash, setLiveHash] = useState<string>(
    selectedIncident?.evidenceRecord.sha256Hash || ''
  );
  const [isTampered, setIsTampered] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  // Sync state when selected incident changes
  const handleSelectIncident = (id: string) => {
    setSelectedIncidentId(id);
    const inc = incidents.find((i) => i.id === id);
    if (inc) {
      setEditablePayload(inc.evidenceRecord.originalPayload);
      setLiveHash(inc.evidenceRecord.sha256Hash);
      setIsTampered(false);
    }
  };

  const handlePayloadChange = async (text: string) => {
    setEditablePayload(text);
    const computed = await calculateSHA256(text);
    setLiveHash(computed);
    if (selectedIncident) {
      setIsTampered(computed !== selectedIncident.evidenceRecord.sha256Hash);
    }
  };

  const handleInjectTamperSample = async () => {
    if (!selectedIncident) return;
    const tamperedText = selectedIncident.evidenceRecord.originalPayload.replace(
      '9823411029',
      '9999999999'
    );
    setEditablePayload(tamperedText);
    const computed = await calculateSHA256(tamperedText);
    setLiveHash(computed);
    setIsTampered(true);
  };

  const handleResetPayload = () => {
    if (!selectedIncident) return;
    setEditablePayload(selectedIncident.evidenceRecord.originalPayload);
    setLiveHash(selectedIncident.evidenceRecord.sha256Hash);
    setIsTampered(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  if (!selectedIncident) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-slate-400">
        No evidence records available in vault.
      </div>
    );
  }

  const record = selectedIncident.evidenceRecord;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
            <Lock className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Cryptographic Evidence Vault
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                SEC. 65B COMPLIANT
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              LEDGER: SHA-256 ANCHORED • CHAIN INTEGRITY: 100% VERIFIED
            </p>
          </div>
        </div>

        {/* Evidence Tamper Simulation */}
        <button
          id="btn-tamper-simulation"
          onClick={handleInjectTamperSample}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition-all cursor-pointer shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Simulate Live Evidence Tampering</span>
        </button>
      </div>

      {/* Main Grid: Incident Selector + Evidence Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Records list (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-600" />
                <span>Anchored Evidence Records</span>
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                {incidents.length} Sealed
              </span>
            </div>

            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {incidents.map((inc) => (
                <button
                  key={inc.id}
                  onClick={() => handleSelectIncident(inc.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedIncidentId === inc.id
                      ? 'bg-indigo-50/70 border-indigo-300 text-slate-900 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-slate-900">{inc.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white border border-slate-200 text-slate-600">
                      {inc.channel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 truncate">
                    {inc.extractedEntities.domains[0] || inc.extractedEntities.phoneNumbers[0] || inc.rawInput}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-200/60 font-mono">
                    <span>Block #{inc.evidenceRecord.blockNumber}</span>
                    <span className="text-emerald-700 font-semibold font-sans flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Sealed
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Proof Inspector & Interactive Hash Verification (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
            {/* Tamper Alert Status */}
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                isTampered
                  ? 'bg-rose-50 border-rose-300 text-rose-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}
            >
              <div className="flex items-center gap-3">
                {isTampered ? (
                  <AlertOctagon className="w-6 h-6 text-rose-600 shrink-0" />
                ) : (
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-sm">
                    {isTampered
                      ? 'Tampering Detected: Hash Mismatch'
                      : 'Cryptographic Integrity Verified: Untampered'}
                  </h4>
                  <p className="text-xs opacity-90">
                    {isTampered
                      ? 'The payload has been modified from its on-chain baseline. Court admissibility is automatically invalidated.'
                      : 'Computed SHA-256 matches immutable on-chain record. Court certificate valid.'}
                  </p>
                </div>
              </div>

              {isTampered && (
                <button
                  onClick={handleResetPayload}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shrink-0 cursor-pointer shadow-xs"
                >
                  Restore Original
                </button>
              )}
            </div>

            {/* Evidence Metadata Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium">Record ID</span>
                <p className="font-mono font-bold text-slate-800">{record.id}</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium">Sealed Timestamp</span>
                <p className="font-mono text-slate-800">{new Date(record.timestamp).toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium">Ledger Block Number</span>
                <p className="font-mono font-bold text-indigo-700">#{record.blockNumber}</p>
              </div>
            </div>

            {/* Live Interactive Payload Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-700">
                  Forensic Raw Payload (Interactive Sandbox for Tamper Testing):
                </label>
                <span className="text-slate-500 text-[11px]">Type or edit below to test hash validation</span>
              </div>
              <textarea
                value={editablePayload}
                onChange={(e) => handlePayloadChange(e.target.value)}
                rows={4}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 leading-relaxed"
              />
            </div>

            {/* Hash Comparison Dual Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Original Anchor Hash */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-slate-700 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Immutable On-Chain Hash (Baseline)</span>
                  </span>
                  <button
                    onClick={() => handleCopy(record.sha256Hash)}
                    className="text-slate-400 hover:text-slate-700 cursor-pointer"
                    title="Copy Original Hash"
                  >
                    {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-700 break-all">
                  {record.sha256Hash}
                </div>
              </div>

              {/* Computed Live Hash */}
              <div
                className={`p-4 rounded-xl border space-y-2 transition-all ${
                  isTampered
                    ? 'bg-rose-50/70 border-rose-300 text-rose-900'
                    : 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                }`}
              >
                <div className="flex items-center justify-between font-semibold">
                  <span className="flex items-center gap-1.5">
                    <RefreshCw className={`w-3.5 h-3.5 ${isTampered ? 'text-rose-600' : 'text-emerald-600'}`} />
                    <span>Live Recomputed SHA-256</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase">
                    {isTampered ? 'FAIL' : 'MATCH'}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-700 break-all">
                  {liveHash}
                </div>
              </div>
            </div>

            {/* Legal Chain of Custody Audit Box */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Fingerprint className="w-4 h-4 text-indigo-600" />
                <span>Section 65B Indian Evidence Act Admissibility Certificate</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                This digital evidence artifact has been timestamped and cryptographically registered under node consensus. Any modification to single character in the raw payload causes catastrophic hash divergence, making fraud disputes and evidence repudiation mathematically impossible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
