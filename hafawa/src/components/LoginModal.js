import React, { useEffect } from "react";
import "../styles/modal.css";

function LoginModal({ show, onClose }) {
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
          <button
            type="button"
            className="btn-close position-absolute end-0 m-3"
            aria-label="Close"
            onClick={onClose}
          ></button>

          <h5 className="mb-4 fw-bold text-capitalize">Login</h5>
          <form>
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
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••••••••"
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

            <p className="text-center mt-3 mb-0" style={{ fontSize: "0.9rem" }}>
              Don’t have an account?{" "}
              <a href="" className="fw-bold" style={{ color: "#9b59b6" }}>
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
