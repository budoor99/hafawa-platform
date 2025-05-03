// ============================== Imports ==============================
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function AddTourGuideModal({
  show,
  onClose,
  onGuideAdded,
  onStatsUpdate,
}) {
  // ============================== State ==============================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    aboutMe: "",
    city: "",
    experienceYears: "",
    languages: "",
    specialRequests: "",
  });

  // ============================== Effects ==============================
  useEffect(() => {
    if (show) {
      resetForm();
    }
  }, [show]);

  // ============================== Utility functions ==============================
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      city: "",
      aboutMe: "",
      experienceYears: "",
      languages: "",
      specialRequests: "",
    });
  };

  // ============================== Handlers ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const {
      name,
      email,
      phone,
      password,
      aboutMe,
      city,
      experienceYears,
      languages,
      specialRequests,
    } = formData;

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !aboutMe ||
      !city ||
      experienceYears === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        name,
        email,
        phone,
        password,
        aboutMe,
        city,
        experienceYears: parseInt(experienceYears),
        languages: languages
          ? languages
              .split(",")
              .map((lang) => lang.trim())
              .filter(Boolean)
          : [],
        specialRequests: specialRequests
          ? specialRequests
              .split(",")
              .map((req) => req.trim())
              .filter(Boolean)
          : [],
      };

      await axios.post("/api/tour-guides/apply", payload);
      onGuideAdded?.();
      onStatsUpdate?.();
      onClose();
    } catch (err) {
      console.error("Failed to add tour guide", err);
      alert("Failed to create tour guide. Please try again.");
    }
  };

  // ============================== JSX ==============================
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header
        style={{ backgroundColor: "#E6D9F6", borderBottom: "none" }}
        closeButton
      >
        <Modal.Title className="fw-bold" style={{ color: "#4A148C" }}>
          ➕ Add Tour Guide
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pt-3 pb-0">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Phone</Form.Label>
            <Form.Control
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">City</Form.Label>
            <Form.Control
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">About Me</Form.Label>
            <Form.Control
              as="textarea"
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              rows={2}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              Languages (comma separated)
            </Form.Label>
            <Form.Control
              name="languages"
              value={formData.languages}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              Special Requests (comma separated)
            </Form.Label>
            <Form.Control
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Years of Experience</Form.Label>
            <Form.Control
              type="number"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
              min="0"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer
        className="justify-content-end px-4 pb-4 pt-3"
        style={{ borderTop: "none" }}
      >
        <Button
          onClick={onClose}
          style={{
            backgroundColor: "#E6D9F6",
            border: "none",
            color: "#4A148C",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          style={{
            backgroundColor: "#4A148C",
            border: "none",
            color: "#fff",
          }}
        >
          Add Guide
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
