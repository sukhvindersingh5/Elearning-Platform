# AI-Powered E-Learning Platform

A full-stack e-learning platform where **Admins** create and manage courses, and **Students** enroll, learn, take quizzes, and ask a RAG-based **AI Tutor** questions about course material.

This project is being built **phase by phase**. This README is updated after each phase.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite), React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB (local dev) → MongoDB Atlas (production) |
| Auth | JWT + bcrypt |
| Styling | Vanilla CSS — dark theme, glassmorphism, CSS variables |
| File Storage | Cloudinary *(added in Phase 2)* |
| AI / RAG | LangChain.js, HuggingFace embeddings, MongoDB Atlas Vector Search, Gemini/OpenAI API *(added in Phase 5)* |

---

## Project Structure

```
elearning-platform/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── models/User.js            # User schema (student/admin) + password hashing
│   ├── controllers/authController.js   # register, login, getMe logic
│   ├── routes/authRoutes.js      # /api/auth/*
│   ├── routes/testRoutes.js      # temporary routes proving role protection works
│   ├── middleware/authMiddleware.js    # verifies JWT
│   ├── middleware/roleMiddleware.js    # restricts routes by role
│   ├── utils/generateToken.js    # signs JWTs
│   ├── utils/seedAdmin.js        # CLI script to create the first admin account
│   ├── .env.example
│   └── server.js                 # Express app entry point
│
├── frontend/
│   ├── src/
│   │   ├── context/AuthContext.jsx     # global auth state (login/register/logout)
│   │   ├── services/api.js             # Axios instance, auto-attaches JWT
│   │   ├── components/ProtectedRoute.jsx  # route guard (login + role check)
│   │   ├── components/Navbar.jsx       # sticky top nav, role badge, logout
│   │   ├── pages/Home.jsx              # public landing page (hero, features, roadmap)
│   │   ├── pages/Login.jsx
│   │   ├── pages/Register.jsx
│   │   ├── pages/admin/AdminDashboard.jsx
│   │   ├── pages/student/StudentDashboard.jsx
│   │   ├── index.css             # premium dark theme design system
│   │   ├── App.jsx               # routes
│   │   └── main.jsx              # app entry point
│   └── .env.example
│
└── README.md
```

---

## ✅ Phase 1 — Project Setup, Authentication & Home Page (COMPLETE)

**What was built:**

### Backend
- Full project skeleton: React (Vite) frontend + Node/Express backend, wired to MongoDB.
- `User` model with `role: "student" | "admin"`, and automatic password hashing via a Mongoose `pre("save")` hook (bcrypt).
- **Register** endpoint (`POST /api/auth/register`) — always creates a `student` account.
- **Login** endpoint (`POST /api/auth/login`) — shared by both roles; the role comes from the database, not the request.
- **JWT-based auth**: on successful login/register, a signed token (containing user id + role) is returned and stored in `localStorage` on the frontend.
- **`protect` middleware** — verifies the JWT on protected backend routes and attaches the user to `req.user`.
- **`authorizeRoles` middleware** — restricts a route to specific roles (e.g. `authorizeRoles("admin")`), used *after* `protect`.
- `seedAdmin.js` script to create the first admin account from the command line.
- Temporary test routes (`/api/test/admin-only`, `/api/test/student-only`, `/api/test/protected`) to prove the protection works end-to-end.

### Frontend
- **`AuthContext`** — holds the logged-in user, restores the session on page refresh via `GET /api/auth/me`, and exposes `login()`, `register()`, `logout()`.
- **`ProtectedRoute` component** — redirects to `/login` if not authenticated, or shows 403 if the role doesn't match.
- Role-based redirect after login: admins → `/admin`, students → `/student`.
- **Public Home page** (`/`) — hero section, features grid, build-phase roadmap, CTA banner, and footer. Redirects logged-in users straight to their dashboard.
- **Premium dark UI** — CSS variables, glassmorphism cards, gradient text, micro-animations, Google Fonts (Inter + Outfit), fully responsive.
- Redesigned Login, Register, Admin Dashboard, Student Dashboard — all using the new design system.

**Not built yet (coming in later phases):** course creation, file uploads, lessons, quizzes, progress tracking, AI Tutor.

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB running locally **or** a MongoDB Atlas connection string

### 1. Clone & install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure environment

**Backend** — edit `backend/.env`:
```env
MONGO_URI=mongodb://localhost:27017/elearning   # or your Atlas URI
PORT=5000
JWT_SECRET=your_long_random_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

**Frontend** — edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed the admin account

Public registration always creates students. To create the first admin:

```bash
cd backend
node utils/seedAdmin.js "Admin" admin@elearning.com Admin@123
```

> **Default admin credentials (dev):**
> - Email: `admin@elearning.com`
> - Password: `Admin@123`

### 4. Run both servers

```bash
# Terminal 1 — Backend (port 5000)
cd backend
npm run dev

# Terminal 2 — Frontend (port 5173)
cd frontend
npm run dev
```

### 5. Try it out

| URL | What you'll see |
|---|---|
| `http://localhost:5173/` | Public Home page (hero, features, roadmap) |
| `http://localhost:5173/register` | Create a student account |
| `http://localhost:5173/login` | Login (admin or student) |
| `http://localhost:5173/admin` | Admin dashboard (protected) |
| `http://localhost:5173/student` | Student dashboard (protected) |

---

## API Reference (Phase 1)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create a new student account |
| POST | `/api/auth/login` | Public | Log in (student or admin) |
| GET | `/api/auth/me` | Private (any role) | Get the current logged-in user |
| GET | `/api/test/protected` | Private (any role) | Test route — confirms JWT works |
| GET | `/api/test/admin-only` | Private (admin) | Test route — confirms role protection |
| GET | `/api/test/student-only` | Private (student) | Test route — confirms role protection |

---

## Upcoming Phases

- **Phase 2** — Course management (create/edit/delete courses, modules, lessons) + Cloudinary file uploads for videos/PDFs/thumbnails.
- **Phase 3** — Student learning flow: browse, enroll, watch/read content, mark lessons complete, progress tracking.
- **Phase 4** — MCQ quiz system with auto-scoring and stored results.
- **Phase 5** — RAG-based AI Tutor (text extraction → chunking → embeddings → MongoDB Atlas Vector Search → LLM answer), scoped per course.
- **Phase 6** — Testing, security hardening, deployment, and full documentation.

Each phase will be built, tested, and documented here before moving to the next.
