import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/hero.jpg";
import axios from "axios";

export default function ApplyHost() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) newErrors[key] = `${key} is required.`;
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("/applyhost", formData);
      setShowModal(true); // Show success modal
    } catch (error) {
      console.error("Failed to submit details:", error);
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate("/"); // Redirect to home or another page
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "60px 0",
      }}
    >
      <Container>
        <h2 className="fw-bold text-center mb-5 text-dark"> Welcome to</h2>
        <Form onSubmit={handleSubmit} style={{ backgroundColor: "rgba(255, 255, 255, 0.85)", padding: "40px", borderRadius: "10px" }}>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control name="fullName" value={formData.fullName} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" value={formData.password} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" value={formData.role} onChange={handleChange} required>
                  <option value="">Select a role</option>
                  <option value="Host">Host</option>
                  <option value="TourGuide">TourGuide</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className="text-center">
            <Button type="submit" style={{ backgroundColor: "#E6D9F6", border: "none" }}>
              Confirm
            </Button>
          </div>
        </Form>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton style={{ backgroundColor: "#E6D9F6", borderBottom: "none" }}>
            <Modal.Title className="fw-bold" style={{ color: "#4A148C" }}>
              🎉 Registration Complete!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p className="mb-3" style={{ fontSize: "1.1rem", color: "#4A148C" }}>
              Thank you for applying to become a host with us.
            </p>
            <p className="text-muted mb-0">
              Your information has been received successfully. Our team will review your application and get in touch soon.
            </p>
          </Modal.Body>
          <Modal.Footer className="justify-content-center" style={{ borderTop: "none" }}>
            <Button onClick={handleClose} style={{ backgroundColor: "#E6D9F6", border: "none", fontWeight: "500", color: "#4A148C" }}>
              Go to Home
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}