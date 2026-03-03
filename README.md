# Laundry selector app

This is a small React + Vite app that demonstrates selecting up to 5 washers and up to 5 dryers.

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

## Project Structure

- `src/`
  - `App.tsx` — Main app logic
  - `Login.tsx` — Login page
  - `components/MachineSelector.tsx` — Machine selection UI

## License

MIT
