
import React, { useState } from "react";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    setLoading(true);

    try {
      const res = await fetch(`https://ai-vault-backend-diiu.onrender.com/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to logout");
      }


      localStorage.removeItem("user");
      localStorage.removeItem("token");

      toast.success("LOGGED OUT SUCCESSFULLY ✅");

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-container">
        <h1 className="dashboard-logo">
          <Link to="/dashboard">AI Vault 🔥</Link>
        </h1>

        <nav className="dashboard-nav">
          <Link to="/" className="dashboard-link">
            Home
          </Link>

          <div className="user-pill">
            <div className="avatar">
              {user?.email?.charAt(0)?.toUpperCase()} 👤
            </div>
            <span className="user-email">{user?.email}</span>
          </div>

          <button className="logout-btn" onClick={handleLogout} disabled={loading}>
            {loading ? "Logging out..." : "Logout"}
          </button>
        </nav>
        
      </div>
    </header>
  );
};

export default DashboardNavbar;
