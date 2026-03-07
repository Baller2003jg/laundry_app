# Software Requirements Specification (SRS)

## Laundry App
[jadyngray_SRS_.docx](https://github.com/user-attachments/files/25806870/jadyngray_SRS_.docx)

Software Requirements Specification (SRS) 
PROJECT TITLE:  Huston-Tillotson University Laundry App			
PROJECT DEVELOPER: Jadyn Gray		 	
PROJECT REPOSITORY (GITHUB LINK): https://github.com/Baller2003jg/laundry_app		

 

Table of Contents
Contents
Table of Contents	2
Revision History	4
Jadyn Gray               11/14/25                        Draft                     1.0	4
1. Introduction	5
1.1 Purpose	5
1.2 Document Conventions	5
1.3 Intended Audience and Reading Suggestions	5
1.4 Project Scope	5
1.5 References	5
2. Overall Description	6
2.1 Product Perspective	6
2.2 Product Features	6
2.3 User Classes and Characteristics	6
2.4 Operating Environment	6
2.5 Design and Implementation Constraints	6
2.6 User Documentation	6
2.7 Assumptions and Dependencies	6
3. System Features	7
4. External Interface Requirements	11
4.1 User Interfaces	11
4.2 Hardware Interfaces	11
4.3 Software Interfaces	11
4.4 Communications Interfaces	11
5. Other Nonfunctional Requirements	11
5.1 Performance Requirements	11
5.2 Safety Requirements	11
5.3 Security Requirements	12
5.4 Software Quality Attributes	12
6. Other Requirements	12
Appendix A: Glossary	12
Appendix B: Analysis Models	12
Appendix C: Issues List	13

 

Revision History
Name	Date	Reason for Changes	Version
Jadyn Gray               11/14/25                        Draft                     1.0
Jadyn Gray               11/20/25           Bullet point changes      1.1
Jadyn Gray               11/30/25                Update diagrams       1.2
System Update            03/06/26           Reflect implemented features   1.3

 
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
**Current Implementation (v1.3):**
This product is a web-based laundry management system built with React 18.3.1, TypeScript 5.9.3, and Vite 5.1.0. The system provides a digital interface for students to select and manage washers and dryers, track machine cycle times, and receive text notifications. The current version uses browser localStorage for session management and simulates machine operations with real-time countdown timers.

**Future Vision:**
Future versions will integrate with IoT-enabled smart washers and dryers, with backend services using Firebase or AWS for real-time synchronization across multiple devices and physical machine control.
2.2 Product Features
**Currently Implemented (v1.3):**
•	User authentication with email login
•	"Keep me signed in" option for persistent sessions
•	Selection of up to 2 washers and 2 dryers from 8 available machines each
•	Multiple wash cycle types: Quick (15min), Regular (30min), Bedding (30min), Rinse (30min)
•	Multiple dry cycle types: Quick (15min), Regular (40min), Wrinkle Release (20min)
•	Real-time countdown timers (MM:SS format) updating every second
•	SMS notification setup with 10-digit phone number validation
•	Machine status displays: Available, In Use, Completion notifications
•	Logout functionality to clear session and return to login
•	Reset All function to stop all timers and clear selections
•	Responsive UI with navigation bar and machine dashboards

**Planned for Future Versions:**
•	QR code scanning to identify machines
•	Integration with IoT-enabled washers/dryers
•	Remote start/stop capabilities
•	Machine reservation system
•	Admin dashboard
•	Usage history and analytics
2.3 User Classes and Characteristics
Students serve as the primary users, interacting with the app to check machine availability, start laundry cycles, and track cycle progress. These users require only basic technical skills. Administrators manage machine information, system data, and maintenance statuses, requiring a moderate level of technical ability. Developers maintain and enhance the backend systems and therefore must have advanced technical knowledge.
2.4 Operating Environment
**Current (v1.3):**
•	Web browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
•	Devices: Desktop, laptop, tablet, smartphone with internet access
•	Requirements: JavaScript enabled, localStorage access
•	Recommended: 2GB RAM, stable internet connection
•	Hosting: Static hosting services (Netlify, Vercel, GitHub Pages)

**Future:**
•	Mobile apps for Android 10+ and iOS 14+
•	Backend hosting on Firebase or AWS
•	IoT device integration via Wi-Fi

2.5 Design and Implementation Constraints
**Current (v1.3):**
•	The system uses browser localStorage for session persistence, limiting data to single-browser sessions
•	Timer accuracy depends on JavaScript setTimeout/setInterval precision
•	Text notifications are simulated (console log + alert) pending SMS API integration
•	No persistent backend database - all state is client-side
•	Machine selection limited to 2 per category to prevent resource conflicts

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
•	Vite 5.1.0 - Build tool and dev server
•	Vitest 1.0.0 - Testing framework

**Future:**
•	Washers/dryers will support API for remote status updates and control
•	QR codes will be securely generated and tamper-resistant
•	Users will have valid Huston-Tillotson login credentials
3. System Features

**IMPLEMENTED FEATURES (v1.3)**

3.1 User Authentication
3.1.1 Description and Priority
Allows users to log in with email and optionally stay signed in across sessions.
Priority: High - IMPLEMENTED
3.1.2 Stimulus/Response Sequences
Stimulus: User enters email address and clicks "Login". Optionally checks "Keep me signed in."
Response: The system saves email to localStorage (if checked) and grants access to the main dashboard.
3.1.3 Functional Requirements
FR-1.1: The system shall accept any valid email format for login
FR-1.2: The system shall provide a "Keep me signed in" checkbox
FR-1.3: The system shall store user email in localStorage when "Keep me signed in" is enabled
FR-1.4: The system shall auto-login users on subsequent visits if session is saved
FR-1.5: The system shall display the user's email in the application context 
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
FR-3.1: The system shall provide washer cycle options: Rinse only (30 min), Quick wash (15 min), Bedding (30 min), Regular wash (30 min)
FR-3.2: The system shall provide dryer cycle options: Quick dry (15 min), Wrinkle release (20 min), Regular dry (40 min)
FR-3.3: The system shall update timer duration when cycle type is changed
FR-3.4: The system shall disable cycle selection once machine is running
FR-3.5: The system shall preserve cycle selection for each machine

3.4 Real-Time Timer Management
3.4.1 Description and Priority
Displays countdown timers for running machines with real-time updates.
Priority: High - IMPLEMENTED
3.4.2 Stimulus/Response Sequences
Stimulus: User clicks "Submit machines" to start selected machines.
Response: The system starts countdown timers for all selected machines, updating every second.
3.4.3 Functional Requirements
FR-4.1: The system shall display timers in MM:SS format
FR-4.2: The system shall update timers every 1 second
FR-4.3: The system shall countdown from the selected cycle duration to 00:00
FR-4.4: The system shall display "In use — [time remaining]" on running machines
FR-4.5: The system shall automatically stop timers when they reach 00:00
FR-4.6: The system shall maintain timer state during page refresh for running machines
FR-4.7: The system shall provide a "Complete" button to manually stop individual machines

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
FR-5.6: The system shall display notification placeholder (console log + alert) when timer completes
Note: SMS API integration (Twilio) pending for actual text message delivery

3.6 User Logout
3.6.1 Description and Priority
Allows users to logout, clearing session and returning to login screen.
Priority: Medium - IMPLEMENTED
3.6.2 Stimulus/Response Sequences
Stimulus: User clicks "Logout" button in navigation bar.
Response: The system stops all timers, clears localStorage, and returns to login screen.
3.6.3 Functional Requirements
FR-6.1: The system shall provide a "Logout" button in the navigation bar
FR-6.2: The system shall clear all running timers on logout
FR-6.3: The system shall remove saved email from localStorage
FR-6.4: The system shall reset all machine selections and settings
FR-6.5: The system shall return user to login screen
FR-6.6: The system shall prevent auto-login after logout

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

**PLANNED FUTURE FEATURES**
3.8 QR Code Machine Control
3.8.1 Description and Priority
Allows users to scan QR codes placed on washers/dryers to identify, or remotely start/stop a machine.
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
 
Database Diagram
 
Entity Relationship Diagram
 
Appendix C: Issues List
The system is currently integrating the QR scanning library ZXing. Testing of machine API control via QR ID is to be determined, and confirmation of the Firebase connection with the IoT devices is also to be determined.

---

## Version 1.3 Implementation Summary (March 6, 2026)

### Implemented Features
The following features have been successfully implemented in version 1.3:

✅  **User Authentication** - Email-based login with "Keep me signed in" functionality
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

### Features Pending Future Implementation
🔲 QR code scanning for machine identification
🔲 IoT integration with physical washers/dryers
🔲 Remote machine start/stop control
🔲 Machine reservation system
🔲 Usage history tracking
🔲 Admin dashboard
🔲 HT credential authentication
🔲 Feedback submission
🔲 Notification settings customization
🔲 Actual SMS delivery via Twilio/similar API

### Documentation
Complete project documentation available in GitHub repository:
- docs/USER_GUIDE.md - Usage instructions and FAQ
- docs/INSTALL.md - Installation and deployment guide
- docs/DEMO.md - Live demo information
- requirements/SRS.md - This document

### Repository
https://github.com/Baller2003jg/laundry_app
