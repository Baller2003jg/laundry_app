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
•	Firebase and Flutter Documentation
•	AWS Cloud Hosting Documentation

2. Overall Description
2.1 Product Perspective
This product is a new system developed with smart washers and dryers through IoT technology; it integrates a mobile front-end built-in Flutter or React with a Firebase backend for real time sync and possible use of AWS or Google Cloud for hosting.
2.2 Product Features
The system includes the ability to scan QR codes to identify and control laundry machines. It provides real-time updates showing whether washers and dryers are available, in use, or completing their cycles. Users receive timer-based notifications so they know exactly when their laundry is done. The app also features secure login using Huston-Tillotson student credentials, and it offers a clean, responsive user interface designed for easy navigation.
2.3 User Classes and Characteristics
Students serve as the primary users, interacting with the app to check machine availability, start laundry cycles, and track cycle progress. These users require only basic technical skills. Administrators manage machine information, system data, and maintenance statuses, requiring a moderate level of technical ability. Developers maintain and enhance the backend systems and therefore must have advanced technical knowledge.
2.4 Operating Environment
The application runs on mobile devices with Android 10 or newer and iOS 14 or newer. Its backend infrastructure is built on Firebase and may be hosted through Google Cloud or AWS. To function properly, the app requires internet access through Wi-Fi or mobile data. The QR scanning feature also requires permission to use the device’s camera.

2.5 Design and Implementation Constraints
Each washer and dryer must display a unique QR code that corresponds to its machine ID within the system. The application must have camera permissions enabled to support QR code scanning. The system relies on Firebase for real-time communication and data storage, creating a dependency on the availability and uptime of Firebase services.
2.6 User Documentation
The system will include a built-in user manual that provides instructions and guidance within the app. Additionally, a video demonstration will guide users through the QR scanning process and general system operation.
2.7 Assumptions and Dependencies
The app assumes that all washers and dryers in the dorms support an API that allows remote status updates and potential control actions. It also assumes that QR codes placed on the machines are securely generated and resistant to tampering. Furthermore, the system relies on all users having valid Huston-Tillotson login credentials to ensure proper authentication and security.
3. System Features
3.1 Real-Time Machine Status
3.1.1 Description and Priority
This feature provides up to date information on washer and dryer availability, showing which machines are free, in use, or done.
Priority: High
3.1.2 Stimulus/Response Sequences
Stimulus: User opens the app or refreshes the home screen.
Response: The system retrieves machine status from the backend and displays real-time updates.
3.1.3 Functional Requirements
Functional requirement for these features will activate camera when it is time to scan the button. It shall decode a QR code and match to the machine and once that has happened it will display the machine information immediately 
3.2 Timer Notifications
3.2.1 Description and Priority
Sends alerts when a user’s laundry cycle is finished.
Priority: High
3.2.2 Stimulus/Response Sequences
Stimulus: A washer or dryer cycle reaches 0 remaining minutes.
Response: The system pushes a notification to the user.
3.2.3 Functional Requirements
Every few seconds, the system will ask for updated machine status information. Each machine's status will be visually updated on the user interface by the system. A machine's availability, busy status, and completion status must be displayed by the system.
3.3 QR Code Machine Control
3.3.1 Description and Priority
Allows users to scan QR codes placed on washers/dryers to identify, or remotely start/stop a machine.
Priority: High
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
