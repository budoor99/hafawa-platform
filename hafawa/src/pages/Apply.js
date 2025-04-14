import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import bgImage from "../assets/hero.jpg"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function RegisterTourGuide() {

    const navigate = useNavigate();

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
        <h2 className="fw-bold text-center mb-5 text-dark">TOUR GUIDE REGISTRATION</h2>
        <Form style={{ backgroundColor: "rgba(255, 255, 255, 0.85)", padding: "40px", borderRadius: "10px" }}>
          <Row className="mb-4 align-items-stretch">
            
            <Col md={4} className="d-flex flex-column">
              <div
                className="flex-grow-1"
                style={{ border: "2px dashed #aaa", padding: "20px", borderRadius: "10px", height: "100%" }}
              >
                <h6 className="fw-bold text-uppercase mb-3">Personal Information</h6>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted">Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Type here" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted">Username</Form.Label>
                  <Form.Control type="text" placeholder="Type here" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted">Email</Form.Label>
                  <Form.Control type="email" placeholder="Type here" />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-muted">Password</Form.Label>
                  <Form.Control type="password" placeholder="Type here" />
                </Form.Group>
              </div>
            </Col>

            
            <Col md={4} className="d-flex flex-column">
              <div
                className="flex-grow-1"
                style={{ border: "2px dashed #aaa", padding: "20px", borderRadius: "10px", height: "100%" }}
              >
                <h6 className="fw-bold text-uppercase mb-3">Contact Information</h6>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted">Email</Form.Label>
                  <Form.Control type="email" placeholder="Type here" />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-muted">Phone Number</Form.Label>
                  <Form.Control type="text" placeholder="Type here" />
                </Form.Group>
              </div>
            </Col>

            
            <Col md={4} className="d-flex flex-column">
              <div
                className="flex-grow-1"
                style={{ border: "2px dashed #aaa", padding: "20px", borderRadius: "10px", height: "100%" }}
              >
                <h6 className="fw-bold text-uppercase mb-3">City of Practice</h6>
                <Form.Group>
                  <Form.Label className="text-muted">Choose City</Form.Label>
                  <Form.Select>
                    <option>RIYADH</option>
                    <option>EASTERN PROVINCE</option>
                    <option>JEDDAH</option>
                    <option>AL-ULA</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </Col>
          </Row>

          
          <div className="d-flex justify-content-center gap-4">
          <Button variant="outline-dark" style={{ minWidth: "120px" }} onClick={() => navigate(-1)} 
          >Cancel 
          </Button>
            <Link to="/apply/details">
            <Button
              style={{
                backgroundColor: "#E6D9F6",
                border: "none",
                minWidth: "120px",
              }}
            >
              Next
            </Button>
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}
