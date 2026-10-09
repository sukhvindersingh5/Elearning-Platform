import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const features = [
  {
    icon: "🎓",
    title: "Structured Courses",
    desc: "Admin-curated courses with modules, lessons, and rich content including videos and PDFs.",
  },
  {
    icon: "🤖",
    title: "AI Tutor (RAG)",
    desc: "Ask questions about any course and get intelligent answers powered by LangChain and Gemini.",
  },
  {
    icon: "📝",
    title: "Smart Quizzes",
    desc: "Auto-scored MCQ quizzes at the end of each module to reinforce learning and track mastery.",
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    desc: "Visual progress indicators per course so students always know where they stand.",
  },
  {
    icon: "🔒",
    title: "Role-Based Access",
    desc: "Secure JWT authentication with separate admin and student portals — zero overlap.",
  },
  {
    icon: "☁️",
    title: "Cloud Storage",
    desc: "All videos, PDFs, and thumbnails stored on Cloudinary for fast, reliable delivery.",
  },
];

const phases = [
  {
    num: "1",
    label: "Complete",
    status: "done",
    title: "Project Setup & Authentication",
    desc: "Full auth system — register, login, JWT tokens, role-based route protection.",
  },
  {
    num: "2",
    label: "Next",
    status: "upcoming",
    title: "Course Management",
    desc: "Create/edit/delete courses, modules & lessons. Cloudinary uploads.",
  },
  {
    num: "3",
    label: "Upcoming",
    status: "upcoming",
    title: "Student Learning Flow",
    desc: "Browse courses, enroll, watch/read content, mark lessons complete.",
  },
  {
    num: "4",
    label: "Upcoming",
    status: "upcoming",
    title: "MCQ Quiz System",
    desc: "Auto-scored quizzes with instant results and stored history.",
  },
  {
    num: "5",
    label: "Upcoming",
    status: "upcoming",
    title: "RAG-Based AI Tutor",
    desc: "Vector embeddings, MongoDB Atlas Vector Search, and LLM-powered answers.",
  },
  {
    num: "6",
    label: "Upcoming",
    status: "upcoming",
    title: "Testing & Deployment",
    desc: "Security hardening, full test suite, and production deployment.",
  },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-page">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">
            <span>✦</span> AI-Powered Learning Platform
          </div>
          <h1>
            Learn Smarter with{" "}
            <span className="gradient-text">AI Tutoring</span>
            {" "}Built In
          </h1>
          <p className="hero-desc">
            A full-stack e-learning platform where admins create rich course content and
            students learn, take quizzes, and get instant answers from an AI tutor — all in one place.
          </p>
          <div className="hero-cta">
            {user ? (
              <Link
                to={user.role === "admin" ? "/admin" : "/student"}
                className="btn btn-primary btn-lg"
                id="hero-dashboard-btn"
              >
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg" id="hero-get-started-btn">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-outline btn-lg" id="hero-login-btn">
                  Sign In
                </Link>
              </>
            )}
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">6</div>
              <div className="hero-stat-label">Dev Phases</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">RAG</div>
              <div className="hero-stat-label">AI Tutor</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">JWT</div>
              <div className="hero-stat-label">Secure Auth</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">∞</div>
              <div className="hero-stat-label">Courses</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section" id="features">
        <div className="section-tag">✦ What's Inside</div>
        <h2 className="section-title">Everything you need to learn effectively</h2>
        <p className="section-desc">
          From structured courses to an AI tutor that knows your course material — built for modern learners.
        </p>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Build Phases ── */}
      <div className="phases-section" id="phases">
        <div className="phases-inner">
          <div className="section-tag">✦ Roadmap</div>
          <h2 className="section-title">Built phase by phase</h2>
          <p className="section-desc">
            This platform is developed incrementally — each phase adds a complete, tested feature set.
          </p>
          <div className="phases-list">
            {phases.map((p) => (
              <div className="phase-item" key={p.num}>
                <div className={`phase-dot ${p.status}`}>
                  {p.status === "done" ? "✓" : p.num}
                </div>
                <div className="phase-body">
                  <div className={`phase-label ${p.status}`}>{p.label}</div>
                  <h3>Phase {p.num} — {p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to start learning?</h2>
          <p>Create your free student account and get access to all available courses.</p>
          <div className="cta-buttons">
            {user ? (
              <Link
                to={user.role === "admin" ? "/admin" : "/student"}
                className="btn btn-primary btn-lg"
                id="cta-dashboard-btn"
              >
                Open Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg" id="cta-register-btn">
                  Create Free Account
                </Link>
                <Link to="/login" className="btn btn-outline btn-lg" id="cta-login-btn">
                  I have an account
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-brand">⚡ AI E-Learning Platform</div>
        <div className="footer-copy">© 2026 · Built with React, Node.js & MongoDB</div>
      </footer>
    </div>
  );
}
