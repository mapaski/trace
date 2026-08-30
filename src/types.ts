export type ChannelType = 'SMS' | 'WHATSAPP' | 'EMAIL' | 'URL' | 'QR' | 'SCREENSHOT';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type NodeType =
  | 'INCIDENT'
  | 'REPORTER'
  | 'URL'
  | 'DOMAIN'
  | 'IP'
  | 'PHONE'
  | 'EMAIL'
  | 'QR'
  | 'BRAND'
  | 'CAMPAIGN';

export type EdgeType =
  | 'CONTAINS_URL'
  | 'RESOLVES_TO_DOMAIN'
  | 'ASSOCIATED_WITH_IP'
  | 'MENTIONS_PHONE'
  | 'IMPERSONATES_BRAND'
  | 'SIMILAR_TO'
  | 'BELONGS_TO_CAMPAIGN';

export interface SignalScores {
  language: number;      // Phishing intent, urgency, impersonation
  cyberUrl: number;      // Domain age, typosquatting, redirect chains
  behaviour: number;     // Payment request, OTP/credentials harvesting
  collective: number;    // Linked previous incidents, known IOC matches
}

export interface ExtractedEntities {
  urls: string[];
  domains: string[];
  ips: string[];
  phoneNumbers: string[];
  emails: string[];
  brands: string[];
  qrDestinations: string[];
  urgencyKeywords: string[];
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  stage: 'SUBMITTED' | 'HASHED' | 'ANALYZED' | 'CLASSIFIED' | 'CORRELATED' | 'REVIEWED' | 'REPORT_GENERATED';
  actor: string;
  details: string;
  hashSnapshot: string;
}

export interface EvidenceRecord {
  id: string;
  incidentId: string;
  sha256Hash: string;
  originalPayload: string;
  currentPayload: string;
  timestamp: string;
  version: string;
  modelVersion: string;
  blockNumber: number;
  txHash: string;
  merkleRoot: string;
  isTampered: boolean;
  tamperMessage?: string;
  chainOfCustody: AuditEvent[];
}

export interface Incident {
  id: string;
  reporterPseudonym: string;
  timestamp: string;
  channel: ChannelType;
  rawInput: string;
  extractedEntities: ExtractedEntities;
  threatScore: number;
  riskLevel: RiskLevel;
  signalScores: SignalScores;
  explainableReasons: string[];
  campaignId?: string;
  evidenceRecord: EvidenceRecord;
  status: 'TRIAGED' | 'INVESTIGATING' | 'ESCALATED' | 'RESOLVED';
}

export interface EvolutionStage {
  stageNumber: number;
  channel: ChannelType | 'MULTI_VECTOR';
  title: string;
  description: string;
  timeframe: string;
  newIOCs: string[];
  riskShift: RiskLevel;
}

export interface Campaign {
  id: string;
  name: string;
  codeName: string;
  category: string;
  impersonatedBrand: string;
  threatLevel: RiskLevel;
  riskScore: number;
  firstDetected: string;
  lastActive: string;
  incidentCount: number;
  affectedVictimCountEst: number;
  status: 'ACTIVE' | 'CONTAINED' | 'RAPIDLY_ESCALATING';
  growthRatePct: number;
  domains: string[];
  phones: string[];
  ips: string[];
  evolution: EvolutionStage[];
  executiveSummary: string;
  attackVectorSequence: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  risk: RiskLevel;
  campaignId?: string;
  connectionsCount?: number;
  metadata?: Record<string, string | number | boolean>;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: EdgeType;
  label: string;
  highlighted?: boolean;
}

export interface JuryDemoScenario {
  id: string;
  number: 1 | 2 | 3;
  pillar: 'DETECT' | 'CONNECT' | 'PROVE';
  title: string;
  shortDesc: string;
  detailedSteps: string[];
  actionPrompt: string;
}
