import React, { useState } from "react";
import { Card, Form, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import maleImg from "../assets/man.jpg";
import femaleImg from "../assets/fem.jpg";

const guidesData = [
  {
    id: "ahmed",
    name: "Ahmed Al-Saud",
    city: "Riyadh",
    image: maleImg,
  },
  {
    id: "fatima",
    name: "Fatima Al-Qahtani",
    city: "Jeddah",
    image: femaleImg,
  },
  {
    id: "mohammed",
    name: "Mohammed Al-Zahrani",
    city: "Al-Ula",
    image: maleImg,
  },
  {
    id: "salma",
    name: "Salma Al-Mutairi",
    city: "Abha",
    image: femaleImg,
  },
  {
    id: "haya",
    name: "Haya Abdullah",
    city: "Tabuok",
    image: femaleImg,
  },
  {
    id: "Abdullah",
    name: "Abdullah Al-dossari",
    city: "Dammam",
    image: maleImg,
  },
];

export default function TourGuides() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const uniqueCities = [...new Set(guidesData.map((guide) => guide.city))];

  const filtered = guidesData.filter((guide) => {
    const matchesCity = selectedCity ? guide.city === selectedCity : true;
    const matchesSearch = guide.name.toLowerCase().includes(search.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <>
      
      <div style={{ backgroundColor: "#E6D9F6", padding: "60px 0" }}>
        <Container className="text-center text-dark">
          <h1 className="fw-bold mb-3">Connect with Expert Local Guides</h1>
          <p className="mb-4">
            Discover Saudi Arabia through the eyes of passionate local guides who will
            share their knowledge, stories, and hidden gems with you.
          </p>
          <Form className="d-flex justify-content-center">
            <Form.Control
              type="text"
              placeholder="Search guides by name..."
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
            <h5 className="fw-bold mb-4">{filtered.length} Guides Available</h5>
            <Row className="g-4">
              {filtered.map((guide) => (
                <Col key={guide.id} xs={12} sm={6} md={6} lg={4}>
                  <Card className="text-center shadow-sm border-0 h-100 d-flex flex-column justify-content-between p-3">
                    <div>
                      <div className="d-flex justify-content-center">
                        <img
                          src={guide.image}
                          alt={guide.name}
                          className="rounded-circle mb-3"
                          style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                      </div>
                      <Card.Title className="mb-1">{guide.name}</Card.Title>
                      <Card.Subtitle className="text-muted mb-3">{guide.city}</Card.Subtitle>
                    </div>
                    <Link to={`/tour-guides/${guide.id}`} style={{ textDecoration: "none" }}>
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
                YOU ARE NEXT! APPLY TO JOIN AS A TOUR GUIDE!
              </h4>
              <Link to="/apply">
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
                Apply
              </Button>
              </Link>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
