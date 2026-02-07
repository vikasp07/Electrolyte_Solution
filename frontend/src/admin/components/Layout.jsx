// admin/components/Layout.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../state/auth";
import "../admin.css";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const logout = () => {
    clearToken();
    navigate("/admin/login");
  };

  return (
    <div className="admin-container" style={{ padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link to="/admin/blogs" style={{ 
            textDecoration: "none",
            background: "#FFD400",
            color: "#1a1a2e",
            padding: "8px 16px",
            fontWeight: 700,
            fontSize: "14px",
            border: "2px solid #FFD400",
            cursor: "pointer",
            display: "inline-block",
            transition: "all 0.2s ease"
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#1a1a2e";
            e.target.style.color = "#FFD400";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#FFD400";
            e.target.style.color = "#1a1a2e";
          }}>Blogs</Link>
          <Link to="/admin/blogs/new" style={{ 
            textDecoration: "none",
            background: "#FFD400",
            color: "#1a1a2e",
            padding: "8px 16px",
            fontWeight: 700,
            fontSize: "14px",
            border: "2px solid #FFD400",
            cursor: "pointer",
            display: "inline-block",
            transition: "all 0.2s ease"
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#1a1a2e";
            e.target.style.color = "#FFD400";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#FFD400";
            e.target.style.color = "#1a1a2e";
          }}>New Blog</Link>
          <Link to="/admin/contact-submissions" style={{ 
            textDecoration: "none",
            background: "#FFD400",
            color: "#1a1a2e",
            padding: "8px 16px",
            fontWeight: 700,
            fontSize: "14px",
            border: "2px solid #FFD400",
            cursor: "pointer",
            display: "inline-block",
            transition: "all 0.2s ease"
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#1a1a2e";
            e.target.style.color = "#FFD400";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#FFD400";
            e.target.style.color = "#1a1a2e";
          }}>Contact Submissions</Link>
        </nav>
        <button onClick={logout} style={{ padding: "8px 16px", fontWeight: 700 }}>Logout</button>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
