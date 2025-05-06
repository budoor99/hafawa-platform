

import React, { useEffect, useState } from "react";
import { Card, Form, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.jpg";

export default function TourGuides() {
  const [guides, setGuides] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("http://localhost:5050/api/tour-guides")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched guides:", data);
        setGuides(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const uniqueCities = [...new Set(guides.map((g) => g.city).filter(Boolean))];

  const filtered = guides.filter((guide) => {
    const matchesCity = selectedCity ? guide.city === selectedCity : true;
    const matchesSearch = guide.name.toLowerCase().includes(search.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "60px 0",
        }}
      >
        <Container className="text-center text-dark">
          <h1 className="fw-bold mb-3" style={{ color: "#6A1B9A" }}>
            Connect with Expert Local Guides
          </h1>
          <p className="mb-4" style={{ color: "#6A1B9A" }}>
            Discover Saudi Arabia through the eyes of passionate local guides.
          </p>
          <Form className="d-flex justify-content-center">
            <Form.Control
              type="text"
              placeholder="Search guides by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: "500px", padding: "12px", borderRadius: "10px" }}
            />
          </Form>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-5">
        <Row>
          {/* Left Column: Filter + Apply */}
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

            <div className="mt-5 text-start">
              <h5
                style={{
                  color: "black", // Updated color to black
                  fontWeight: "bold",
                  marginBottom: "16px",
                }}
              >
                💡 You can be our next Tour Guide!
              </h5>
              <Link to="/apply">
                <Button
                  variant="light"
                  style={{
                    padding: "10px 30px",
                    fontWeight: "500",
                    borderRadius: "12px",
                    backgroundColor: "#6A1B9A", // Updated color for button
                    border: "none",
                    color: "white", // Text color for button
                  }}
                >
                  Apply Now
                </Button>
              </Link>
            </div>
          </Col>

          {/* Right Column: Tour Guides */}
          <Col md={9}>
            <h5 className="fw-bold mb-4">{filtered.length} Guides Available</h5>
            <Row className="g-4">
              {filtered.map((guide) => (
                <Col key={guide._id} xs={12} sm={6} md={6} lg={4}>
                  <Card className="text-center shadow-sm border-0 h-100 d-flex flex-column justify-content-between p-3">
                    <div>
                      <div className="d-flex justify-content-center">
                        <img
                          src="https://i.postimg.cc/4NtgTkrN/E2-FA5221-6-DA4-4297-9070-EE3397-F67-A12.png" // Static image URL for all guides
                          alt={guide.name}
                          className="rounded-circle mb-3"
                          style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                      </div>
                      <Card.Title className="mb-1">{guide.name}</Card.Title>
                      <Card.Subtitle className="text-muted mb-3">{guide.city}</Card.Subtitle>
                    </div>
                    <Link to={`/tour-guides/${guide._id}`} style={{ textDecoration: "none" }}>
                      <Button
                        size="sm"
                        style={{
                          color: "#6A1B9A", // Button color
                          borderColor: "#6A1B9A",
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
          </Col>
        </Row>
      </Container>
    </>
  );
}