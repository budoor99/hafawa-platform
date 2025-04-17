import React, { useState } from "react";
import { Card, Form, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import maleImg from "../assets/man.jpg";
import femaleImg from "../assets/fem.jpg";

const hostsData = [
  {
    id: "Ahmed",
    name: "Ahmed Al-Saud",
    city: "Riyadh",
    image: maleImg,
  },
  {
    id: "fatima",
    name: "Fatima Al-Qarni",
    city: "Jeddah",
    image: femaleImg,
  },
  {
    id: "mohammed",
    name: "Mohammed Al-Zahrani",
    city: "Mecca",
    image: maleImg,
  },
  {
    id: "fahd",
    name: "Fahd Alabdullah",
    city: "Taif",
    image: maleImg,
  },
  {
    id: "nasser",
    name: "Nasser Hamad",
    city: "Janoub",
    image: maleImg,
  },
];

export default function Hosts() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const uniqueCities = [...new Set(hostsData.map((host) => host.city))];

  const filtered = hostsData.filter((host) => {
    const matchesCity = selectedCity ? host.city === selectedCity : true;
    const matchesSearch = host.name.toLowerCase().includes(search.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <>
      <div style={{ backgroundColor: "#E6D9F6", padding: "60px 0" }}>
        <Container className="text-center text-dark">
          <h1 className="fw-bold mb-3">Meet Our Local Hosts</h1>
          <p className="mb-4">
            Experience Saudi hospitality with our warm and welcoming local hosts who will
            ensure your stay is unforgettable.
          </p>
          <Form className="d-flex justify-content-center">
            <Form.Control
              type="text"
              placeholder="Search hosts by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                maxWidth: "500px",
                padding: "12px",
                fontSize: "1rem",
                borderRadius: "10px",
              }}
            />
          </Form>
        </Container>
      </div>

      <Container className="py-5">
        <Row>
          <Col md={3}>
            <h5 className="fw-bold mb-3">Filter by City</h5>
            <Form.Select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">All Cities</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={9}>
            <h5 className="fw-bold mb-4">{filtered.length} Hosts Available</h5>
            <Row className="g-4">
              {filtered.map((host) => (
                <Col key={host.id} xs={12} sm={6} md={6} lg={4}>
                  <Card className="text-center shadow-sm border-0 h-100 d-flex flex-column justify-content-between p-3">
                    <div>
                      <div className="d-flex justify-content-center">
                        <img
                          src={host.image}
                          alt={host.name}
                          className="rounded-circle mb-3"
                          style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                      </div>
                      <Card.Title className="mb-1">{host.name}</Card.Title>
                      <Card.Subtitle className="text-muted mb-3">{host.city}</Card.Subtitle>
                    </div>
                    <Link to={`/hosts/${host.id}`} style={{ textDecoration: "none" }}>
                      <Button
                        size="sm"
                        style={{
                          color: "#6A1B9A",
                          borderColor: "#6A1B9A",
                          backgroundColor: "transparent",
                        }}
                        variant="outline"
                        className="w-100"
                      >
                        View Profile
                      </Button>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>

            <Container className="text-center mt-5">
              <h4 style={{ color: "#3B9C3B", fontWeight: "bold", marginBottom: "24px" }}>
                WANT TO HOST GUESTS IN YOUR CITY?
              </h4>
              <Link to="/applyhost">
                <Button
                  variant="light"
                  style={{
                    padding: "10px 30px",
                    fontWeight: "500",
                    borderRadius: "12px",
                    backgroundColor: "#F3F1FF",
                    border: "none",
                  }}
                >
                  Become a Host
                </Button>
              </Link>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

