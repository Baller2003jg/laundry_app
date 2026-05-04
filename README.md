# HTU Laundry App

A real-time laundry machine management web app built for Huston-Tillotson University students. Users can monitor machine availability, start cycles, reserve machines, and receive notifications — all synced live via Firebase.

![React](https://img.shields.io/badge/React-18-blue?logo=react) ![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Firebase](https://img.shields.io/badge/Firebase-Realtime_DB-orange?logo=firebase)

---

## Quick Start

```powershell
git clone https://github.com/Baller2003jg/laundry_app.git
cd laundry_app
npm install
npm run dev
```

Open http://localhost:5173 in your browser. See [docs/INSTALL.md](docs/INSTALL.md) for full setup including Firebase configuration.

---

## Features

- **Firebase Authentication** — HTU email login (`@htu.edu`) with "Keep me signed in" option; auto-creates an account on first login
- **8 washers + 8 dryers** — select and run up to 2 of each simultaneously
- **Machine reservations** — reserve a machine for another user
- **Cycle types** — Quick, Regular, Bedding, Rinse (washers) / Quick, Regular, Wrinkle-Release (dryers) with accurate durations
- **Per-machine countdown timers** with an active-timer summary at the bottom of the screen
- **Text notifications** — enter your phone number to be notified when a cycle finishes
- **Real-time sync** — all machine states are broadcast to every logged-in user via Firebase Realtime Database
- **QR code scanner tab** — scan a machine QR code to identify it quickly
- **Remote start tab** — start a machine remotely
- **Logout** — returns to login screen; machine reservations are preserved

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 + TypeScript |
| Build Tool | Vite 8 |
| Auth & Database | Firebase Authentication + Realtime Database |
| Testing | Vitest + Testing Library |
| Styling | Plain CSS |

---

## Project Structure

```
laundry_app/
├── src/
│   ├── App.tsx               # Main app logic, machine state, Firebase sync
│   ├── Login.tsx             # HTU email/password login with Firebase Auth
│   ├── firebase.ts           # Firebase initialization
│   └── components/
│       └── MachineSelector.tsx  # Reusable machine selection UI
├── public/                   # Static assets (logos)
├── docs/
│   ├── INSTALL.md            # Installation & deployment guide
│   ├── USER_GUIDE.md         # End-user documentation
│   └── DEMO.md               # Live demo info
├── requirements/
│   └── SRS.md                # Software Requirements Specification
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Documentation

- **[Installation Guide](docs/INSTALL.md)** — Setup, dependencies, Firebase config, and deployment
- **[User Guide](docs/USER_GUIDE.md)** — Complete usage instructions, screenshots, FAQ, and troubleshooting
- **[Demo](docs/DEMO.md)** — Live demo link and hosting options
- **[Requirements (SRS)](requirements/SRS.md)** — Software Requirements Specification

---

## Running Tests

```bash
npm test -- --run
```

---

## License

MIT
