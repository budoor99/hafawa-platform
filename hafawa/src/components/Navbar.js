// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          حفاوة
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/content">
                Content
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tour-guide">
                Tour Guide
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/host">
                Host
              </Link>
            </li>

            <li className="nav-item ms-3">
              <Link className="btn btn-outline-dark rounded-0 px-4" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
