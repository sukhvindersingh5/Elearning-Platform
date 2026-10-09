import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" id="navbar-brand">
        ⚡ AI E-Learning
      </Link>

      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-user">
              Hey, <span>{user.name}</span>
            </span>
            <span className={`badge badge-${user.role}`}>{user.role}</span>
            <Link
              to={user.role === "admin" ? "/admin" : "/student"}
              className="btn btn-outline"
              id="navbar-dashboard-link"
              style={{ padding: "7px 16px", fontSize: "0.85rem" }}
            >
              Dashboard
            </Link>
            <button
              id="navbar-logout-btn"
              className="btn btn-danger"
              onClick={handleLogout}
              style={{ padding: "7px 16px", fontSize: "0.85rem" }}
            >
              Logout
            </button>
          </>
        ) : (
          <div className="navbar-links">
            <Link to="/login" className="btn btn-outline" id="navbar-login-btn"
              style={{ padding: "7px 18px", fontSize: "0.875rem" }}>
              Login
            </Link>
            <Link to="/register" className="btn btn-primary" id="navbar-register-btn"
              style={{ padding: "7px 18px", fontSize: "0.875rem" }}>
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
