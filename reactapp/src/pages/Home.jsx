import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Smart Expense Reimbursement</h1>
          <p>
            Track, submit, and approve expenses with ease. Save time and control budgets effortlessly.
          </p>
          <div className="hero-buttons">
            <Link to="/login">
              <button className="primary-btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="secondary-btn">Register</button>
            </Link>
          </div>
        </div>
        <div className="hero-illustration">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2331/2331941.png"
            alt="expenses"
          />
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>💳 Track Expenses</h3>
          <p>Stay on top of employee and business expenses with real-time tracking.</p>
        </div>
        <div className="feature-card">
          <h3>📑 Submit Easily</h3>
          <p>Upload receipts, categorize expenses, and submit with just a few clicks.</p>
        </div>
        <div className="feature-card">
          <h3>✅ Approve Fast</h3>
          <p>Managers can review and approve expenses quickly with automated workflows.</p>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} ClaimEase. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;


