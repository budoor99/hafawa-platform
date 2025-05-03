// ============================== Imports ==============================
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

// ============================== Component ==============================
export default function AddUserModal({
  show,
  onClose,
  onUserAdded,
  onStatsUpdate,
}) {
  // ============================== State ==============================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    isVerified: true,
  });

  // ============================== Handlers ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/auth/signup", formData);
      onUserAdded?.();
      onStatsUpdate?.();
      onClose();
    } catch (err) {
      console.error("Failed to add user", err);
      alert("Failed to create user. Please try again.");
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
          ➕ Add New User
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
              placeholder="Enter name"
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
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Phone</Form.Label>
            <Form.Control
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
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
              placeholder="Enter password"
              required
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
            padding: "6px 20px",
            fontSize: "0.9rem",
            fontWeight: "500",
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
            padding: "6px 20px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#fff",
            marginLeft: "10px",
          }}
        >
          Add User
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
