import React, { useEffect, useState, useContext } from "react";
import "../styles/modal.css";
import { AuthContext } from "../context/AuthContext";
import { login, signup } from "../services/authService";

function LoginModal({ show, onClose, onSwitchToSignup, isSignup = false }) {
  const { login: contextLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
    if (show) {
      setMessage(""); // clear old messages
      setFormData({
        email: "",
        password: "",
        name: "",
        phone: "",
      }); // clear form inputs
    }
  }, [show, isSignup]);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      let res;
      if (isSignup) {
        res = await signup(formData);
        setMessage("Signup successful! Please login.");
        setTimeout(() => {
          onSwitchToSignup(false);
        }, 1500);
      } else {
        res = await login(formData.email, formData.password);
        if (res.token && res.user) {
          contextLogin(res.token, res.user);
          setMessage("Login successful!");
          setTimeout(() => {
            onClose();
          }, 1000);
        } else {
          setMessage("Invalid response from server");
        }
      }
    } catch (err) {
      console.error(isSignup ? "Signup error:" : "Login error:", err);
      const msg =
        err.response?.data?.message ||
        (isSignup
          ? "Signup failed. Please try again."
          : "Login failed. Please try again.");
      setMessage(msg);
    } finally {
      setIsLoading(false);
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

            <h5 className="mb-4 fw-bold text-capitalize">
              {isSignup ? "Sign Up" : "Login"}
            </h5>
            <form onSubmit={handleSubmit}>
              {isSignup && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your full name..."
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              )}

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
                  required
                />
              </div>

              {isSignup && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Enter your phone number..."
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              )}

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
                  required
                />
              </div>

              {!isSignup && (
                <div className="mb-3">
                  <a
                    href=""
                    className="text-decoration-none"
                    style={{ color: "#9b59b6", fontSize: "0.9rem" }}
                  >
                    Forgot your password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="btn w-100 text-white"
                style={{
                  backgroundColor: "#9b59b6",
                  borderRadius: "6px",
                }}
                disabled={isLoading}
              >
                {isLoading
                  ? isSignup
                    ? "Signing up..."
                    : "Logging in..."
                  : isSignup
                  ? "SIGN UP"
                  : "LOGIN"}
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
                {isSignup
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() => onSwitchToSignup(!isSignup)}
                  className="btn btn-link p-0 m-0 align-baseline fw-bold"
                  style={{ color: "#9b59b6", textDecoration: "none" }}
                >
                  {isSignup ? "Login" : "Sign up"}
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
