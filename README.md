# Laundry selector app

This is a small React + Vite app that demonstrates selecting up to 2 washers and up to 2 dryers.

Quick start (Windows PowerShell):

```powershell
cd c:\Users\13182\Desktop\laundry_app
npm install
npm run dev
```

Open http://localhost:5173 (or the address shown by Vite). You can select and start up to 2 washers and 2 dryers at a time (8 of each available). Machine state is synced in real time via Firebase Realtime Database.

## Features

- User login with "Keep me signed in" option (Firebase Authentication)
- 8 washers and 8 dryers; select and start up to 2 of each at a time
- Reserve machines for another user
- Set wash/dry cycle types (quick, regular, bedding, rinse, wrinkle-release)
- Enter phone number for push notification when cycle finishes
- Per-machine countdown timers with a summary of active timers at the bottom
- Real-time machine state sync across all users via Firebase Realtime Database
- QR code scanner tab for machine lookup
- Remote start tab
- Logout functionality to return to login screen

## Project Structure

- `src/` — Source code
  - `App.tsx` — Main app logic
  - `Login.tsx` — Login page
  - `components/MachineSelector.tsx` — Machine selection UI
- `docs/` — Documentation
  - [User Guide](docs/USER_GUIDE.md) — How to use the app
  - [Installation Guide](docs/INSTALL.md) — Setup and installation
  - [Demo](docs/DEMO.md) — Live demo information
- `requirements/` — Project requirements
  - [SRS.md](requirements/SRS.md) — Software Requirements Specification

## Documentation

For detailed documentation, see the [docs](docs/) folder:
- **[User Guide](docs/USER_GUIDE.md)** - Complete usage instructions and FAQ
- **[Installation Guide](docs/INSTALL.md)** - Setup, dependencies, and deployment
- **[Demo](docs/DEMO.md)** - Live demo link and deployment options
- **[Requirements](requirements/)** - Software Requirements Specification (SRS)

## License

MIT
