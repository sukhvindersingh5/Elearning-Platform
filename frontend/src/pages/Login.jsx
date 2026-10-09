import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [mode, setMode] = useState("student"); // "student" | "admin"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const isAdmin = mode === "admin";

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setError("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      // Role from DB must match the selected mode
      if (data.role !== mode) {
        setError(
          mode === "admin"
            ? "This account does not have admin privileges."
            : "Please use the Admin login for this account."
        );
        setLoading(false);
        return;
      }
      navigate(data.role === "admin" ? "/admin" : "/student");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`login-page ${isAdmin ? "login-page--admin" : "login-page--student"}`}>
      {/* Animated background blobs */}
      <div className="login-blob login-blob-1" />
      <div className="login-blob login-blob-2" />
      <div className="login-blob login-blob-3" />

      <div className="login-card">
        {/* Brand */}
        <Link to="/" className="auth-logo" id="login-home-link">
          ⚡ AI E-Learning
        </Link>

        {/* Mode toggle */}
        <div className="role-toggle" id="role-toggle">
          <div
            className="role-toggle-slider"
            style={{ transform: isAdmin ? "translateX(100%)" : "translateX(0)" }}
          />
          <button
            type="button"
            id="toggle-student-btn"
            className={`role-toggle-btn ${!isAdmin ? "active" : ""}`}
            onClick={() => handleModeSwitch("student")}
          >
            <span className="role-toggle-icon">🎓</span>
            Student
          </button>
          <button
            type="button"
            id="toggle-admin-btn"
            className={`role-toggle-btn ${isAdmin ? "active" : ""}`}
            onClick={() => handleModeSwitch("admin")}
          >
            <span className="role-toggle-icon">⚙️</span>
            Admin
          </button>
        </div>

        {/* Heading — animates on switch */}
        <div className="login-heading">
          <h1 key={mode} className="login-title">
            {isAdmin ? "Admin Portal" : "Welcome back"}
          </h1>
          <p className="login-subtitle" key={`sub-${mode}`}>
            {isAdmin
              ? "Restricted access — authorised personnel only."
              : "Sign in to continue your learning journey."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} id="login-form" className="login-form">
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">✉</span>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className="form-error">
              <span>⚠</span> {error}
            </div>
          )}

          <button
            type="submit"
            id="login-submit-btn"
            className={`login-submit-btn ${isAdmin ? "login-submit-btn--admin" : "login-submit-btn--student"}`}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner" />
            ) : (
              <>
                {isAdmin ? "Access Admin Panel" : "Sign In"} →
              </>
            )}
          </button>
        </form>

        {!isAdmin && (
          <p className="auth-footer">
            Don't have an account?{" "}
            <Link to="/register" id="login-register-link">Create one free</Link>
          </p>
        )}
      </div>
    </div>
  );
}
