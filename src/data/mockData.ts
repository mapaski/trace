import { Campaign, GraphEdge, GraphNode, Incident, JuryDemoScenario } from '../types';

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'CAMP-2841',
    name: 'Apex Bank KYC Harvest & SIM Swap Smishing Syndicate',
    codeName: 'OPERATION PHANTOM YONO',
    category: 'Banking & Financial Credential Harvesting',
    impersonatedBrand: 'State Bank of India (SBI / YONO)',
    threatLevel: 'CRITICAL',
    riskScore: 94,
    firstDetected: '2026-08-12 04:15:00 UTC',
    lastActive: '2026-08-29 10:48:12 UTC',
    incidentCount: 147,
    affectedVictimCountEst: 1840,
    status: 'RAPIDLY_ESCALATING',
    growthRatePct: 41.8,
    domains: [
      'yono-sbi-update.xyz',
      'sbikyc-pan-verify.online',
      'quick-yono-reward.top',
      'sbi-netprotect-auth.ru',
      'onlinesbi-panlink.live',
      'sbiprotect-login.site'
    ],
    phones: [
      '+91 98234 11029',
      '+91 91203 44921',
      '+91 88412 90123',
      '+91 79012 34182',
      '+91 93110 58219'
    ],
    ips: ['198.51.100.42', '185.220.101.5', '45.154.255.89'],
    attackVectorSequence: [
      'Urgent SMS regarding PAN card block',
      'Redirect to phishing site mirroring YONO banking portal',
      'Credential & OTP harvesting form',
      'Silent reverse proxy SIM swap attempt'
    ],
    evolution: [
      {
        stageNumber: 1,
        channel: 'SMS',
        title: 'Mass SMS Phishing (Bitly/TinyURL)',
        description: 'Initial wave using bulk SMS gateways with shortlinks alerting users of urgent PAN block.',
        timeframe: 'Aug 12 - Aug 18',
        newIOCs: ['yono-sbi-update.xyz', '+91 98234 11029'],
        riskShift: 'MEDIUM',
      },
      {
        stageNumber: 2,
        channel: 'WHATSAPP',
        title: 'WhatsApp Official Logo Impersonation',
        description: 'Attackers shifted to hijacked WhatsApp Business profiles sending fake official PDF notices.',
        timeframe: 'Aug 19 - Aug 24',
        newIOCs: ['sbikyc-pan-verify.online', '+91 91203 44921'],
        riskShift: 'HIGH',
      },
      {
        stageNumber: 3,
        channel: 'QR',
        title: 'Dynamic QR Delivery & Malicious APK Payload',
        description: 'Latest iteration sends QR codes directing users to download a fake "SBI Security Patch.apk" credential stealer.',
        timeframe: 'Aug 25 - Present',
        newIOCs: ['sbi-netprotect-auth.ru', '185.220.101.5'],
        riskShift: 'CRITICAL',
      },
    ],
    executiveSummary:
      'Coordinated cyber criminal infrastructure operating out of multiple bulletproof hosting providers. Rapidly shifting from SMS smishing to dynamic QR and malicious APK delivery to bypass standard SMS spam filters.',
  },
  {
    id: 'CAMP-1042',
    name: 'State Power Grid "Tonight 9:30 PM" Disconnection Extortion',
    codeName: 'OPERATION BLACKOUT FEAR',
    category: 'Public Utility Impersonation & Remote Access Fraud',
    impersonatedBrand: 'State Electricity Distribution Board (DISCOM)',
    threatLevel: 'CRITICAL',
    riskScore: 89,
    firstDetected: '2026-08-05 11:20:00 UTC',
    lastActive: '2026-08-29 09:12:00 UTC',
    incidentCount: 89,
    affectedVictimCountEst: 920,
    status: 'ACTIVE',
    growthRatePct: 24.5,
    domains: [
      'bijli-bill-payment.live',
      'discom-quickpay.online',
      'statepower-verify.cc'
    ],
    phones: [
      '+91 94120 77123',
      '+91 81023 99401',
      '+91 70123 66109'
    ],
    ips: ['103.251.167.22', '194.26.29.112'],
    attackVectorSequence: [
      'Intimidation SMS warning power cut at 9:30 PM due to unpaid bill',
      'Caller instructs victim to call electricity officer number',
      'Victim coerced to install remote support app (AnyDesk/TeamViewer)',
      'Bank balance drained during micro-transaction'
    ],
    evolution: [
      {
        stageNumber: 1,
        channel: 'SMS',
        title: 'Regional Disconnection Smishing',
        description: 'Targeted SMS sent in regional languages claiming unpaid ₹12 bill and imminent power cut.',
        timeframe: 'Aug 05 - Aug 15',
        newIOCs: ['+91 94120 77123'],
        riskShift: 'HIGH',
      },
      {
        stageNumber: 2,
        channel: 'URL',
        title: 'Spoofed Payment Gateway with AnyDesk Guide',
        description: 'Added fake bill verification portal that downloads remote desktop APK directly.',
        timeframe: 'Aug 16 - Present',
        newIOCs: ['bijli-bill-payment.live', '103.251.167.22'],
        riskShift: 'CRITICAL',
      },
    ],
    executiveSummary:
      'Psychological extortion campaign exploiting fear of utility cutoff. Primary delivery relies on urgency messages sent between 6:00 PM and 8:30 PM.',
  },
  {
    id: 'CAMP-4419',
    name: 'Customs & Narcotics Parcel Extortion ("Digital Arrest")',
    codeName: 'OPERATION FORGED BADGE',
    category: 'Law Enforcement / Courier Extortion',
    impersonatedBrand: 'FedEx / Customs & Cyber Crime Cell',
    threatLevel: 'HIGH',
    riskScore: 78,
    firstDetected: '2026-08-16 08:30:00 UTC',
    lastActive: '2026-08-28 16:45:00 UTC',
    incidentCount: 63,
    affectedVictimCountEst: 310,
    status: 'ACTIVE',
    growthRatePct: 15.2,
    domains: ['fedex-customs-clearance.top', 'police-noc-verify.link'],
    phones: ['+91 99104 22091', '+91 80192 33812'],
    ips: ['194.67.210.14'],
    attackVectorSequence: [
      'Robocall claiming detained international parcel containing contraband',
      'Call transferred to fake police inspector over Skype/WhatsApp video',
      'Coerced money transfer to "RBI verification escrow account"'
    ],
    evolution: [
      {
        stageNumber: 1,
        channel: 'SMS',
        title: 'Courier Address Verification SMS',
        description: 'Fake parcel tracking failure prompts user to verify identity.',
        timeframe: 'Aug 16 - Aug 21',
        newIOCs: ['fedex-customs-clearance.top'],
        riskShift: 'MEDIUM',
      },
      {
        stageNumber: 2,
        channel: 'WHATSAPP',
        title: 'WhatsApp Video Digital Arrest Escrow',
        description: 'Impersonating police uniforms on video to demand high-value transfers.',
        timeframe: 'Aug 22 - Present',
        newIOCs: ['+91 99104 22091', 'police-noc-verify.link'],
        riskShift: 'HIGH',
      },
    ],
    executiveSummary:
      'High-impact social engineering racket intimidating victims with fake legal notices and video calls with fraudulent police backgrounds.',
  },
  {
    id: 'CAMP-3120',
    name: 'YouTube Rating & Prepaid Crypto Task Fraud Ring',
    codeName: 'OPERATION TELEGRAM REWARD',
    category: 'Work-From-Home Task Fraud',
    impersonatedBrand: 'Global Media Agency / Telegram Tasks',
    threatLevel: 'CRITICAL',
    riskScore: 91,
    firstDetected: '2026-07-28 14:00:00 UTC',
    lastActive: '2026-08-29 08:30:00 UTC',
    incidentCount: 112,
    affectedVictimCountEst: 2400,
    status: 'RAPIDLY_ESCALATING',
    growthRatePct: 37.4,
    domains: ['task-vip-rewards.online', 'earn-rating-crypto.top', 'global-merchant-pay.site'],
    phones: ['+91 78912 00192', '+91 96541 22910'],
    ips: ['45.134.22.18', '195.123.245.9'],
    attackVectorSequence: [
      'Unsolicited WhatsApp message offering ₹3,000/day for liking YouTube videos',
      'Small initial payout of ₹150 to build trust',
      'Added to VIP Telegram channel with "prepaid merchant tasks"',
      'Victim funds locked in fake crypto wallet dashboard'
    ],
    evolution: [
      {
        stageNumber: 1,
        channel: 'WHATSAPP',
        title: 'Initial Lure via WhatsApp Business',
        description: 'Automated bots spamming millions with remote job propositions.',
        timeframe: 'Jul 28 - Aug 10',
        newIOCs: ['+91 78912 00192'],
        riskShift: 'MEDIUM',
      },
      {
        stageNumber: 2,
        channel: 'URL',
        title: 'Merchant Task Dashboard with Fake Ledger',
        description: 'Victims deposit funds into mule UPI IDs to upgrade VIP tiers.',
        timeframe: 'Aug 11 - Present',
        newIOCs: ['task-vip-rewards.online', '45.134.22.18'],
        riskShift: 'CRITICAL',
      },
    ],
    executiveSummary:
      'Industrial-scale pig butchering and task fraud network utilizing decentralized mule accounts and rotating Telegram groups.',
  },
];

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-2026-8801',
    reporterPseudonym: 'Anon_CyberCitizen_941',
    timestamp: '2026-08-29 10:14:22 UTC',
    channel: 'SMS',
    rawInput:
      'Dear SBI Customer, Your YONO Account will be blocked today within 24 hours. Please update your PAN Card immediately by clicking https://yono-sbi-update.xyz to avoid suspension. Helpline: +919823411029',
    extractedEntities: {
      urls: ['https://yono-sbi-update.xyz'],
      domains: ['yono-sbi-update.xyz'],
      ips: ['198.51.100.42'],
      phoneNumbers: ['+91 98234 11029'],
      emails: [],
      brands: ['State Bank of India (SBI / YONO)'],
      qrDestinations: [],
      urgencyKeywords: ['blocked today', 'within 24 hours', 'immediately', 'avoid suspension'],
    },
    threatScore: 96,
    riskLevel: 'CRITICAL',
    signalScores: {
      language: 94,
      cyberUrl: 98,
      behaviour: 92,
      collective: 96,
    },
    explainableReasons: [
      'Brand impersonation of State Bank of India YONO portal',
      'High urgency fear-trigger: Threatens 24-hour account suspension',
      'Phishing domain registered on .xyz TLD with known suspicious hosting IP (198.51.100.42)',
      'Associated phone number (+91 98234 11029) linked to Campaign #2841 in national registry',
    ],
    campaignId: 'CAMP-2841',
    status: 'INVESTIGATING',
    evidenceRecord: {
      id: 'EVID-8801',
      incidentId: 'INC-2026-8801',
      sha256Hash: 'a7c9f4d1e298103bba81230f149b5c23315a6b7e8d9c0e1f2a3b4c5d6e7f8a9b',
      originalPayload:
        'Dear SBI Customer, Your YONO Account will be blocked today within 24 hours. Please update your PAN Card immediately by clicking https://yono-sbi-update.xyz to avoid suspension. Helpline: +919823411029',
      currentPayload:
        'Dear SBI Customer, Your YONO Account will be blocked today within 24 hours. Please update your PAN Card immediately by clicking https://yono-sbi-update.xyz to avoid suspension. Helpline: +919823411029',
      timestamp: '2026-08-29 10:14:23 UTC',
      version: '1.0.0',
      modelVersion: 'TRACE-MultiSignal-v3.4',
      blockNumber: 4891024,
      txHash: '0x8f2d91a0c4e5b761823901bca9823471029384abcdef1029384756abcdef9921',
      merkleRoot: '0x4910293847561029384756abcdef1029384756abcdef1029384756abcdef1029',
      isTampered: false,
      chainOfCustody: [
        {
          id: 'AUD-01',
          timestamp: '2026-08-29 10:14:22 UTC',
          stage: 'SUBMITTED',
          actor: 'Citizen Portal (Anonymous Ingestion Gateway)',
          details: 'Raw SMS payload received from secure TLS ingress',
          hashSnapshot: 'a7c9f4d1e298103bba81230f149b5c23315a6b7e8d9c0e1f2a3b4c5d6e7f8a9b',
        },
        {
          id: 'AUD-02',
          timestamp: '2026-08-29 10:14:23 UTC',
          stage: 'HASHED',
          actor: 'TRACE Cryptographic Engine (SHA-256)',
          details: 'Canonical SHA-256 calculated & anchored to evidence record',
          hashSnapshot: 'a7c9f4d1e298103bba81230f149b5c23315a6b7e8d9c0e1f2a3b4c5d6e7f8a9b',
        },
        {
          id: 'AUD-03',
          timestamp: '2026-08-29 10:14:24 UTC',
          stage: 'ANALYZED',
          actor: 'Multimodal Intelligence Parser',
          details: 'Extracted 1 URL, 1 Domain, 1 Phone, 4 Urgency tokens',
          hashSnapshot: 'a7c9f4d1e298103bba81230f149b5c23315a6b7e8d9c0e1f2a3b4c5d6e7f8a9b',
        },
        {
          id: 'AUD-04',
          timestamp: '2026-08-29 10:14:25 UTC',
          stage: 'CORRELATED',
          actor: 'Neo4j Graph Correlation Engine',
          details: 'Linked to Campaign #2841 via shared IP 198.51.100.42 and domain schema',
          hashSnapshot: 'a7c9f4d1e298103bba81230f149b5c23315a6b7e8d9c0e1f2a3b4c5d6e7f8a9b',
        },
      ],
    },
  },
  {
    id: 'INC-2026-8802',
    reporterPseudonym: 'Anon_CyberCitizen_102',
    timestamp: '2026-08-29 09:32:10 UTC',
    channel: 'WHATSAPP',
    rawInput:
      'Official SBI Alert: Your NetBanking service is on hold. Tap to re-activate PAN details at https://sbikyc-pan-verify.online before midnight. For queries call Manager +919120344921',
    extractedEntities: {
      urls: ['https://sbikyc-pan-verify.online'],
      domains: ['sbikyc-pan-verify.online'],
      ips: ['198.51.100.42'],
      phoneNumbers: ['+91 91203 44921'],
      emails: [],
      brands: ['State Bank of India (SBI / YONO)'],
      qrDestinations: [],
      urgencyKeywords: ['on hold', 'before midnight', 're-activate'],
    },
    threatScore: 92,
    riskLevel: 'CRITICAL',
    signalScores: {
      language: 88,
      cyberUrl: 95,
      behaviour: 90,
      collective: 94,
    },
    explainableReasons: [
      'WhatsApp message imitating official banking communication',
      'Suspicious domain sbikyc-pan-verify.online sharing IP with known active phishing hosts',
      'Phone number +91 91203 44921 matches actor infrastructure in Campaign #2841',
    ],
    campaignId: 'CAMP-2841',
    status: 'INVESTIGATING',
    evidenceRecord: {
      id: 'EVID-8802',
      incidentId: 'INC-2026-8802',
      sha256Hash: '91bc83e201a44f9988112233445566778899aabbccddeeff0011223344556677',
      originalPayload:
        'Official SBI Alert: Your NetBanking service is on hold. Tap to re-activate PAN details at https://sbikyc-pan-verify.online before midnight. For queries call Manager +919120344921',
      currentPayload:
        'Official SBI Alert: Your NetBanking service is on hold. Tap to re-activate PAN details at https://sbikyc-pan-verify.online before midnight. For queries call Manager +919120344921',
      timestamp: '2026-08-29 09:32:11 UTC',
      version: '1.0.0',
      modelVersion: 'TRACE-MultiSignal-v3.4',
      blockNumber: 4890980,
      txHash: '0x33445566778899aabbccddeeff00112233445566778899aabbccddeeff001122',
      merkleRoot: '0x4910293847561029384756abcdef1029384756abcdef1029384756abcdef1029',
      isTampered: false,
      chainOfCustody: [
        {
          id: 'AUD-05',
          timestamp: '2026-08-29 09:32:10 UTC',
          stage: 'SUBMITTED',
          actor: 'Citizen Portal (Anonymous Ingestion Gateway)',
          details: 'WhatsApp transcript payload ingested',
          hashSnapshot: '91bc83e201a44f9988112233445566778899aabbccddeeff0011223344556677',
        },
        {
          id: 'AUD-06',
          timestamp: '2026-08-29 09:32:11 UTC',
          stage: 'HASHED',
          actor: 'TRACE Cryptographic Engine (SHA-256)',
          details: 'SHA-256 anchored into blockchain ledger',
          hashSnapshot: '91bc83e201a44f9988112233445566778899aabbccddeeff0011223344556677',
        },
      ],
    },
  },
  {
    id: 'INC-2026-8790',
    reporterPseudonym: 'Anon_Citizen_559',
    timestamp: '2026-08-29 08:15:40 UTC',
    channel: 'SMS',
    rawInput:
      'Dear consumer your electricity power will be disconnected tonight at 9.30 pm from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer +919412077123 or pay at https://bijli-bill-payment.live',
    extractedEntities: {
      urls: ['https://bijli-bill-payment.live'],
      domains: ['bijli-bill-payment.live'],
      ips: ['103.251.167.22'],
      phoneNumbers: ['+91 94120 77123'],
      emails: [],
      brands: ['State Electricity Distribution Board (DISCOM)'],
      qrDestinations: [],
      urgencyKeywords: ['disconnected tonight at 9.30 pm', 'immediately contact', 'bill not updated'],
    },
    threatScore: 89,
    riskLevel: 'CRITICAL',
    signalScores: {
      language: 91,
      cyberUrl: 87,
      behaviour: 90,
      collective: 88,
    },
    explainableReasons: [
      'Known psychological extortion script ("Tonight 9:30 PM power cutoff")',
      'Unverified generic TLD domain (bijli-bill-payment.live) imitating state power utility',
      'Attacker phone number +91 94120 77123 identified in Campaign #1042',
    ],
    campaignId: 'CAMP-1042',
    status: 'ESCALATED',
    evidenceRecord: {
      id: 'EVID-8790',
      incidentId: 'INC-2026-8790',
      sha256Hash: '5566778899aabbccddeeff00112233445566778899aabbccddeeff0011223344',
      originalPayload:
        'Dear consumer your electricity power will be disconnected tonight at 9.30 pm from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer +919412077123 or pay at https://bijli-bill-payment.live',
      currentPayload:
        'Dear consumer your electricity power will be disconnected tonight at 9.30 pm from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer +919412077123 or pay at https://bijli-bill-payment.live',
      timestamp: '2026-08-29 08:15:41 UTC',
      version: '1.0.0',
      modelVersion: 'TRACE-MultiSignal-v3.4',
      blockNumber: 4890812,
      txHash: '0x99aabbccddeeff00112233445566778899aabbccddeeff001122334455667788',
      merkleRoot: '0x4910293847561029384756abcdef1029384756abcdef1029384756abcdef1029',
      isTampered: false,
      chainOfCustody: [
        {
          id: 'AUD-07',
          timestamp: '2026-08-29 08:15:40 UTC',
          stage: 'SUBMITTED',
          actor: 'Citizen Portal',
          details: 'Intake from regional SMS alert',
          hashSnapshot: '5566778899aabbccddeeff00112233445566778899aabbccddeeff0011223344',
        },
      ],
    },
  },
];

export const INITIAL_GRAPH_NODES: GraphNode[] = [
  // Campaign Nodes
  { id: 'CAMP-2841', label: 'Campaign #2841 (Bank KYC Phishing)', type: 'CAMPAIGN', risk: 'CRITICAL', metadata: { incidents: 147, status: 'Active' }, x: 400, y: 300 },
  { id: 'CAMP-1042', label: 'Campaign #1042 (Electricity Extortion)', type: 'CAMPAIGN', risk: 'CRITICAL', metadata: { incidents: 89, status: 'Active' }, x: 800, y: 250 },
  { id: 'CAMP-4419', label: 'Campaign #4419 (Customs Arrest Scam)', type: 'CAMPAIGN', risk: 'HIGH', metadata: { incidents: 63, status: 'Active' }, x: 650, y: 550 },

  // Brand Nodes
  { id: 'BRAND-SBI', label: 'Target: State Bank of India (YONO)', type: 'BRAND', risk: 'CRITICAL', metadata: { sector: 'Banking' }, x: 300, y: 150 },
  { id: 'BRAND-DISCOM', label: 'Target: State Electricity Board', type: 'BRAND', risk: 'HIGH', metadata: { sector: 'Public Utility' }, x: 920, y: 150 },
  { id: 'BRAND-FEDEX', label: 'Target: FedEx Logistics', type: 'BRAND', risk: 'MEDIUM', metadata: { sector: 'Courier' }, x: 820, y: 650 },

  // Incident Nodes
  { id: 'INC-2026-8801', label: 'Incident #8801 (SMS PAN Block)', type: 'INCIDENT', risk: 'CRITICAL', campaignId: 'CAMP-2841', metadata: { channel: 'SMS', score: 96 }, x: 250, y: 400 },
  { id: 'INC-2026-8802', label: 'Incident #8802 (WhatsApp Netbank)', type: 'INCIDENT', risk: 'CRITICAL', campaignId: 'CAMP-2841', metadata: { channel: 'WhatsApp', score: 92 }, x: 420, y: 480 },
  { id: 'INC-2026-8803', label: 'Incident #8803 (QR APK Drop)', type: 'INCIDENT', risk: 'CRITICAL', campaignId: 'CAMP-2841', metadata: { channel: 'QR', score: 95 }, x: 550, y: 420 },
  { id: 'INC-2026-8790', label: 'Incident #8790 (Power Cut SMS)', type: 'INCIDENT', risk: 'CRITICAL', campaignId: 'CAMP-1042', metadata: { channel: 'SMS', score: 89 }, x: 750, y: 380 },
  { id: 'INC-2026-8791', label: 'Incident #8791 (Bijli Portal Call)', type: 'INCIDENT', risk: 'HIGH', campaignId: 'CAMP-1042', metadata: { channel: 'Phone', score: 84 }, x: 920, y: 380 },

  // Domain & IP Nodes
  { id: 'DOM-yono-xyz', label: 'yono-sbi-update.xyz', type: 'DOMAIN', risk: 'CRITICAL', metadata: { registrar: 'NameCheap', tld: '.xyz' }, x: 200, y: 280 },
  { id: 'DOM-sbikyc-online', label: 'sbikyc-pan-verify.online', type: 'DOMAIN', risk: 'CRITICAL', metadata: { registrar: 'Porkbun', tld: '.online' }, x: 380, y: 180 },
  { id: 'DOM-bijli-live', label: 'bijli-bill-payment.live', type: 'DOMAIN', risk: 'HIGH', metadata: { registrar: 'Hostinger', tld: '.live' }, x: 800, y: 120 },
  { id: 'IP-198-51', label: '198.51.100.42 (Phishing Host)', type: 'IP', risk: 'CRITICAL', metadata: { asn: 'AS4134 Bulletproof', country: 'NL' }, x: 220, y: 180 },
  { id: 'IP-103-251', label: '103.251.167.22 (Malware Host)', type: 'IP', risk: 'HIGH', metadata: { asn: 'AS13335 CloudHost', country: 'SG' }, x: 920, y: 270 },

  // Phone Nodes
  { id: 'PH-98234', label: '+91 98234 11029', type: 'PHONE', risk: 'CRITICAL', metadata: { carrier: 'Mule SIM Loop' }, x: 150, y: 460 },
  { id: 'PH-91203', label: '+91 91203 44921', type: 'PHONE', risk: 'HIGH', metadata: { carrier: 'WhatsApp Business' }, x: 380, y: 580 },
  { id: 'PH-94120', label: '+91 94120 77123', type: 'PHONE', risk: 'CRITICAL', metadata: { carrier: 'VoIP Caller ID' }, x: 850, y: 480 },

  // Anonymous Reporter Nodes
  { id: 'REP-941', label: 'Reporter Anon_941', type: 'REPORTER', risk: 'LOW', metadata: { verifiedScore: 100 }, x: 120, y: 350 },
  { id: 'REP-102', label: 'Reporter Anon_102', type: 'REPORTER', risk: 'LOW', metadata: { verifiedScore: 100 }, x: 480, y: 580 },
  { id: 'REP-559', label: 'Reporter Anon_559', type: 'REPORTER', risk: 'LOW', metadata: { verifiedScore: 100 }, x: 680, y: 450 },
];

export const INITIAL_GRAPH_EDGES: GraphEdge[] = [
  // Campaign 2841 Connections
  { id: 'e1', source: 'INC-2026-8801', target: 'CAMP-2841', type: 'BELONGS_TO_CAMPAIGN', label: 'BELONGS_TO' },
  { id: 'e2', source: 'INC-2026-8802', target: 'CAMP-2841', type: 'BELONGS_TO_CAMPAIGN', label: 'BELONGS_TO' },
  { id: 'e3', source: 'INC-2026-8803', target: 'CAMP-2841', type: 'BELONGS_TO_CAMPAIGN', label: 'BELONGS_TO' },
  { id: 'e4', source: 'CAMP-2841', target: 'BRAND-SBI', type: 'IMPERSONATES_BRAND', label: 'TARGETS_BRAND' },
  { id: 'e5', source: 'INC-2026-8801', target: 'DOM-yono-xyz', type: 'CONTAINS_URL', label: 'CONTAINS_URL' },
  { id: 'e6', source: 'DOM-yono-xyz', target: 'IP-198-51', type: 'RESOLVES_TO_DOMAIN', label: 'RESOLVES_TO_IP' },
  { id: 'e7', source: 'DOM-sbikyc-online', target: 'IP-198-51', type: 'RESOLVES_TO_DOMAIN', label: 'RESOLVES_TO_IP' },
  { id: 'e8', source: 'INC-2026-8802', target: 'DOM-sbikyc-online', type: 'CONTAINS_URL', label: 'CONTAINS_URL' },
  { id: 'e9', source: 'INC-2026-8801', target: 'PH-98234', type: 'MENTIONS_PHONE', label: 'MENTIONS_PHONE' },
  { id: 'e10', source: 'INC-2026-8802', target: 'PH-91203', type: 'MENTIONS_PHONE', label: 'MENTIONS_PHONE' },
  { id: 'e11', source: 'INC-2026-8801', target: 'INC-2026-8802', type: 'SIMILAR_TO', label: 'SEMANTIC_SIMILARITY (0.91)' },
  { id: 'e12', source: 'REP-941', target: 'INC-2026-8801', type: 'CONTAINS_URL', label: 'REPORTED_BY' },
  { id: 'e13', source: 'REP-102', target: 'INC-2026-8802', type: 'CONTAINS_URL', label: 'REPORTED_BY' },

  // Campaign 1042 Connections
  { id: 'e14', source: 'INC-2026-8790', target: 'CAMP-1042', type: 'BELONGS_TO_CAMPAIGN', label: 'BELONGS_TO' },
  { id: 'e15', source: 'INC-2026-8791', target: 'CAMP-1042', type: 'BELONGS_TO_CAMPAIGN', label: 'BELONGS_TO' },
  { id: 'e16', source: 'CAMP-1042', target: 'BRAND-DISCOM', type: 'IMPERSONATES_BRAND', label: 'TARGETS_BRAND' },
  { id: 'e17', source: 'INC-2026-8790', target: 'DOM-bijli-live', type: 'CONTAINS_URL', label: 'CONTAINS_URL' },
  { id: 'e18', source: 'DOM-bijli-live', target: 'IP-103-251', type: 'RESOLVES_TO_DOMAIN', label: 'RESOLVES_TO_IP' },
  { id: 'e19', source: 'INC-2026-8790', target: 'PH-94120', type: 'MENTIONS_PHONE', label: 'MENTIONS_PHONE' },
  { id: 'e20', source: 'REP-559', target: 'INC-2026-8790', type: 'CONTAINS_URL', label: 'REPORTED_BY' },
];

export const JURY_DEMO_SCENARIOS: JuryDemoScenario[] = [
  {
    id: 'DEMO-1',
    number: 1,
    pillar: 'DETECT',
    title: 'Demo 1: Threat Detection & Explainable Multi-Signal AI',
    shortDesc: 'Ingest a deceptive Bank KYC smishing message; see instant OCR entity extraction, 0–100 multi-signal scoring, and explainability reasons.',
    detailedSteps: [
      'Ingests a newly reported fake SBI PAN suspension message with malicious link.',
      'Normalizes payload, extracts IOCs (URL, Phone, Brand, Urgency triggers).',
      'Calculates 4 distinct signal dimensions (Language, Cyber, Behaviour, Collective).',
      'Displays explainable justification why it is scored CRITICAL (96/100) instead of a simple black-box label.'
    ],
    actionPrompt: 'Load Demo 1 Scenario into Citizen Ingestion Portal',
  },
  {
    id: 'DEMO-2',
    number: 2,
    pillar: 'CONNECT',
    title: 'Demo 2: Campaign Discovery & Graph Collapse',
    shortDesc: 'Submit 3 differently worded messages (SMS, WhatsApp, QR code) and witness the Graph Engine correlate them into a single coordinated campaign.',
    detailedSteps: [
      'Victim A gets an SMS with a link, Victim B gets a WhatsApp alert, Victim C scans a QR code flyer.',
      'Graph correlates shared resolved IP (198.51.100.42) and semantic intent similarity.',
      'The 3 isolated reports automatically collapse into "Campaign #2841: Apex Bank KYC Syndicate" with 147 linked nodes.'
    ],
    actionPrompt: 'Run Campaign Discovery Simulation in Threat Graph',
  },
  {
    id: 'DEMO-3',
    number: 3,
    pillar: 'PROVE',
    title: 'Demo 3: Cryptographic Integrity & Evidence Tampering',
    shortDesc: 'Anchor evidence with a SHA-256 hash to a simulated blockchain ledger, then tamper with one character and witness instant cryptographic verification failure.',
    detailedSteps: [
      'Evidence record INC-2026-8801 is anchored with SHA-256 hash on block #4,891,024.',
      'Simulate an adversary or insider attempting to tamper with the evidence text (e.g. altering the phone number or URL).',
      'TRACE re-computes the live SHA-256 hash in real-time, detects hash mismatch, and flags an immediate TAMPER ALERT with broken chain-of-custody.'
    ],
    actionPrompt: 'Open Evidence Tamper Simulator in Cryptographic Vault',
  },
];
