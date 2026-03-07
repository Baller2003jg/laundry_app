# Laundry selector app

This is a small React + Vite app that demonstrates selecting up to 2 washers and up to 2 dryers.

Quick start (Windows PowerShell):

```powershell
cd c:\Users\13182\Desktop\code\laundry_app
npm install
npm run dev
```

Open http://localhost:5173 (or the address shown by Vite). You can select up to 5 washers and 5 dryers concurrently. Click Submit to view the selected machine ids.

## Features

- User login with "Keep me signed in" option
- Select and manage washers and dryers
- Set wash/dry types (e.g., quick wash, bedding)
- Enter phone number for push notification when timer is done
- Timers for each machine, with a summary of active timers at the bottom
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
