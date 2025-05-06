import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/contact.css";
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      setIsLoading(true);
      await sendMessage(formData);
      setSuccess(true);
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
    <div
      className="contact-page"
      style={{ backgroundColor: "#f7f5fb", padding: "60px 0" }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="p-4 bg-white rounded shadow-sm">
              <h2
                className="fw-bold text-center mb-3"
                style={{ color: "#4A148C" }}
              >
                Contact Us
              </h2>
              <p className="text-center text-muted mb-4">
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
                <div className="mb-3">
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

                <div className="mb-3">
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
                    placeholder="Enter your email..."
                    required
                  />
                </div>

                <div className="mb-3">
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

                <div className="mb-3">
                  <label className="form-label fw-semibold" htmlFor="content">
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="form-control"
                    rows="5"
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#4A148C", border: "none" }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div
                        className="spinner-border spinner-border-sm text-light"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;
