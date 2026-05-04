# Software Requirements Specification (SRS)

## Huston-Tillotson University Laundry App

**PROJECT TITLE:** Huston-Tillotson University Laundry App  
**PROJECT DEVELOPER:** Jadyn Gray  
**PROJECT REPOSITORY:** https://github.com/Baller2003jg/laundry_app  
**CURRENT VERSION:** 1.4 (May 3, 2026)

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 Purpose
   - 1.2 Document Conventions
   - 1.3 Intended Audience and Reading Suggestions
   - 1.4 Project Scope
   - 1.5 References
2. [Overall Description](#2-overall-description)
   - 2.1 Product Perspective
   - 2.2 Product Features
   - 2.3 User Classes and Characteristics
   - 2.4 Operating Environment
   - 2.5 Design and Implementation Constraints
   - 2.6 User Documentation
   - 2.7 Assumptions and Dependencies
3. [System Features](#3-system-features)
4. [External Interface Requirements](#4-external-interface-requirements)
5. [Other Nonfunctional Requirements](#5-other-nonfunctional-requirements)
6. [Other Requirements](#6-other-requirements)
7. [Appendices](#appendices)

---

## Revision History

| Name | Date | Reason for Changes | Version |
|------|------|-------------------|---------|
| Jadyn Gray | 11/14/25 | Initial draft | 1.0 |
| Jadyn Gray | 11/20/25 | Bullet point changes | 1.1 |
| Jadyn Gray | 11/30/25 | Update diagrams | 1.2 |
| System Update | 03/06/26 | Reflect implemented features | 1.3 || System Update | 05/03/26 | Reflect Firebase Auth/DB, QR tab, reservations, remote start; fix cycle durations | 1.4 |
---
1. Introduction
1.1 Purpose
The Huston-Tillotson Laundry App is a mobile application designed to automate and control the dorm laundry units for the students at HT. This app enables students to remotely watch the washer and dryer availability, track the cycle times, and receive notifications when the laundry is done. The purpose of this system is to reduce wasted time checking for available machine and to provide an efficient laundry experience for the students, as well as keeping the laundry room as clean as possible.
1.2 Document Conventions
This SRS follows IEEE 830-1998 guidelines.
•	Bold = Section headers
•	Italics = Optional features
•	Functional requirements are numbered (e.g., FR-1).
•	Priority conventions:
o	High – Required for MVP
o	Medium – For next version
o	Low – Optional / future feature

1.3 Intended Audience and Reading Suggestions
This document will be attended for developers, testers, reviewers, and students involved with or interested in the Huston-Tillotson Laundry App. Developers will use this document to understand the system’s functions and architecture. Testers will rely on the information in this document to design verification and validation test cases. Reviews will evalue the completeness of the project and ensure it aligns with software engineering standards. Students may use this document to learn about the systems capabilities and understand how the application operates.
1.4	Project Scope
The HT Laundry App aims to simplify the dorm laundry through real-time machine monitoring, remote control access (if smart washers available), and automated notifications. Some things contribute to the goals and benefits are eliminating the need to physical check for availability, provide accurate timing updates and alerts when laundry is ready, improve student satisfaction, demonstrates modern Iot integration on campus, saves students time, and Promotes cleanliness

1.5 References
•	Project Charter (September 2025)
•	Huston-Tillotson Laundry App Presentation (Jadyn Gray, 2025)
•	IEEE Std 830-1998: Software Requirements Specification
•	React Documentation (https://react.dev)
•	TypeScript Documentation (https://www.typescriptlang.org)
•	Vite Documentation (https://vitejs.dev)
•	Project Repository: https://github.com/Baller2003jg/laundry_app
•	User Guide: docs/USER_GUIDE.md
•	Installation Guide: docs/INSTALL.md

2. Overall Description
2.1 Product Perspective
**Current Implementation (v1.4):**
This product is a web-based laundry management system built with React 18.3.1, TypeScript 5.9.3, and Vite 8.0.10. The system provides a digital interface for students to select and manage washers and dryers, track machine cycle times, and receive text notifications. Authentication and session management are handled by Firebase Authentication (email/password, restricted to @htu.edu addresses). Machine state is persisted and broadcast in real time to all logged-in users via Firebase Realtime Database.

**Future Vision:**
Future versions will integrate with IoT-enabled smart washers and dryers and add an admin dashboard, usage history, and actual SMS delivery via a third-party API (e.g., Twilio).
2.2 Product Features
**Currently Implemented (v1.4):**
•	Firebase Authentication — login with @htu.edu email and password; account auto-created on first use
•	"Keep me signed in" option using Firebase local/session persistence
•	Selection of up to 2 washers and 2 dryers from 8 available machines each
•	Multiple wash cycle types: Quick (15min), Regular (30min), Bedding (40min), Rinse (10min)
•	Multiple dry cycle types: Quick (15min), Wrinkle-Release (20min), Regular (40min)
•	Real-time countdown timers (MM:SS format) updating every second
•	SMS notification setup with 10-digit phone number validation
•	Machine status displays: Available, Running, Reserved
•	Machine reservation — reserve a machine for another HTU user by email
•	Real-time cross-user sync — all machine states broadcast via Firebase Realtime Database
•	QR Code tab — scan a machine QR code to identify it
•	Remote Start tab — start a machine cycle without being physically present
•	Logout functionality — signs out via Firebase Auth; machine occupancy is preserved
•	Reset All function to stop all timers and clear personal selections
•	Responsive UI with navigation bar and machine dashboards

**Planned for Future Versions:**
•	Full IoT integration with physical washers/dryers
•	Actual SMS delivery via Twilio or similar API
•	Admin dashboard
•	Usage history and analytics
•	Feedback and issue reporting
2.3 User Classes and Characteristics
Students serve as the primary users, interacting with the app to check machine availability, start laundry cycles, and track cycle progress. These users require only basic technical skills. Administrators manage machine information, system data, and maintenance statuses, requiring a moderate level of technical ability. Developers maintain and enhance the backend systems and therefore must have advanced technical knowledge.
2.4 Operating Environment
**Current (v1.4):**
•	Web browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
•	Devices: Desktop, laptop, tablet, smartphone with internet access
•	Requirements: JavaScript enabled, active internet connection, access to Firebase services
•	Recommended: 2GB RAM, stable internet connection
•	Hosting: Static hosting services (Netlify, Vercel, GitHub Pages)
•	Backend: Firebase Authentication + Firebase Realtime Database (Google Cloud)

**Future:**
•	Mobile apps for Android 10+ and iOS 14+
•	Backend hosting on Firebase or AWS
•	IoT device integration via Wi-Fi

2.5 Design and Implementation Constraints
**Current (v1.4):**
•	Authentication is handled by Firebase Authentication; users must have an @htu.edu email address
•	Machine state is stored in and read from Firebase Realtime Database; internet access is required
•	Timer accuracy depends on JavaScript setInterval precision; timers run client-side and re-sync from Firebase on reconnect
•	Text notifications require phone number input but SMS delivery is not yet connected to a third-party API
•	Machine selection limited to 2 per category per user to prevent resource conflicts

**Future:**
•	Each washer and dryer must display a unique QR code
•	Camera permissions required for QR scanning
•	Dependency on Firebase/AWS uptime for real-time sync
•	IoT API compatibility required for machine control
2.6 User Documentation
**Current (v1.3):**
Comprehensive documentation is available in the GitHub repository:
•	User Guide (docs/USER_GUIDE.md) - Complete usage instructions with FAQ section
•	Installation Guide (docs/INSTALL.md) - Setup, dependencies, and deployment instructions
•	Demo Guide (docs/DEMO.md) - Deployment options and live demo information
•	Project README - Quick start and project overview

**Future:**
•	In-app user manual
•	Video demonstrations for QR scanning
•	Interactive tutorials
2.7 Assumptions and Dependencies
**Current (v1.3):**
•	Users have access to a modern web browser with JavaScript enabled
•	Users can provide valid email addresses for login
•	Users have valid 10-digit phone numbers for SMS notifications (U.S. format)
•	Internet connectivity is available during app usage
•	LocalStorage is enabled in the browser

**Dependencies:**
•	React 18.3.1 - UI framework
•	TypeScript 5.9.3 - Type safety
•	Vite 8.0.10 - Build tool and dev server
•	Vitest 4.1.5 - Testing framework
•	Firebase 12.12.1 - Authentication + Realtime Database

**Future:**
•	Washers/dryers will support API for remote status updates and control
•	QR codes will be securely generated and tamper-resistant
•	SMS delivery will be integrated via Twilio or a similar service
3. System Features

**IMPLEMENTED FEATURES (v1.3)**

3.1 User Authentication
3.1.1 Description and Priority
Allows students to log in using their HTU school email and password via Firebase Authentication. An account is automatically created on first login.
Priority: High - IMPLEMENTED
3.1.2 Stimulus/Response Sequences
Stimulus: User enters @htu.edu email and password and clicks "Login". Optionally checks "Keep me signed in."
Response: Firebase Authentication verifies or creates the account. The system grants access to the main dashboard and begins real-time sync with Firebase Realtime Database.
3.1.3 Functional Requirements
FR-1.1: The system shall only accept email addresses ending in @htu.edu
FR-1.2: The system shall require a password of at least 6 characters
FR-1.3: The system shall automatically create a new account on first login if the email is not yet registered
FR-1.4: The system shall provide a "Keep me signed in" checkbox that sets Firebase local persistence
FR-1.5: The system shall auto-login users on subsequent visits if local persistence is enabled
FR-1.6: The system shall display the user's email in the application header
FR-1.7: The system shall use Firebase Authentication for all session management
3.2 Machine Selection
3.2.1 Description and Priority
Allows users to select up to 2 washers and 2 dryers from available machines.
Priority: High - IMPLEMENTED
3.2.2 Stimulus/Response Sequences
Stimulus: User clicks on an available washer or dryer.
Response: The system selects the machine and displays configuration options.
3.2.3 Functional Requirements
FR-2.1: The system shall display 8 washers labeled WASHER 1 through WASHER 8
FR-2.2: The system shall display 8 dryers labeled DRYER 1 through DRYER 8
FR-2.3: The system shall allow selection of up to 2 washers simultaneously
FR-2.4: The system shall allow selection of up to 2 dryers simultaneously
FR-2.5: The system shall disable unselected machines once the limit is reached
FR-2.6: The system shall prevent deselection of running machines
FR-2.7: The system shall display machine status: Available, In Use, or completion time

3.3 Cycle Type Configuration
3.3.1 Description and Priority
Provides different wash and dry cycle options with varying durations.
Priority: High - IMPLEMENTED
3.3.2 Stimulus/Response Sequences
Stimulus: User selects a cycle type from the dropdown menu for a selected machine.
Response: The system updates the timer duration for that machine.
3.3.3 Functional Requirements
FR-3.1: The system shall provide washer cycle options: Rinse only (10 min), Quick wash (15 min), Bedding (40 min), Regular wash (30 min)
FR-3.2: The system shall provide dryer cycle options: Quick dry (15 min), Wrinkle release (20 min), Regular dry (40 min)
FR-3.3: The system shall update timer duration when cycle type is changed
FR-3.4: The system shall disable cycle selection once machine is running
FR-3.5: The system shall preserve cycle selection for each machine

3.4 Real-Time Timer Management
3.4.1 Description and Priority
Displays countdown timers for running machines with real-time updates.
Priority: High - IMPLEMENTED
3.4.2 Stimulus/Response Sequences
Stimulus: User clicks "Start" on a selected machine.
Response: The system starts a countdown timer for that machine, updating every second, and writes the running state to Firebase Realtime Database so all users see it immediately.
3.4.3 Functional Requirements
FR-4.1: The system shall display timers in MM:SS format
FR-4.2: The system shall update timers every 1 second
FR-4.3: The system shall countdown from the selected cycle duration to 00:00
FR-4.4: The system shall display "In use — [time remaining]" on running machines
FR-4.5: The system shall automatically stop timers when they reach 00:00
FR-4.6: The system shall write machine state to Firebase Realtime Database when a cycle starts or stops
FR-4.7: The system shall read machine state from Firebase Realtime Database on login and on real-time updates
FR-4.8: The system shall prevent other users from selecting a machine that is currently running or reserved

3.5 SMS Notification Setup
3.5.1 Description and Priority
Allows users to enable text notifications by providing their phone number.
Priority: Medium - PARTIALLY IMPLEMENTED
3.5.2 Stimulus/Response Sequences
Stimulus: User checks "Send text when done" and enters 10-digit phone number.
Response: The system validates phone number and plans to send notification when cycle completes.
3.5.3 Functional Requirements
FR-5.1: The system shall provide a "Send text when done" checkbox for each machine
FR-5.2: The system shall display phone number input field when checkbox is enabled
FR-5.3: The system shall validate phone numbers as exactly 10 digits
FR-5.4: The system shall show red border for invalid phone numbers
FR-5.5: The system shall accept only numeric input
FR-5.6: The system shall record the phone number with the machine state so it is available when SMS integration is added
Note: Actual SMS delivery via a third-party API (e.g., Twilio) is planned for a future version

3.6 User Logout
3.6.1 Description and Priority
Allows users to logout, clearing session and returning to login screen.
Priority: Medium - IMPLEMENTED
3.6.2 Stimulus/Response Sequences
Stimulus: User clicks "Logout" button in navigation bar.
Response: The system stops all timers, clears localStorage, and returns to login screen.
3.6.3 Functional Requirements
FR-6.1: The system shall provide a "Logout" button in the navigation bar
FR-6.2: The system shall call Firebase Auth signOut on logout
FR-6.3: The system shall clear the current user's local selections on logout
FR-6.4: The system shall preserve machine occupancy and reservations in Firebase Realtime Database on logout (other users' data is unaffected)
FR-6.5: The system shall return the user to the login screen
FR-6.6: The system shall prevent auto-login after explicit logout

3.7 Reset All Functionality
3.7.1 Description and Priority
Provides ability to reset all selections and stop all running machines.
Priority: Medium - IMPLEMENTED
3.7.2 Stimulus/Response Sequences
Stimulus: User clicks "Reset all" button.
Response: The system stops all timers, clears selections, and returns to initial state.
3.7.3 Functional Requirements
FR-7.1: The system shall provide a "Reset all" button in the footer
FR-7.2: The system shall stop all running washer timers
FR-7.3: The system shall stop all running dryer timers
FR-7.4: The system shall clear all machine selections
FR-7.5: The system shall clear all machine settings
FR-7.6: The system shall make all machines available again
FR-7.7: The system shall maintain user login session after reset

**IMPLEMENTED IN v1.4**

3.8 Real-Time Cross-User Machine Sync
3.8.1 Description and Priority
All machine state (running, reserved, remaining time, current user) is stored in Firebase Realtime Database and broadcast live to every logged-in user.
Priority: High - IMPLEMENTED
3.8.2 Stimulus/Response Sequences
Stimulus: Any user starts, stops, or reserves a machine.
Response: Firebase broadcasts the change; all other users see updated machine status within ~1 second.
3.8.3 Functional Requirements
FR-8.1: The system shall write machine state to Firebase Realtime Database on any state change
FR-8.2: The system shall subscribe to Firebase Realtime Database updates on login
FR-8.3: The system shall merge remote state with local state, preserving the current user's own running machines
FR-8.4: The system shall remove a machine's Firebase entry when a cycle completes or is reset

3.9 Machine Reservation
3.9.1 Description and Priority
Allows a user to reserve a machine for another HTU user by entering that user's email.
Priority: Medium - IMPLEMENTED
3.9.2 Stimulus/Response Sequences
Stimulus: User selects a machine and enters another user's @htu.edu email in the reservation field.
Response: The system marks the machine as Reserved in Firebase Realtime Database; the machine appears reserved to all other users.
3.9.3 Functional Requirements
FR-9.1: The system shall allow a user to reserve a machine for another user by entering their HTU email
FR-9.2: The system shall store the reservedBy field in Firebase Realtime Database
FR-9.3: The system shall display reserved machines as unavailable to all other users
FR-9.4: The system shall release a reservation when the reserved user starts their cycle

3.10 QR Code Tab
3.10.1 Description and Priority
Provides a QR code scanning tab to identify a machine quickly.
Priority: Medium - IMPLEMENTED (UI tab)
3.10.2 Stimulus/Response Sequences
Stimulus: User navigates to the QR Code tab.
Response: The system activates the device camera for QR scanning.
3.10.3 Functional Requirements
FR-10.1: The system shall provide a QR Code tab in the navigation bar
FR-10.2: The system shall activate the device camera when the QR tab is selected
FR-10.3: The system shall identify the machine from the scanned QR code and display its current status

3.11 Remote Start Tab
3.11.1 Description and Priority
Allows users to start a machine cycle without being physically present at the machine.
Priority: Medium - IMPLEMENTED (UI tab)
3.11.2 Stimulus/Response Sequences
Stimulus: User navigates to the Remote Start tab, selects a machine, and confirms.
Response: The system starts the machine cycle and updates Firebase Realtime Database.
3.11.3 Functional Requirements
FR-11.1: The system shall provide a Remote Start tab in the navigation bar
FR-11.2: The system shall allow selection of machine ID and cycle type from the Remote Start tab
FR-11.3: The system shall start the cycle and write state to Firebase when the user confirms

**PLANNED FUTURE FEATURES**
3.12 QR Code Machine Control (Full IoT)
3.12.1 Description and Priority
Full integration: scan QR code → send command directly to physical IoT-enabled washer/dryer.
Priority: High - PLANNED FOR FUTURE
3.3.2 Stimulus/Response Sequences
Stimulus: User taps “Scan QR” and scans a machine’s QR code.
Response: The system identifies the machine, verifies permissions, and displays available actions (reserve, start, stop).
3.3.3 Functional Requirements
The system shall calculate and display the remaining time for any machine that is currently running. It shall update the timer every second to ensure accuracy, and it shall notify the user as soon as the timer reaches zero.
3.4 User Authentication
3.4.1 Description and Priority
Allows users to log in with verified Huston-Tillotson credentials.
Priority: High
3.4.2 Stimulus/Response Sequences
Stimulus: User enters login credentials and taps “Sign In.”
Response: The system verifies credentials and grants access.
3.4.3 Functional Requirements
The system shall send a notification when the laundry cycle is complete. It shall include the machine number in the notification message to ensure clarity for the user. The system shall also deliver all notifications through Firebase Cloud Messaging..
3.5 Usage History
3.5.1 Description and Priority
Provides users a history of their recent laundry sessions.
Priority: Medium
3.5.2 Stimulus/Response Sequences
Stimulus: User navigates to the “History” tab.
Response: The system retrieves and displays recent machine usage.
3.5.3 Functional Requirements
The system shall authenticate users by verifying their university-issued email addresses and shall deny access to any account that is invalid or not registered. Additionally, the system shall automatically log users out after a period of extended inactivity.
3.6 Machine Reservation
3.6.1 Description and Priority
Allows users to reserve a washer or dryer before physically going to the laundry room.
Priority: Medium
3.6.2 Stimulus/Response Sequences
Stimulus: User selects a machine and taps “Reserve.”
Response: The system marks the machine as reserved for a limited time.
3.6.3 Functional Requirements
The system shall store each reservation in the database and shall prevent other users from reserving the same machine. Additionally, the system shall automatically cancel reservations 
once they have expired.3.7 Remote Start/Stop (If supported)
3.7.1 Description and Priority
Allows users to remotely start or stop a machine through IoT hardware after QR code verification.
Priority: Medium
3.7.2 Stimulus/Response Sequences
Stimulus: User scans machine QR code and chooses “Start” or “Stop.”
Response: The system sends a command to the machine via IoT API.
3.7.3 Functional Requirements
The system shall retrieve machine details from Firebase and shall display the status information clearly and accurately. Additionally, the system shall refresh the machine data automatically.
3.8 Admin Dashboard
3.8.1 Description and Priority
Provides administrators with tools to monitor machines, manage issues, and review usage data.
Priority: Medium
3.8.2 Stimulus/Response Sequences
Stimulus: Admin logs in and selects “Dashboard.”
Response: The system displays machine data, statistics, and notifications.
3.8.3 Functional Requirements
The system shall notify users when their scanned machine is out of service and shall display a message if internet connectivity is lost. Additionally, the system shall alert users when a reservation conflict occurs.
3.9 Feedback Submission
3.9.1 Description and Priority
Allows users to report broken machines or give feedback directly from the app.
Priority: Low
3.9.2 Stimulus/Response Sequences
Stimulus: User opens “Feedback” and submits a message.
Response: The system stores or emails the feedback to administrators.
3.9.3 Functional Requirements
The system shall allow admins to update machine availability and to upload or regenerate QR codes. Additionally, the system shall restrict access to admin features to authorized users only.
3.10 Notification Settings
3.10.1 Description and Priority
Allows users to customize which alerts they receive.
Priority: Low
3.10.2 Stimulus/Response Sequences
Stimulus: User toggles notification options in settings.
Response: The system saves the user’s preferences.
3.10.3 Functional Requirements
The system shall maintain a timestamped log of machine scans and shall store the history of all reservations. Additionally, the system shall allow admins to access usage records.
4. External Interface Requirements
4.1 User Interfaces
The home screen displays all available washers and dryers along with their timer information. A prominently placed “Scan QR” button allows users to activate the device’s camera for QR scanning. After scanning a machine, the app presents a machine information screen containing status details and appropriate control options. The interface is designed to be simple and user-friendly, using icons and clear labels to enhance navigation.
4.2 Hardware Interfaces
The system interacts with IoT-enabled washers and dryers that provide status information to the backend. It also requires access to the smartphone’s built-in camera to scan QR codes attached to each machine.
4.3 Software Interfaces
The app may integrate with AWS IoT Core for enhanced machine communication capabilities. It uses Firebase Authentication as its primary method of verifying user credentials. Additionally, the system incorporates QR scanning functionality through appropriate software libraries that interpret the QR codes associated with each machine
4.4 Communications Interfaces
The application uses HTTPS protocols to protect data transmissions between the app and backend services. Real-time updates are supported through WebSocket connections. The system also uses Firebase Cloud Messaging to deliver push notifications to users.
5. Other Nonfunctional Requirements
5.1 Performance Requirements
The system must return QR scan results within two seconds. Machine status updates must refresh in less than three seconds to ensure users receive accurate information. The app is designed to handle up to 500 concurrent users without performance degradation.
5.2 Safety Requirements
The system must prevent duplicate QR scans that could result in incorrect or overlapping machine commands. It must also ensure that only authenticated users with valid credentials and valid QR codes can issue machine control requests, protecting both the user and the equipment.
5.3 Security Requirements
All QR code data must be encrypted to ensure secure identification of machines. Communication between the app and the backend must always use HTTPS and must be authenticated through Firebase. The system must enforce proper role-based permissions so that administrators and regular users have access only to features appropriate for their roles.
5.4 Software Quality Attributes
The system supports reliability by using Firebase’s real-time synchronization to maintain consistent data updates. It emphasizes usability through its QR-based workflow, making machine interactions fast and intuitive. Its modular design enhances maintainability, particularly in the QR scanning and IoT communication components. Finally, the app supports portability and compatibility across both iOS and Android platforms.
6. Other Requirements
All QR codes placed on washers and dryers must be waterproof, fade-resistant, and durable to withstand cleaning products and repeated handling.
Appendix A: Glossary
A QR Code is a two-dimensional barcode used by the application to uniquely identify each washer and dryer. When scanned, the QR code provides encoded information that allows the app to retrieve the machine’s status and enable appropriate control actions. The Internet of Things refers to a network of physical devices—such as washers and dryers—that are equipped with sensors, software, and network connectivity, enabling them to send and receive data through the app. Firebase is Google’s real-time cloud database and authentication service used by the application to manage user login credentials, machine data, and communication between the app and connected laundry machines. ZXing is an open-source QR code scanning library used by the application to interpret QR codes on washers and dryers and translate them into machine identifiers recognized by the backend.
Appendix B: Analysis Models
Use-Case Diagram
 <img width="616" height="521" alt="use" src="https://github.com/user-attachments/assets/6f678668-b387-4278-ad92-79e2513b02ef" />

Database Diagram
 <img width="876" height="441" alt="data" src="https://github.com/user-attachments/assets/d1115085-f838-44df-8e93-f07f206958ea" />

Entity Relationship Diagram
<img width="393" height="589" alt="er" src="https://github.com/user-attachments/assets/82f48e5e-7fc9-4a01-8f4f-bbde4895990c" />

Gantt Chart
 <img width="1920" height="1440" alt="HTU_Laundry_App_Gantt_Visual" src="https://github.com/user-attachments/assets/6387c990-d91e-4129-9c97-655d2f4a9f68" />

Appendix C: Issues List
The system is currently integrating the QR scanning library ZXing. Testing of machine API control via QR ID is to be determined, and confirmation of the Firebase connection with the IoT devices is also to be determined.

---

## Version 1.3 Implementation Summary (March 6, 2026)

### Implemented Features
✅ **User Authentication** - Email-based login with "Keep me signed in" functionality
✅ **Machine Selection** - Select up to 2 washers and 2 dryers from 8 machines each
✅ **Cycle Configuration** - Multiple wash/dry cycle options with varying durations
✅ **Real-Time Timers** - Countdown timers updating every second (MM:SS format)
✅ **SMS Notification Setup** - Phone number input with validation (10 digits)
✅ **Logout Functionality** - Clears session and returns to login screen
✅ **Reset All** - Stops all timers and clears all selections
✅ **Responsive UI** - Clean navigation and machine status displays

### Technology Stack
- Frontend: React 18.3.1 with TypeScript 5.9.3
- Build Tool: Vite 5.1.0
- Testing: Vitest 1.0.0 + React Testing Library
- Storage: Browser localStorage
- Deployment: Static hosting (Netlify/Vercel/GitHub Pages)

---

## Version 1.4 Implementation Summary (May 3, 2026)

### New / Updated Features in v1.4
✅ **Firebase Authentication** - Login restricted to @htu.edu emails; password required (min 6 chars); account auto-created on first use; Firebase local/session persistence replaces localStorage
✅ **Firebase Realtime Database** - All machine state (running, reserved, remaining time, currentUser, reservedBy) stored and broadcast live; all logged-in users see real-time updates
✅ **Machine Reservations** - Users can reserve a machine for another HTU user by entering their email
✅ **QR Code Tab** - Camera-based QR scanning tab added to the navigation bar
✅ **Remote Start Tab** - Start a machine cycle remotely from the app
✅ **Corrected cycle durations** - Rinse updated to 10 min (was 30 min); Bedding updated to 40 min (was 30 min)
✅ **Improved logout** - Firebase signOut used; machine occupancy preserved in database on logout

### Technology Stack (v1.4)
- Frontend: React 18.3.1 with TypeScript 5.9.3
- Build Tool: Vite 8.0.10
- Testing: Vitest 4.1.5 + React Testing Library
- Auth & Database: Firebase 12.12.1 (Authentication + Realtime Database)
- Deployment: Static hosting (Netlify/Vercel/GitHub Pages)

### Features Pending Future Implementation
🔲 Full IoT integration with physical washers/dryers
🔲 Actual SMS delivery via Twilio or similar API
🔲 Admin dashboard
🔲 Usage history and analytics
🔲 Feedback and issue reporting

### Documentation
Complete project documentation available in GitHub repository:
- docs/USER_GUIDE.md - Usage instructions and FAQ
- docs/INSTALL.md - Installation and deployment guide
- docs/DEMO.md - Live demo information
- requirements/SRS.md - This document

### Repository
https://github.com/Baller2003jg/laundry_app
