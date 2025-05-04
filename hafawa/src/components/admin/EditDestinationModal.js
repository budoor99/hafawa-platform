import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function EditDestinationModal({
  show,
  onClose,
  destination,
  onSave,
}) {
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    fullDescription: "",
    imageSrc: "",
    directionsUrl: "",
    websiteUrl: "",
  });

  useEffect(() => {
    if (show && destination) {
      setFormData({
        name: destination.name || "",
        shortDescription: destination.shortDescription || "",
        fullDescription: destination.fullDescription || "",
        imageSrc: destination.imageSrc?.trim() || "",
        directionsUrl: destination.directionsUrl || "",
        websiteUrl: destination.websiteUrl || "",
      });
    }
  }, [show, destination]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, shortDescription, fullDescription, imageSrc } = formData;

    if (!name || !shortDescription || !fullDescription || !imageSrc) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      await axios.put(`/api/admin/destinations/${destination._id}`, formData);
      onSave?.(); // refresh list
      onClose(); // close modal
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update destination. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#E6D9F6", borderBottom: "none" }}
      >
        <Modal.Title className="fw-bold" style={{ color: "#4A148C" }}>
          ✏️ Edit Destination
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
            <Form.Label className="fw-semibold">Short Description</Form.Label>
            <Form.Control
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              required
              rows={2}
              as="textarea"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Full Description</Form.Label>
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
            <Form.Label className="fw-semibold">
              Image URL (imageSrc)
            </Form.Label>
            <Form.Control
              name="imageSrc"
              value={formData.imageSrc}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              Google Maps Link (directionsUrl)
            </Form.Label>
            <Form.Control
              name="directionsUrl"
              value={formData.directionsUrl}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Website URL</Form.Label>
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
          style={{ backgroundColor: "#4A148C", border: "none", color: "#fff" }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
