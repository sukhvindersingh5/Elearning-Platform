import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const upcomingFeatures = [
  { icon: "🔍", title: "Browse Courses", desc: "Explore all available courses and enroll with one click. (Phase 3)" },
  { icon: "▶️", title: "Watch & Read", desc: "Stream video lessons and read PDF materials in-browser. (Phase 3)" },
  { icon: "✅", title: "Progress Tracking", desc: "Mark lessons complete and visualise your learning progress. (Phase 3)" },
  { icon: "📝", title: "Take Quizzes", desc: "Auto-scored MCQ quizzes after each module. (Phase 4)" },
  { icon: "🤖", title: "Ask AI Tutor", desc: "Get instant answers from an AI that knows your course material. (Phase 5)" },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const [serverMsg, setServerMsg] = useState("");

  useEffect(() => {
    api
      .get("/test/student-only")
      .then((res) => setServerMsg(res.data.message))
      .catch((err) => setServerMsg(err.response?.data?.message || "Error verifying access"));
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1>
            Welcome, <span>{user?.name}</span> 🎓
          </h1>
          <p>
            Student portal · Auth verified:{" "}
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
            <p>You're securely logged in. Your JWT token is being attached to every request automatically.</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">📦</div>
            <h3>Phase 1 Complete</h3>
            <p>Authentication is working end-to-end. Course access arrives in Phase 2 & 3.</p>
          </div>
          <div className="info-card">
            <div className="info-card-icon">🧑‍💻</div>
            <h3>Your Account</h3>
            <p>Email: <span style={{ color: "var(--accent-secondary)" }}>{user?.email}</span><br />Role: Student</p>
          </div>
        </div>

        {/* What's Coming */}
        <div style={{ marginTop: "48px" }}>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.3rem", fontWeight: 600, marginBottom: "20px" }}>
            Coming soon for you
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
