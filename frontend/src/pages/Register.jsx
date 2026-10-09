import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/student");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo" id="register-home-link">⚡ AI E-Learning</Link>

        <h1>Create account</h1>
        <p className="auth-subtitle">Join for free — no credit card required.</p>

        <form onSubmit={handleSubmit} id="register-form">
          <div className="form-group">
            <label htmlFor="register-name">Full Name</label>
            <input
              id="register-name"
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Email Address</label>
            <input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              autoComplete="new-password"
            />
          </div>

          {error && (
            <div className="form-error">
              <span>⚠</span> {error}
            </div>
          )}

          <button
            type="submit"
            id="register-submit-btn"
            className="btn btn-primary btn-full"
            disabled={loading}
            style={{ marginTop: "8px", padding: "13px" }}
          >
            {loading ? "Creating account…" : "Create Account →"}
          </button>
        </form>

        <div className="divider" />
        <p className="auth-footer" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          By registering you get a <strong style={{ color: "var(--text-secondary)" }}>student</strong> account.
          Admin accounts are created separately.
        </p>
        <p className="auth-footer mt-8">
          Already have an account?{" "}
          <Link to="/login" id="register-login-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
