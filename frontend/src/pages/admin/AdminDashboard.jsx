import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const upcomingFeatures = [
  { icon: "📚", title: "Course Creation", desc: "Build and publish courses with modules, lessons, videos and PDFs. (Phase 2)" },
  { icon: "👥", title: "Student Management", desc: "View enrolled students and monitor their progress per course. (Phase 3)" },
  { icon: "📊", title: "Quiz Management", desc: "Create MCQ quizzes and review auto-scored results. (Phase 4)" },
  { icon: "🤖", title: "AI Tutor Config", desc: "Configure the RAG-based AI tutor per course with custom context. (Phase 5)" },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [serverMsg, setServerMsg] = useState("");

  useEffect(() => {
    api
      .get("/test/admin-only")
      .then((res) => setServerMsg(res.data.message))
      .catch((err) => setServerMsg(err.response?.data?.message || "Error verifying access"));
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1>
            Welcome back, <span>{user?.name}</span> 👋
          </h1>
          <p>
            Admin portal · Auth verified:{" "}
            <span style={{ color: "var(--success)", fontWeight: 500 }}>
              {serverMsg || "Checking…"}
            </span>
          </p>
        </div>

        {/* Status Cards */}
        <div className="cards-grid">
          <div className="info-card">
            <div className="info-card-icon">🔐</div>
            <h3>Auth Status</h3>
            <p>JWT verified and role-protection confirmed. Your admin session is active.</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">📦</div>
            <h3>Phase 1 Complete</h3>
            <p>Authentication system is fully operational. Phase 2 (Courses) coming next.</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">🗄️</div>
            <h3>Database</h3>
            <p>Connected to local MongoDB. Your account is stored securely with bcrypt hashing.</p>
          </div>
        </div>

        {/* Upcoming Features */}
        <div style={{ marginTop: "48px" }}>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.3rem", fontWeight: 600, marginBottom: "20px" }}>
            Coming in future phases
          </h2>
          <div className="cards-grid">
            {upcomingFeatures.map((f) => (
              <div className="info-card" key={f.title}>
                <div className="info-card-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
