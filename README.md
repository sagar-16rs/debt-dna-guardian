# Project DNA DEBT 

# FedEx NEXUS | Intelligent Recovery Operating System
> **Team Smartron** | FedEx Smart Hackathon 2026 Finale

![Project Banner](https://img.shields.io/badge/Status-Prototype_Complete-success) ![Tech Stack](https://img.shields.io/badge/Stack-React_|_Vite_|_Tailwind-blue) ![AI Core](https://img.shields.io/badge/AI-OpenAI_GPT4o_|_LangChain-orange) ![Security](https://img.shields.io/badge/Security-RBAC_|_Enterprise_SSO-red)

## Project info

**URL**: https://lovable.dev/projects/e520da87-f52e-4508-b9ee-b9f63946a4b9?magic_link=mc_80890ceb-5ee6-46e7-af7d-512058862b11

FedEx NEXUS is a next-generation financial command center designed to modernize enterprise debt recovery. Unlike legacy tools that simply list overdue invoices, NEXUS uses an Agentic AI Core ("Cortex") to analyze Debt DNA—predicting payment probability, automating negotiation strategies via chat, and simulating cash flow outcomes. Built with a "Glass Box" architecture, it unifies fragmented ERP data into a single, high-performance interface for faster resolution and reduced customer churn

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e520da87-f52e-4508-b9ee-b9f63946a4b9?magic_link=mc_80890ceb-5ee6-46e7-af7d-512058862b11) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Key Features

### 1. Military-Grade Security & Governance (RBAC)
*Directly addresses the need for "Secure role-based portals".*
- **Granular RBAC:** Distinct workspaces for **Global Managers** (Analytics) and **Agency Agents** (Execution).
- **Data Sovereignty:** Enforced via **Row-Level Security (RLS)** in PostgreSQL—Agency A cannot query Agency B’s data.
- **Immutable Audit Logs:** Every negotiation step, discount offer, and chat interaction is cryptographically logged for dispute resolution.

### 2. Cortex AI Engine ("The Brain")
*Moving beyond simple chatbots to "Agentic" workflows.*
- **Hybrid Risk Scoring:** Combines **XGBoost** (static financial history) and **Transformer Models** (unstructured email sentiment) to predict recovery probability in real-time.
- **Deterministic Compliance Guardrails:** A distinct NLP layer that pre-scans every outgoing message against **FDCPA/GDPR** rules. If a violation (e.g., "harassment") is detected, the message is blocked *before* transmission.
- **Voice AI Mode:** Autonomous Speech-to-Text agent capable of handling high-volume, low-complexity negotiation calls without human intervention.

### 3. "Headless" Legacy Integration
*Solves the "Integration with SAP/Oracle" constraint.*
- **RPA Sync (Bot Layer):** Utilizes Python-based bots (Selenium/UiPath architecture) to read/write to legacy ERP screens, ensuring data flows without expensive API refactoring.
- **Zero-Trust Settlement:** **Smart Settle Vault** generates tokenized payment links. Funds route directly to FedEx Escrow; the collection agency never touches the capital.

### 4. Algorithmic Circuit Breaker
*The ultimate answer to "Weak Governance."*
- **Automated Suspension:** If an agency's Compliance Score drops below **85%**, the system triggers a "Kill Switch," instantly freezing new case allocations.
- **SOP Enforcement:** Workflows are hard-coded into the UI. Agents cannot proceed to "Legal Action" without first completing the "Soft Nudge" phase.

---

## 🏗️ Technical Architecture

NEXUS employs a **Headless Event-Driven Architecture** to ensure scalability and security without disrupting legacy operations.

| Layer | Technology | Function |
| :--- | :--- | :--- |
| **Frontend** | React 18 + Vite | High-performance SPA with "Dark Mode" Enterprise UI. |
| **Styling** | Tailwind CSS + Lucide | Responsive, accessible design system. |
| **State** | TanStack Query | Asynchronous data fetching and caching to minimize API load. |
| **AI Core** | OpenAI GPT-4o | Reasoning engine for "Debt DNA" analysis & Sentiment Logic. |
| **Backend** | Supabase (PostgreSQL) | Relational database with strict RLS policies for agency isolation. |
| **Integration** | Python RPA / Selenium | "Bot" layer for legacy ERP synchronization (Mocked for Prototype). |

---



## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e520da87-f52e-4508-b9ee-b9f63946a4b9?magic_link=mc_80890ceb-5ee6-46e7-af7d-512058862b11) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)




Unlike legacy tools that simply list overdue invoices, NEXUS uses an **Agentic AI Core ("Cortex")** to analyze **Debt DNA**—predicting payment probability, enforcing FDCPA compliance in real-time, and automating negotiation via Chat and Voice.
