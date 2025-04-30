import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginModal from "./LoginModal";
import SignupModal from "./SingupModal";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  // tracks if the login and signup modal is open or not
  const [showModal, setShowModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <>
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
                  Destinations
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tour-guides">
                  Tour Guide
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/hosts">
                  Host
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item ms-3">
                {user ? (
                  <>
                    <Link to="/profile" className="text-decoration-none me-2">
                      <span style={{ color: "#6A1B9A", fontWeight: "500" }}>
                        👤 {user.name}
                      </span>
                    </Link>
                    <button
                      className="btn rounded-0 px-4"
                      style={{ color: "#9b59b6", border: "1px solid #9b59b6" }}
                      onClick={logout}
                    >
                      LOG OUT
                    </button>
                  </>
                ) : (
                  <button
                    className="btn rounded-0 px-4"
                    style={{ color: "#9b59b6", border: "1px solid #9b59b6" }}
                    onClick={() => setShowModal(true)}
                  >
                    LOGIN
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/*====================== Login modal popup ======================*/}
      <LoginModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSwitchToSignup={() => {
          setShowModal(false);
          setShowSignupModal(true);
        }}
      />
      <SignupModal
        show={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSignupSuccess={() => {
          setShowSignupModal(false);
          setShowModal(true);
        }}
      />
    </>
  );
}

export default Navbar;
