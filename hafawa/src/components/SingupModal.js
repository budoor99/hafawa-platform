import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/modal.css";

function SignupModal({ show, onClose, onSignupSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // feedback message
  const [message, setMessage] = useState("");

  // reset form when modal opens
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";

    if (show) {
      setMessage("");
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [show]);

  if (!show) return null;

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("/api/auth/signup", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      setMessage(res.data.message || "Signup successful!");
      onSignupSuccess();
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed.";
      setMessage(msg);
    }
  };

  return (
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

          <h5 className="mb-4 fw-bold text-capitalize">Sign up</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter your name..."
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Email address <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email address..."
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Phone number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                placeholder="Enter your phone number..."
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="••••••••••••••"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Confirm password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                placeholder="••••••••••••••"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 text-white"
              style={{
                backgroundColor: "#9b59b6",
                borderRadius: "6px",
              }}
            >
              SIGN UP
            </button>
            <p
              className="mt-3 text-center fw-semibold"
              style={{
                color: message.includes("successful") ? "green" : "red",
              }}
            >
              {message}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;
