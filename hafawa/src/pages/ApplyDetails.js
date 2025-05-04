import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import bgImage from "../assets/hero.jpg";
import axios from "axios";

export default function RegisterDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const basicData = location.state || {};

  const [education, setEducation] = useState("");
  const [inspiration, setInspiration] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = async () => {
    if (!education || !inspiration || !experienceYears) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("/api/tour-guides/apply", {
        ...basicData,
        aboutMe: education,
        experienceYears,
      });
      setShowModal(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate("/");
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
        <h2 className="fw-bold text-center mb-5 text-dark">
          TOUR GUIDE REGISTRATION
        </h2>
        <Form
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            padding: "40px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              border: "2px dashed #aaa",
              padding: "30px",
              borderRadius: "10px",
            }}
          >
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="text-muted">
                    We’d love to learn more about you; Tell us a bit about
                    yourself.
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Type here"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="text-muted">
                    What inspired you to become a tour guide?
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Type here"
                    value={inspiration}
                    onChange={(e) => setInspiration(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="align-items-center">
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="text-muted">
                    How many years of experience do you have?
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="Type here"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-between mt-5">
              <Button
                variant="outline-dark"
                style={{ minWidth: "120px" }}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>

              <Button
                style={{
                  backgroundColor: "#E6D9F6",
                  border: "none",
                  minWidth: "120px",
                }}
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Form>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header
            closeButton
            style={{
              backgroundColor: "#E6D9F6",
              borderBottom: "none",
            }}
          >
            <Modal.Title className="fw-bold" style={{ color: "#4A148C" }}>
              🎉 Registration Complete!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p
              className="mb-3"
              style={{ fontSize: "1.1rem", color: "#4A148C" }}
            >
              Thank you for applying to become a tour guide with us.
            </p>
            <p className="text-muted mb-0">
              Your information has been received successfully. Our team will
              review your application and get in touch with you soon.
            </p>
          </Modal.Body>
          <Modal.Footer
            className="justify-content-center"
            style={{ borderTop: "none" }}
          >
            <Button
              onClick={handleClose}
              style={{
                backgroundColor: "#E6D9F6",
                border: "none",
                padding: "10px 30px",
                fontWeight: "500",
                color: "#4A148C",
              }}
            >
              Go to Home
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
