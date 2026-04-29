# AuditAI — AI-Powered Smart Contract Security Auditor

AuditAI is a full-stack web application that combines AI-powered static analysis with decentralized storage to deliver professional smart contract security audit reports. Users paste their Solidity code, receive a detailed PDF audit report, and can retrieve it at any time using a unique cryptographic root hash stored on the 0G decentralized storage network.

Built for the ETHGlobal OpenAgents Hackathon.

---

## The Problem

Smart contract security audits are expensive, slow, and inaccessible to independent developers and small teams. A professional audit from a reputable firm can cost tens of thousands of dollars and take weeks to complete. This creates a significant barrier for developers who want to ship secure contracts but lack the resources to do so.

## The Solution

AuditAI provides instant, AI-powered security analysis for Solidity smart contracts. The audit report is generated in seconds, exported as a professional PDF, and stored permanently on the 0G decentralized storage network — giving developers a verifiable, immutable record of their audit that can be retrieved at any time using a root hash.

---

## Tech Stack

### Frontend

- **React** + **TypeScript** — component-based UI with full type safety
- **Vite** — fast development server and build tool
- **Tailwind CSS v4** — utility-first styling
- **shadcn/ui** — accessible, composable UI components
- **Monaco Editor** — VS Code-powered code editor with Solidity syntax highlighting
- **TanStack Query** — server state management and mutation handling
- **Axios** — HTTP client for backend communication
- **date-fns** — date formatting
- **Sonner** — toast notifications
- **React Router** — client-side routing
- **Lucide React** — icon library

### Backend

- **Node.js** + **Express** — REST API server
- **Anthropic Claude API** — AI-powered smart contract analysis with structured JSON output
- **PDFKit** — programmatic PDF generation with dynamic content rendering
- **0G TypeScript SDK** — decentralized storage upload and download
- **Ethers.js v6** — wallet management and blockchain transaction signing
- **CORS** — cross-origin request handling

---

## 0G Decentralized Storage Integration

The 0G network integration is the core web3 differentiator of this project. Rather than storing audit reports in a centralised database, every generated PDF report is uploaded permanently to the 0G decentralized storage network. This provides:

- **Immutability** — once uploaded, the report cannot be altered or deleted
- **Verifiability** — every report is identified by a cryptographic Merkle root hash that can be independently verified on the 0G network
- **Permanence** — reports are retrievable at any point in the future using only the root hash
- **Decentralization** — no single point of failure or centralized storage dependency

### How It Works

```
User submits Solidity code
        ↓
Claude API analyzes the contract and returns structured JSON
        ↓
PDFKit generates a professional audit report PDF
        ↓
PDF is written to a temporary file on the backend
        ↓
0G SDK uploads the PDF to the decentralized storage network
        ↓
0G returns a Merkle root hash (unique identifier for the file)
        ↓
Temp file is deleted — the report now lives exclusively on 0G
        ↓
Root hash is returned to the user as their permanent reference
```

### Retrieval Flow

```
User pastes their root hash
        ↓
Backend calls 0G SDK download with the root hash
        ↓
0G locates the file across its distributed node network
        ↓
File is downloaded to a temporary path on the backend
        ↓
PDF is streamed back to the user as a direct download
        ↓
Temp file is deleted immediately after streaming
```

### 0G SDK Implementation

The 0G integration uses the official `@0glabs/0g-ts-sdk` package with `ethers` v6 for wallet management and transaction signing. A single funded wallet on the 0G testnet absorbs all storage transaction fees, making the experience completely frictionless for end users — no wallet connection or token balance required.

Key SDK components used:

- `ZgFile` — wraps the local PDF file and computes its Merkle tree
- `Indexer` — manages node selection and handles both upload and download operations
- `merkleTree().rootHash()` — generates the unique cryptographic identifier for each report
- `ethers.JsonRpcProvider` + `ethers.Wallet` — handles transaction signing and submission to the 0G EVM chain

---

## AI Integration

### How Claude Powers the Audit

The Anthropic Claude API performs static analysis on submitted Solidity contracts. The model is configured with a detailed system prompt that instructs it to examine the contract across the following security categories:

- Reentrancy vulnerabilities and CEI pattern violations
- Access control issues and unprotected critical functions
- Arithmetic overflow and underflow (especially pre-0.8.x contracts)
- Logic flaws, front-running vectors, and timestamp dependence
- Unsafe external calls and unchecked return values
- Upgradability risks including storage collisions and uninitialized proxies
- Gas optimization opportunities

The model returns a strictly typed JSON object validated against a JSON schema, ensuring consistent structure across every audit. Findings are classified by severity (Critical, High, Medium, Low, Informational) and ordered from most to least severe. Each finding includes a title, description, affected code reference, and a specific remediation recommendation with inline code examples.

### AI During Development

Claude was used during the development of this project for:

- **Initial planning** — mapping out the full architecture, API routes, service structure, and technology choices before writing any code
- **Specific technical questions** — resolving targeted implementation questions around the 0G SDK integration, PDFKit rendering, Tailwind v4 configuration, and TanStack Query patterns
- **README structure and writing** — ideating the structure and drafting the content of this README file

All core implementation, debugging, and architectural decisions were made by the developer.

---

## Audit Report Structure

Every generated PDF report follows the structure used by professional audit firms:

1. **Overview** — contract summary, audit date, and findings breakdown by severity
2. **Security Score** — numerical score (0–100) with a risk rating (Safe / Low Risk / Medium Risk / High Risk / Critical Risk)
3. **Methodology** — analysis approach, techniques applied, and scope limitations
4. **Findings Summary** — severity breakdown table and top risks
5. **Detailed Findings** — per-vulnerability breakdown with severity badge, category, description, affected code, and remediation steps
6. **Disclaimer** — AI-generated analysis caveat and analysis scope

---

## Project Structure

```
ai_auditor/
├── backend/
│   ├── controllers/
│   │   └── audit.js          # Request orchestration
│   ├── helpers/
│   │   └── prompts.js        # AI system and user prompts
│   ├── routes/
│   │   └── audit.js          # API route definitions
│   ├── services/
│   │   ├── ai.js             # Anthropic Claude API integration
│   │   ├── pdf.js            # PDFKit report generation
│   │   └── storage.js        # 0G upload and download logic
│   ├── tmp/                  # Temporary PDF buffer (auto-cleaned)
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── customized/   # Custom shadcn overrides
│   │   │   ├── ui/           # shadcn UI components
│   │   │   ├── Banner.tsx
│   │   │   ├── features.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── logo.tsx
│   │   │   ├── nav-menu.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── navigation-sheet.tsx
│   │   ├── constants/
│   │   │   └── exampleContract.ts
│   │   ├── features/
│   │   │   ├── code/         # Audit submission feature
│   │   │   └── reports/      # Report retrieval feature
│   │   ├── helpers/
│   │   │   └── helpers.ts    # Axios API helpers and utility functions
│   │   ├── layouts/
│   │   │   └── PublicLayout.tsx
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── pages/
│   │   │   └── HomePage.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env.local
│   ├── .env.production
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.js
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vercel.json
│   └── vite.config.ts
└── README.md
```

---

## API Endpoints

| Method | Endpoint               | Description                                                                                              |
| ------ | ---------------------- | -------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/audit`           | Submits Solidity code, runs AI analysis, generates PDF, uploads to 0G, returns report JSON and root hash |
| `GET`  | `/api/audit/:rootHash` | Downloads the audit PDF from 0G by root hash and streams it to the client                                |

---

## Environment Variables

### Backend `.env`

```
PORT=3000
FRONTEND_URL=http://localhost:5173
ANTHROPIC_API_KEY=your_anthropic_api_key
ZG_RPC_URL=https://evmrpc-testnet.0g.ai
ZG_INDEXER_URL=https://indexer-storage-testnet-standard.0g.ai
ZG_PRIVATE_KEY=your_wallet_private_key
```

### Frontend `.env`

```
VITE_BACKEND_URL=http://localhost:3000
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A funded 0G testnet wallet
- An Anthropic API key

### Installation

```bash
# Clone the repository
git clone https://github.com/AlejandroPanos/ai-auditor
cd ai-auditor

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### Running Locally

```bash
# Start the backend
cd backend && npm run dev

# Start the frontend
cd frontend && npm run dev
```

---

## Disclaimer

AuditAI is an AI-powered static analysis tool intended for educational and informational purposes. It does not constitute a professional security audit and should not be relied upon as a guarantee of contract security. Always engage a professional auditing firm before deploying smart contracts to mainnet.

---

## Author

Built by [Alejandro Paños](https://github.com/AlejandroPanos) for the ETHGlobal 2026 OpenAgents Hackathon.
