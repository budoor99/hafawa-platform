import React, { useState } from "react";
import "../styles/contact.css"; // We'll create this CSS file next
import { sendMessage } from "../services/messageService";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    content: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      setIsLoading(true);
      await sendMessage(formData);
      setSuccess(true);
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        content: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setError(
        error.response?.data?.message ||
          "Failed to send message. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="content-container">
        <div className="main-content">
          <h2>Contact Us</h2>
          <p className="subtitle">
            Have questions or need assistance? Reach out to our team.
          </p>

          {success && (
            <div className="alert alert-success" role="alert">
              Thank you for your message! We will contact you soon.
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label className="form-label fw-semibold" htmlFor="name">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your full name..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label fw-semibold" htmlFor="email">
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your email address..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label fw-semibold" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your phone number..."
              />
            </div>

            <div className="form-group">
              <label className="form-label fw-semibold" htmlFor="content">
                Message <span className="text-danger">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="form-control"
                placeholder="Type your message here..."
                required
                rows="5"
              ></textarea>
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner-border text-white" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "SEND MESSAGE"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;