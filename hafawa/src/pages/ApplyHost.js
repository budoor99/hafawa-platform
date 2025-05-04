import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import bgImage from "../assets/hero.jpg"; //layal new
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function RegisterHost() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [customCity, setCustomCity] = useState("");

  const handleNext = () => {
    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      !phoneNumber ||
      !selectedCity ||
      (selectedCity === "Other" && !customCity)
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const city = selectedCity === "Other" ? customCity : selectedCity;

    navigate("/applyhost/details", {
      state: {
        name: fullName,
        email,
        phone: phoneNumber,
        password,
        city,
      },
    });
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
          HOST REGISTRATION
        </h2>
        <Form
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            padding: "40px",
            borderRadius: "10px",
          }}
        >
          <Row className="mb-4 align-items-stretch">
            <Col md={4} className="d-flex flex-column">
              <div
                className="flex-grow-1"
                style={{
                  border: "2px dashed #aaa",
                  padding: "20px",
                  borderRadius: "10px",
                  height: "100%",
                }}
              >
                <h6 className="fw-bold text-uppercase mb-3">
                  Personal Information
                </h6>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Type here"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-muted">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Type here"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </div>
            </Col>

            <Col md={4} className="d-flex flex-column">
              <div
                className="flex-grow-1"
                style={{
                  border: "2px dashed #aaa",
                  padding: "20px",
                  borderRadius: "10px",
                  height: "100%",
                }}
              >
                <h6 className="fw-bold text-uppercase mb-3">
                  Contact Information
                </h6>
                <Form.Group>
                  <Form.Label className="text-muted">Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
              </div>
            </Col>

            <Col md={4} className="d-flex flex-column">
              <div
                className="flex-grow-1"
                style={{
                  border: "2px dashed #aaa",
                  padding: "20px",
                  borderRadius: "10px",
                  height: "100%",
                }}
              >
                <h6 className="fw-bold text-uppercase mb-3">
                  City of Practice
                </h6>
                <Form.Group>
                  <Form.Label className="text-muted">Choose City</Form.Label>
                  <Form.Select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="">-- Select a city --</option>
                    <option>Riyadh</option>
                    <option>Jeddah</option>
                    <option>Mecca</option>
                    <option>Medina</option>
                    <option>Dammam</option>
                    <option>Al Khobar</option>
                    <option>Tabuk</option>
                    <option>Hail</option>
                    <option>Abha</option>
                    <option>Najran</option>
                    <option>Al Baha</option>
                    <option>Al Ula</option>
                    <option>Yanbu</option>
                    <option>Arar</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>
                {selectedCity === "Other" && (
                  <Form.Group className="mt-3">
                    <Form.Label className="text-muted">
                      Enter Your City
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Type your city here"
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                    />
                  </Form.Group>
                )}
              </div>
            </Col>
          </Row>

          <div className="d-flex justify-content-center gap-4">
            <Button
              variant="outline-dark"
              style={{ minWidth: "120px" }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleNext}
              style={{
                backgroundColor: "#E6D9F6",
                border: "none",
                minWidth: "120px",
              }}
            >
              Next
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
