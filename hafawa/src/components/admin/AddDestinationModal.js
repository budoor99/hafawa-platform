import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function AddDestinationModal({ show, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    fullDescription: "",
    imageSrc: "",
    directionsUrl: "",
    websiteUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const {
      name,
      shortDescription,
      fullDescription,
      imageSrc,
      directionsUrl,
      websiteUrl,
    } = formData;

    if (!name || !shortDescription || !fullDescription || !imageSrc) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await axios.post("/api/admin/destinations", formData);
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Failed to add destination:", err);
      alert("Something went wrong while adding the destination.");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#f4f0ff", borderBottom: "none" }}
      >
        <Modal.Title className="fw-bold" style={{ color: "#4A148C" }}>
          ➕ Add Destination
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pt-3 pb-0">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Short Description</Form.Label>
            <Form.Control
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Full Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL (imageSrc)</Form.Label>
            <Form.Control
              name="imageSrc"
              value={formData.imageSrc}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Google Maps Link (directionsUrl)</Form.Label>
            <Form.Control
              name="directionsUrl"
              value={formData.directionsUrl}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Website URL</Form.Label>
            <Form.Control
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer
        className="justify-content-end px-4 pb-4 pt-3"
        style={{ borderTop: "none" }}
      >
        <Button variant="outline-secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          style={{ backgroundColor: "#4A148C", border: "none" }}
        >
          Add Destination
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
