# HTU Laundry App — User Guide

Welcome to the HTU Laundry App! This guide covers everything you need to use the app to manage laundry machines on campus.

## Table of Contents
1. [Getting Started](#getting-started)
2. [App Overview](#app-overview)
3. [Machine Selection](#machine-selection)
4. [Cycle Types & Durations](#cycle-types--durations)
5. [Reserving a Machine](#reserving-a-machine)
6. [Timers & Notifications](#timers--notifications)
7. [QR Code & Remote Start Tabs](#qr-code--remote-start-tabs)
8. [Screenshots](#screenshots)
9. [Troubleshooting](#troubleshooting)
10. [FAQ](#faq)

---

## Getting Started

### Logging In

1. Open the app in your browser (or visit the live demo link in [DEMO.md](DEMO.md))
2. Enter your **HTU school email** (must end in `@htu.edu`)
3. Enter a **password** (minimum 6 characters)
4. Optionally check **"Keep me signed in"** to stay logged in between visits
5. Click **Login**

> **First time?** If your email hasn't been used before, an account is automatically created for you with the password you enter. Use the same email and password every time after that.

### Logging Out

Click the **Logout** button at the top right. Your machine reservations are preserved; only your active selections are cleared.

---

## App Overview

After logging in you'll see three tabs:

| Tab | Purpose |
|---|---|
| **Machines** | Select, start, and monitor washers and dryers |
| **QR Code** | Scan a machine QR code to identify it |
| **Remote Start** | Start a machine remotely |

The **Machines tab** is the main view. It has two panels — **Washers** and **Dryers** — each showing 8 machines.

At the top of each panel you'll see:
- **Available** — number of machines ready to use
- **Open reservation spots** — machines reserved and waiting for a user

At the bottom of the screen an **active-timer summary** shows all cycles currently running across all users.

---

## Machine Selection

### How to Select a Machine

1. Click the checkbox next to a machine name
2. Its settings panel expands below the machine row
3. Configure your cycle type, notifications, and phone number
4. Click **Start** to begin the countdown

### Selection Limits

- Up to **2 washers** and **2 dryers** can be selected per user at a time
- Machines in use by other users are shown at reduced opacity and cannot be selected

### Machine Status Labels

| Status | Meaning |
|---|---|
| Available | Ready to use — no one is using it |
| Running | In use with an active countdown timer |
| Reserved | Reserved by another user; waiting for them to start |
| In Use (You) | You currently have this machine selected or running |

### Deselecting a Machine

Click the checkbox again. You **cannot** deselect a machine while its timer is running — you must wait for the cycle to complete or use the global **Reset All** action.

---

## Cycle Types & Durations

### Washer Cycles

| Cycle | Duration | Best For |
|---|---|---|
| Regular Wash | 30 minutes | Everyday laundry |
| Quick Wash | 15 minutes | Lightly soiled items or small loads |
| Bedding | 40 minutes | Sheets, comforters, heavy items |
| Rinse | 10 minutes | Rinse-only, no detergent |

### Dryer Cycles

| Cycle | Duration | Best For |
|---|---|---|
| Regular Dry | 40 minutes | Standard loads |
| Quick Dry | 15 minutes | Small loads or items already partially dry |
| Wrinkle-Release | 20 minutes | Gentle tumbling to remove wrinkles |

---

## Reserving a Machine

If you want to hold a machine for someone else (e.g., a roommate):

1. Select the machine
2. Check the **"Reserve for another user"** checkbox
3. Enter the other user's HTU email
4. Click **Reserve**

The machine will show as **Reserved** to all other users and be held until the reserved user logs in and starts their cycle.

---

## Timers & Notifications

### Starting a Timer

1. Select a machine and choose your cycle type
2. (Optional) Check **"Send text when done"** and enter your 10-digit phone number (digits only, no dashes — e.g., `5551234567`)
3. Click **Start**

### Monitoring Progress

- The timer counts down in **MM:SS** format on the machine row
- The **active-timer summary** at the bottom shows all your running machines at a glance
- All other users see your machine as "Running" in real time

### When a Cycle Finishes

- The timer reaches **00:00** and stops automatically
- If text notifications were enabled, a message is sent to your phone
- The machine becomes **Available** again for the next user

### Extending Time

If your cycle is nearly done and you need more time, an **Extend** option appears near the end of the cycle.

---

## QR Code & Remote Start Tabs

### QR Code Tab

Use your device camera to scan a QR code posted on a machine. This identifies the machine ID and can pre-select it in the Machines tab.
<img width="1295" height="616" alt="qr" src="https://github.com/user-attachments/assets/ce25be1f-3b34-4380-9739-6870e99b3cb0" />

### Remote Start Tab

The Remote Start tab allows starting a machine cycle without being physically next to it. Select the machine ID and your cycle settings, then confirm to start remotely.

---

## Screenshots

> Screenshots below show the key screens of the app.

### Login Screen
<img width="1506" height="842" alt="image" src="https://github.com/user-attachments/assets/36b573e3-4187-4e4c-8c9c-5e9cf0fa4f0d" />


*Users log in with their `@htu.edu` email and a password. An account is auto-created on first login.*

### Machines Tab — Main View

The main machines tab shows two panels (Washers / Dryers) with availability badges and individual machine rows. Each row shows the machine name, status, and — when selected — cycle settings and a Start button.
<img width="1307" height="543" alt="remote" src="https://github.com/user-attachments/assets/495196d5-f6c6-43a4-a3ec-e4640e9ae95a" />
<img width="1307" height="543" alt="remote" src="https://github.com/user-attachments/assets/11edab34-d89b-45f2-a473-d94d9847a03b" />
<img width="1307" height="543" alt="remote" src="https://github.com/user-attachments/assets/e3de8389-7328-40e1-a36c-8b7ecb8377aa" />
<img width="1364" height="827" alt="main" src="https://github.com/user-attachments/assets/60961d8b-f430-45bb-8497-4ac9c79bc79e" />

### Active Timer Summary

A sticky bar at the bottom of the Machines tab shows all currently running timers for the logged-in user, including machine name and remaining time.

---

## Troubleshooting

### The app won't load
- Check your internet connection
- Try refreshing the page (`F5` or `Ctrl+R`)
- Clear your browser cache and try again
- Try a different browser (Chrome, Firefox, Edge, Safari all supported)

### "Please enter a valid HTU school email" error
- Your email must end in `@htu.edu` — personal emails are not accepted

### "Incorrect password" error
- Make sure caps lock is off
- Use the exact password you set the first time you logged in
- Passwords must be at least 6 characters

### I forgot my password
- Currently there is no self-service password reset UI. Contact your facility administrator to have your account reset in the Firebase console.

### Machines aren't updating / timer is frozen
- Check your internet connection — the app requires an active connection for real-time sync
- Refresh the page; your running timers will resume from their last synced state

### I can't select a machine
- You may already have 2 washers or 2 dryers selected
- The machine may be in use by another user
- Deselect one of your current machines first

### My text notification didn't arrive
- Make sure "Send text when done" was checked **before** clicking Start
- Verify the phone number is exactly 10 digits with no spaces or dashes
- U.S. numbers only; standard carrier rates may apply

### The timer finished but the machine still shows "Running"
- Refresh the page to force a state sync with Firebase

---

## FAQ

### General

**Q: Do I need to create an account?**  
A: No sign-up form needed. Enter your `@htu.edu` email and a password — your account is created automatically on first login.

**Q: What if I forget my password?**  
A: There is no self-service password reset at this time. Contact your facility administrator.

**Q: Is my data saved between sessions?**  
A: If you check "Keep me signed in", you'll be automatically logged back in next time. Machine state is always synced live from Firebase, so you'll see the current real-world status on every login.

**Q: Can other users see my selections?**  
A: Yes — machine occupancy is shared in real time. All users see which machines are Available, Running, or Reserved.

**Q: Can I use the app on my phone?**  
A: Yes. The app is responsive and works on phones, tablets, and desktops.

---

### Machine Selection

**Q: Why can't I select more than 2 washers?**  
A: The limit is 2 washers and 2 dryers per user at a time to keep things fair. Deselect a machine to choose a different one.

**Q: Can I deselect a machine that's running?**  
A: No. Running machines are locked until the cycle completes.

**Q: What does "Reserved" mean?**  
A: Another user has held the machine for a specific person. It will become available once that person starts their cycle.

---

### Timers & Cycles

**Q: How long does each cycle take?**  
A: See the [Cycle Types & Durations](#cycle-types--durations) table above. Ranges from 10 minutes (Rinse) to 40 minutes (Bedding / Regular Dry).

**Q: Can I pause a timer?**  
A: Individual timers cannot be paused. Use **Reset All** to stop all your timers if needed.

**Q: What happens when my cycle finishes?**  
A: The machine becomes Available and you receive a text if notifications were set up.

**Q: Can I change settings after starting?**  
A: No — settings are locked once a cycle begins. Stop the cycle with Reset All and start over to change settings.

---

### Notifications

**Q: How do text notifications work?**  
A: Check "Send text when done", enter your 10-digit phone number, then start the cycle. A text is sent automatically when the timer hits 00:00.

**Q: What format should my phone number be in?**  
A: 10 digits, no spaces, no dashes — e.g., `5551234567`. U.S. numbers only.

**Q: Are notifications free?**  
A: Standard carrier text message rates may apply.

---

*Last Updated: May 3, 2026*
