import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function SendEmailModal({ show, onClose, recipientEmail }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSend = async () => {
    try {
      setSending(true);
      await axios.post("/api/admin/send-email", {
        to: recipientEmail,
        subject,
        message,
      });
      setFeedback("Email sent successfully!");
      setSubject("");
      setMessage("");
      setTimeout(() => setFeedback(""), 3000); // Optional: clear message after a few seconds
    } catch (err) {
      console.error("Email error", err);
      setFeedback("Failed to send email.");
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    setSubject("");
    setMessage("");
    setFeedback("");
    setSending(false);
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#E6D9F6", borderBottom: "none" }}
      >
        <Modal.Title className="fw-bold" style={{ color: "#4A148C" }}>
          ✉️ Send Message
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pt-3 pb-0">
        <Form>
          <Form.Group controlId="emailTo" className="mb-3">
            <Form.Label className="fw-semibold">To</Form.Label>
            <Form.Control type="email" value={recipientEmail} disabled />
          </Form.Group>

          <Form.Group controlId="emailSubject" className="mb-3">
            <Form.Label className="fw-semibold">Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setFeedback("");
              }}
            />
          </Form.Group>

          <Form.Group controlId="emailMessage" className="mb-3">
            <Form.Label className="fw-semibold">Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Write your message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setFeedback("");
              }}
            />
          </Form.Group>
        </Form>

        {feedback && (
          <p className="text-center mt-2 text-secondary">{feedback}</p>
        )}
      </Modal.Body>

      <Modal.Footer
        className="justify-content-end px-4 pb-4 pt-3"
        style={{ borderTop: "none" }}
      >
        <Button
          onClick={handleClose}
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
          onClick={handleSend}
          disabled={sending || !subject.trim() || !message.trim()}
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
          {sending ? "Sending..." : "Send"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
