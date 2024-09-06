# InternshipAssignment
 
Availability Management System
--Overview-----------------------------------------------------------
Welcome to the Availability Management System! This web application is designed to help users manage their availability and scheduled sessions. Users can set their availability, view their scheduled sessions, and administrators can manage availability and sessions for multiple users.

-----------------------------------------------Features-----------------------------------------------------
User Login: Authenticate users to access their dashboard.
Set Availability: Users can set their available time slots, including start time, end time, and duration.
Manage Sessions: Users can view, update, or delete their scheduled sessions.
Admin Dashboard: Administrators can view users, manage their availability, and schedule or delete sessions.
Technologies Used
React: JavaScript library for building the user interface.
Tailwind CSS: Utility-first CSS framework for styling.
axios: Promise-based HTTP client for making requests.
moment: Library for date and time manipulation.
react-calendar: Calendar component for date selection.
react-router-dom: Routing library for navigation.
Getting Started
To get a local copy up and running, follow these steps:

----------------------------------------------Prerequisites--------------------------------------------------
Node.js and npm installed on your machine.
Access to a backend API (adjust the endpoints if necessary).
Installation
Clone the repository:

bash
Copy code
git clone <repository-url>
Navigate to the project directory:

bash
Copy code
cd <project-directory>
Install the dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
The application will be available at http://localhost:5000 by default.

-----------------------------------------------------API Endpoints---------------------------------------------------------
The application interacts with the following API endpoints:

POST /api/login: Authenticate user and obtain a token.
POST /api/availability: Add new availability.
GET /api/availability: Fetch user availabilities.
GET /api/sessions: Fetch user sessions.
DELETE /api/sessions/:id: Delete a specific session.
PUT /api/sessions/:id: Update a specific session.
GET /api/admin/users: Fetch list of users for admin.
GET /api/admin/availability/:userId: Fetch availability for a specific user.
POST /api/admin/schedule: Schedule a new session for a user.
DELETE /api/admin/session/:id: Delete a session as admin.
--------------------------------------------------Configuration------------------------------------------------
Backend API: Ensure the backend API is running and accessible. Update the API endpoints in the code if necessary.
Authentication: User authentication is required. Ensure a valid userToken is stored in localStorage for accessing protected routes.
Usage
Login: Use the login form to authenticate and get redirected to the availability page.
Set Availability: Choose a date, specify start and end times, and add availability slots.
Manage Sessions: View, update, or delete your scheduled sessions.
Admin Dashboard: As an admin, you can view and manage users and their sessions.
