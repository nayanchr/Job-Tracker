# Job Tracker API

A REST API for tracking job applications during a job search. 
Built to solve a real problem — keeping track of where you applied, 
what stage you're at, and what happened.

## Features
- User registration and login with JWT authentication
- Create, read, update and delete job applications
- Each user only sees their own applications
- Track application status: applied, interview, rejected, offer
- Passwords are hashed and never stored in plain text

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- bcryptjs

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### Installation
1. Clone the repository
   git clone https://github.com/nayanchr/Job-Tracker.git

2. Install dependencies
   npm install

3. Create a .env file with:
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

4. Run the server
   node app.js

## API Endpoints

### Auth
- POST /auth/register — create a new account
- POST /auth/login    — login and get token
- GET  /auth/profile  — get your profile (protected)

### Applications
- POST   /applications      — add a new application (protected)
- GET    /applications      — get all your applications (protected)
- PATCH  /applications/:id  — update an application (protected)
- DELETE /applications/:id  — delete an application (protected)

### Status Options
- `applied` — submitted the application
- `interview` — got an interview
- `rejected` — application was rejected
- `offer` — received an offer

## Author
Nayan Chourey
GitHub: https://github.com/nayanchr