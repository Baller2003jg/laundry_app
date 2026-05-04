# Artifact Submission Checklist
## HTU Laundry App — Jadyn Gray

**Repository:** https://github.com/Baller2003jg/laundry_app  
**Date:** May 3, 2026

---

## 1. Repository Structure

| Requirement | Status | Location |
|---|---|---|
| Clear folder naming conventions | ✅ | See structure below |
| Detailed README.md at root level | ✅ | [`README.md`](https://github.com/Baller2003jg/laundry_app/blob/main/README.md) |
| Clean commit history showing progressive development | ✅ | [Commit History](https://github.com/Baller2003jg/laundry_app/commits/main) |

### Folder Structure Overview

```
laundry_app/
├── src/                    # All application source code
│   ├── App.tsx             # Main app logic + Firebase sync
│   ├── Login.tsx           # HTU email/password login
│   ├── firebase.ts         # Firebase configuration
│   └── components/
│       └── MachineSelector.tsx
├── public/                 # Static assets (logos)
├── docs/                   # All user-facing documentation
│   ├── INSTALL.md
│   ├── USER_GUIDE.md
│   └── DEMO.md
├── requirements/           # Project requirements
│   └── SRS.md
├── README.md               # Root-level project overview
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### Selected Commit History (Progressive Development)

| Commit | Description |
|---|---|
| `bcb0277` | Enhance SRS with diagrams and charts |
| `e0fe873` | Fix CVEs, tests, UI and add Firebase integration |
| `4ff3b66` | Add HTU logos, Remote tab, Firebase Auth, and fix timer pause |
| `b411b43` | Add +10 min time extension, reservation test, support number |
| `6387056` | Update README with correct path, machine counts, features |
| `afc1dfc` | Overhaul README, INSTALL, USER_GUIDE for assignment requirements |
| `336c6d4` | Replace login screen image with updated link |
| `e9de92c` | Change demo link to YouTube video |
| `e4ef0ad` | Update USER_GUIDE with QR Code and Machines tab details |
| `7583c39` | Update SRS to v1.4 — reflect Firebase Auth/DB, QR, reservations |

Full history: https://github.com/Baller2003jg/laundry_app/commits/main

---

## 2. Compilation / Installation Instructions

| Requirement | Status | Location |
|---|---|---|
| Dependencies list with specific versions | ✅ | [`docs/INSTALL.md` — Dependencies section](https://github.com/Baller2003jg/laundry_app/blob/main/docs/INSTALL.md#dependencies) |
| Environment setup guide | ✅ | [`docs/INSTALL.md` — Environment Setup](https://github.com/Baller2003jg/laundry_app/blob/main/docs/INSTALL.md#environment-setup) |
| Firebase setup guide | ✅ | [`docs/INSTALL.md` — Firebase Setup](https://github.com/Baller2003jg/laundry_app/blob/main/docs/INSTALL.md#firebase-setup-one-time) |
| Deployment instructions | ✅ | [`docs/INSTALL.md` — Deployment Instructions](https://github.com/Baller2003jg/laundry_app/blob/main/docs/INSTALL.md#deployment-instructions) |
| Live demo URL | ✅ | [`docs/DEMO.md`](https://github.com/Baller2003jg/laundry_app/blob/main/docs/DEMO.md) |

### Where to Find It

**File:** [`docs/INSTALL.md`](https://github.com/Baller2003jg/laundry_app/blob/main/docs/INSTALL.md)

Sections included:
- **Prerequisites** — Node.js, npm, Git version requirements
- **Dependencies** — Full table of all packages with exact versions (including `firebase ^12.12.1`, `react ^18.3.1`, `vite ^8.0.10`, etc.)
- **Installation Steps** — Clone → `npm install` → `npm run dev`
- **Environment Setup** — Dev server, HMR, Firebase configuration
- **Firebase Setup (One-Time)** — Step-by-step guide to create a Firebase project, enable Auth and Realtime Database, and configure `src/firebase.ts`
- **Building for Production** — `npm run build`, preview command, output details
- **Deployment Instructions** — Netlify (drag-and-drop + CLI), Vercel, GitHub Pages with full commands
- **Running Tests** — `npm test` commands including watch mode and coverage
- **Troubleshooting** — Common errors and fixes

### Live Demo

See [`docs/DEMO.md`](https://github.com/Baller2003jg/laundry_app/blob/main/docs/DEMO.md) for the demo video and hosting options.

---

## 3. User Documentation

| Requirement | Status | Location |
|---|---|---|
| User Help File (USER_GUIDE.md) | ✅ | [`docs/USER_GUIDE.md`](https://github.com/Baller2003jg/laundry_app/blob/main/docs/USER_GUIDE.md) |
| Screenshots of key features | ✅ | [`docs/USER_GUIDE.md` — Screenshots section](https://github.com/Baller2003jg/laundry_app/blob/main/docs/USER_GUIDE.md#screenshots) |
| Troubleshooting common issues | ✅ | [`docs/USER_GUIDE.md` — Troubleshooting section](https://github.com/Baller2003jg/laundry_app/blob/main/docs/USER_GUIDE.md#troubleshooting) |
| FAQ section | ✅ | [`docs/USER_GUIDE.md` — FAQ section](https://github.com/Baller2003jg/laundry_app/blob/main/docs/USER_GUIDE.md#faq) |

### Where to Find It

**File:** [`docs/USER_GUIDE.md`](https://github.com/Baller2003jg/laundry_app/blob/main/docs/USER_GUIDE.md)

Sections included:
- **Getting Started** — Login steps (HTU email required), first-time account creation, logout
- **App Overview** — Three-tab layout (Machines, QR Code, Remote Start) explained
- **Machine Selection** — How to select, limits (2 washers / 2 dryers), status labels
- **Cycle Types & Durations** — All washer and dryer cycles with accurate durations
- **Reserving a Machine** — How to reserve a machine for another HTU user
- **Timers & Notifications** — Starting timers, monitoring progress, phone notification setup
- **QR Code & Remote Start Tabs** — How each tab works
- **Screenshots** — Visual descriptions of the login screen, machines tab, and timer summary
- **Troubleshooting** — Covers app not loading, login errors, machines not updating, notification issues, etc.
- **FAQ** — Organized by General, Machine Selection, Timers & Cycles, and Notifications

---

## 4. Software Requirements Specification

| Requirement | Status | Location |
|---|---|---|
| SRS Document | ✅ | [`requirements/SRS.md`](https://github.com/Baller2003jg/laundry_app/blob/main/requirements/SRS.md) |

**Current version:** 1.4 (May 3, 2026)

The SRS follows IEEE 830-1998 guidelines and includes:
- Introduction, scope, and references
- Product perspective, features, user classes, operating environment, constraints
- Full functional requirements (FR-1 through FR-11) for all implemented features
- External interface requirements
- Nonfunctional requirements (performance, safety, security, quality)
- Appendices with Use-Case Diagram, Database Diagram, ER Diagram, and Gantt Chart
- Version 1.3 and 1.4 implementation summaries

---

## Quick Links Summary

| Artifact | Direct Link |
|---|---|
| Repository Root | https://github.com/Baller2003jg/laundry_app |
| README.md | https://github.com/Baller2003jg/laundry_app/blob/main/README.md |
| INSTALL.md | https://github.com/Baller2003jg/laundry_app/blob/main/docs/INSTALL.md |
| USER_GUIDE.md | https://github.com/Baller2003jg/laundry_app/blob/main/docs/USER_GUIDE.md |
| DEMO.md | https://github.com/Baller2003jg/laundry_app/blob/main/docs/DEMO.md |
| SRS.md | https://github.com/Baller2003jg/laundry_app/blob/main/requirements/SRS.md |
| Commit History | https://github.com/Baller2003jg/laundry_app/commits/main |
| Source Code (src/) | https://github.com/Baller2003jg/laundry_app/tree/main/src |
