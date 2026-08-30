

Readme · MD
# TRACE — Threat Relationship Analysis & Cryptographic Evidence
 
**Smart India Hackathon 2026 · Team COGNIX**
 
TRACE does not merely ask *"is this a scam?"* — it asks *"is this connected to a larger attack, how is that attack evolving, and can we prove what happened?"*
 
🔗 **Live demo:** https://trace-one-rosy.vercel.app/
 
---
 
## The Problem
 
Most scam-detection tools examine one message, URL, or QR code at a time. That can flag suspicious content, but it doesn't reveal that dozens of separately-reported incidents belong to the same coordinated campaign. TRACE focuses on the intelligence layer sitting above individual detection: **incident → connected indicators → campaign → campaign evolution → evidence-backed investigation.**
 
## The Four Pillars (Target Architecture)
 
| Pillar | What it does |
|---|---|
| **DETECT** | AI and cybersecurity signals determine whether content is potentially malicious. |
| **CONNECT** | Graph intelligence links incidents via shared URLs, phones, emails, QR destinations, and infrastructure. |
| **PREDICT** | Temporal analysis tracks campaign growth, escalation, and channel shifts. |
| **PROVE** | Cryptographic hashes and blockchain anchoring verify evidence integrity and chain of custody. |
 
---
 
## ⚠️ Current Prototype Status — What Actually Works Today
 
This section is intentionally precise, in the spirit of our own project guide: *"present prototype performance honestly."* Everything below is implemented and demoable right now, entirely client-side (no backend deployed yet).
 
### ✅ Working
 
- **Explainable threat scoring** (`utils/detectionEngine.ts`) — a real, functioning rule-based engine that:
  - Extracts IOCs via regex: URLs/domains, phone numbers (Indian + international formats), IP addresses, emails
  - Matches text against known brand-impersonation keywords (SBI/YONO, HDFC, ICICI, DISCOM, FedEx, income tax, etc.)
  - Detects urgency/intimidation language patterns
  - Flags suspicious TLDs and typosquatted financial-brand domains
  - Combines four signal categories (language, cyber/URL, behaviour, collective) into a weighted 0–100 composite threat score, with human-readable reasons for the score
- **Live evidence hashing & tamper detection** (`utils/crypto.ts`, `components/EvidenceVault.tsx`) — genuinely functional: computes real SHA-256 hashes via the browser's Web Crypto API, lets you edit an evidence payload live, and instantly shows a hash mismatch if the content is tampered. This is the strongest working demo in the prototype today.
- **Campaign Evolution View** — renders a visual multi-stage timeline of how a campaign shifts channels over time (SMS → WhatsApp → QR/APK), pulled from curated demo campaign data.
- **4 detailed synthetic demo campaigns** (`data/mockData.ts`) — hand-authored, realistic Indian scam scenarios (SBI/YONO KYC smishing, DISCOM disconnection extortion, customs/digital-arrest extortion, WFH task-fraud) used to power every demo view.
### 🚧 Not Yet Implemented (Planned per Project Guide)
 
- **Backend / API** — no FastAPI service yet; everything currently runs client-side in the browser
- **Real campaign correlation** — `matchToCampaign()` currently routes input to one of 4 pre-written demo campaigns via keyword matching. This simulates correlation for demo purposes; it is **not** yet the graph-based entity correlation (Neo4j) described in our architecture
- **Blockchain anchoring** — `generateTxHash()` / `generateMerkleRoot()` currently generate simulated hex values for demo visuals; there is no real blockchain or smart contract integration yet
- **OCR / QR decoding** — screenshot and QR image ingestion pipeline not yet built
- **Persistent storage** — no database (PostgreSQL/Neo4j); all data is static and resets on reload
- **ML / semantic similarity** — current scoring is keyword/heuristic-based, not a trained classifier or sentence-transformer model
---
 
## Getting Started
 
```bash
git clone https://github.com/mapaski/trace.git
cd trace
npm install
npm run dev
```
 
App runs at `http://localhost:3000`.
 
### Build for production
 
```bash
npm run build
npm run preview
```
 
## Project Structure
 
```
trace/
├── src/
│   ├── components/
│   │   ├── CampaignEvolutionView.tsx   # Timeline of campaign channel/tactic shifts
│   │   ├── CitizenPortal.tsx           # Public-facing report submission flow
│   │   ├── EvidenceVault.tsx           # Live SHA-256 hashing + tamper simulation (working demo)
│   │   ├── InvestigationConsole.tsx    # Analyst-facing dashboard
│   │   ├── Navbar.tsx
│   │   ├── ReportDossierModal.tsx      # Generated incident/campaign report view
│   │   ├── SingleDemoController.tsx    # Orchestrates the jury demo flow
│   │   └── ThreatGraphCanvas.tsx       # Visual graph of correlated entities
│   ├── data/
│   │   └── mockData.ts                 # 4 curated demo scam campaigns
│   ├── utils/
│   │   ├── crypto.ts                   # Real SHA-256 (Web Crypto API); simulated tx/Merkle hashes
│   │   └── detectionEngine.ts          # Working rule-based IOC extraction + threat scoring
│   ├── types.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── package.json
```
 
## Tech Stack
 
**Currently used:**
- React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, lucide-react
- Web Crypto API (native browser SHA-256)
- Deployed on Vercel
**Planned (per architecture):**
- Backend: Python + FastAPI
- Graph correlation: Neo4j
- ML: scikit-learn/XGBoost baseline classifier + sentence-transformers for semantic similarity
- OCR/QR: Tesseract/EasyOCR + QR decoder
- Database: PostgreSQL
- Evidence storage: S3-compatible/MinIO, encrypted off-chain
- Blockchain: Solidity + EVM-compatible test network
## Jury Demo Script
 
Three focused demos that show Detect → Connect → Prove:
 
1. **Detection** — Submit a fake bank/KYC message; show IOC extraction, risk score, and explanation.
2. **Campaign Discovery** — Submit a few deliberately varied but related incidents; show them mapping to a single campaign.
3. **Evidence Tampering** — Take an anchored evidence hash, modify the payload live in the Evidence Vault, and show verification failing in real time.
## Roadmap
 
- [ ] FastAPI backend + PostgreSQL persistence
- [ ] Neo4j-based real entity/campaign correlation
- [ ] OCR + QR decoding pipeline for screenshot ingestion
- [ ] Real blockchain evidence anchoring
- [ ] Trained ML classifier + semantic similarity model
- [ ] Multi-language scam detection
- [ ] Browser extension and mobile app
- [ ] Integration with NCRP and CERT-In reporting portals
## Team
 
**COGNIX** — Smart India Hackathon 2026
 
## License
 
[Add a license, e.g. MIT, if you plan to open-source this]
 
