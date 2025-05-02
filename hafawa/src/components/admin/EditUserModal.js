import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function EditUserModal({ show, onClose, user, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    isVerified: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "user",
        isVerified: user.isVerified || false,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onSave({ ...user, ...formData });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#E6D9F6",
          borderBottom: "none",
        }}
      >
        <Modal.Title className="fw-bold" style={{ color: "#4A148C" }}>
          🛠️ Edit User
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
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Phone</Form.Label>
            <Form.Control
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Role</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="host">Host</option>
              <option value="tourguide">Tour Guide</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Form.Check
            type="checkbox"
            label="Verified"
            name="isVerified"
            checked={formData.isVerified}
            onChange={handleChange}
            className="fw-semibold"
          />
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
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
