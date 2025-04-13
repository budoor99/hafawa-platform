import React, { useEffect } from "react";
import "../styles/modal.css";

function SignupModal({ show, onClose, onSwitchToSignup }) {
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  if (!show) return null;

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
          {/* Close button */}
          <button
            type="button"
            className="btn-close position-absolute end-0 m-3"
            aria-label="Close"
            onClick={onClose}
          ></button>

          {/* Modal title */}
          <h5 className="mb-4 fw-bold text-capitalize">Sign up</h5>

          {/* Sign Up form */}
          <form>
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name..."
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Email address <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address..."
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Phone number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter your phone number..."
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••••••••"
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Confirm password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••••••••"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              onClick={onSwitchToSignup}
              className="btn w-100 text-white"
              style={{
                backgroundColor: "#9b59b6",
                borderRadius: "6px",
              }}
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;
