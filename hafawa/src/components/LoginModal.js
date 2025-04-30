import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../styles/modal.css";
import { AuthContext } from "../context/AuthContext";

function LoginModal({ show, onClose, onSwitchToSignup }) {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
    if (show) {
      setMessage(""); // clear old messages
      setFormData({ email: "", password: "" }); // clear form inputs
    }
  }, [show]);

  if (!show) return null;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      login(res.data.token, res.data.user); // update global auth context
      setMessage("Login successful!");

      setTimeout(() => {
        onClose(); // close after 1 second delay
      }, 1000);
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed.";
      setMessage(msg);
    }
  };

  return (
    <>
      <div
        className="modal fade show"
        style={{
          display: "block",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(2px)",
          transition: "opacity 0.3s ease-in-out",
          zIndex: 1050,
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content p-4 custom-fade-in"
            style={{
              borderRadius: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            <button
              type="button"
              className="btn-close position-absolute end-0 m-3"
              aria-label="Close"
              onClick={onClose}
            ></button>

            <h5 className="mb-4 fw-bold text-capitalize">Login</h5>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Email address <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email address..."
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="••••••••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <a
                  href=""
                  className="text-decoration-none"
                  style={{ color: "#9b59b6", fontSize: "0.9rem" }}
                >
                  Forgot your password?
                </a>
              </div>

              <button
                type="submit"
                className="btn w-100 text-white"
                style={{
                  backgroundColor: "#9b59b6",
                  borderRadius: "6px",
                }}
              >
                LOGIN
              </button>

              {message && (
                <p
                  className="mt-3 text-center fw-semibold"
                  style={{
                    color: message.includes("successful") ? "green" : "red",
                  }}
                >
                  {message}
                </p>
              )}

              <p
                className="text-center mt-3 mb-0"
                style={{ fontSize: "0.9rem" }}
              >
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="btn btn-link p-0 m-0 align-baseline fw-bold"
                  style={{ color: "#9b59b6", textDecoration: "none" }}
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginModal;
