# AI-Powered E-Learning Platform — Setup Guide

## About the Project

A full-stack e-learning platform built with **React + Node.js + MongoDB**.

- **Students** can register, log in, browse courses, take quizzes, and ask an AI Tutor questions about course material.
- **Admins** can create and manage courses, modules, lessons, and monitor student progress.
- **AI Tutor** is powered by RAG (LangChain + MongoDB Vector Search + Gemini) — scoped per course.

**Tech Stack:**
- Frontend: React.js (Vite) + React Router + Axios
- Backend: Node.js + Express.js
- Database: MongoDB (local dev) / MongoDB Atlas (production)
- Auth: JWT + bcrypt
- File Storage: Cloudinary *(Phase 2)*
- AI: LangChain.js + HuggingFace Embeddings + Gemini API *(Phase 5)*

---

## Prerequisites

Make sure you have installed:
- [Node.js v18+](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally **or** a MongoDB Atlas URI

---

## Installation & Setup

### Step 1 — Clone the repository

```bash
git clone https://github.com/sukhvindersingh5/Elearning-Platform.git
cd Elearning-Platform
```

---

### Step 2 — Backend Setup

```bash
cd backend
npm install
```

Create your `.env` file:

```bash
cp .env.example .env
```

Then open `backend/.env` and fill in:

```env
MONGO_URI=mongodb://localhost:27017/elearning
PORT=5000
JWT_SECRET=your_long_random_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

---

### Step 3 — Frontend Setup

```bash
cd ../frontend
npm install
```

Create your `.env` file:

```bash
cp .env.example .env
```

`frontend/.env` should contain:

```env
VITE_API_URL=http://localhost:5000/api
```

---

### Step 4 — Create the Admin Account

Public registration only creates student accounts. Run this once to create the admin:

```bash
cd backend
node utils/seedAdmin.js "Your Name" your@email.com yourPassword
```

---

## Running the Project

Open **two terminals** and run:

**Terminal 1 — Backend** (runs on port 5000):
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend** (runs on port 5173):
```bash
cd frontend
npm run dev
```

---

## Access the App

| URL | Page |
|---|---|
| `http://localhost:5173/` | Home page |
| `http://localhost:5173/register` | Student registration |
| `http://localhost:5173/login` | Login (admin & student share this) |
| `http://localhost:5173/admin` | Admin dashboard *(protected)* |
| `http://localhost:5173/student` | Student dashboard *(protected)* |

**Admin login** — use the credentials you set when running the `seedAdmin.js` script above.

---

## Project Structure

```
Elearning-Platform/
├── backend/
│   ├── config/          # MongoDB connection
│   ├── controllers/     # Auth logic
│   ├── middleware/      # JWT verify + role check
│   ├── models/          # User schema
│   ├── routes/          # API routes
│   ├── utils/           # Token generator, seed admin script
│   ├── .env.example     # Environment variable template
│   └── server.js        # Express entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbar, ProtectedRoute
│   │   ├── context/     # AuthContext (global login state)
│   │   ├── pages/       # Home, Login, Register, Admin & Student dashboards
│   │   ├── services/    # Axios API instance
│   │   └── index.css    # Global dark theme design system
│   ├── .env.example
│   └── index.html
│
└── SETUP.md             # This file
```

---

## API Endpoints (Phase 1)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create a student account |
| POST | `/api/auth/login` | Public | Login (any role) |
| GET | `/api/auth/me` | Private | Get current logged-in user |
| GET | `/api/test/protected` | Private (any) | JWT test |
| GET | `/api/test/admin-only` | Private (admin) | Role protection test |
| GET | `/api/test/student-only` | Private (student) | Role protection test |
