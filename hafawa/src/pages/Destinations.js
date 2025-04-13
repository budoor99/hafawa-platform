import React, { useState } from "react"
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import hegraImg from "../assets/hegra.jpg"
import edgeImg from "../assets/edge.jpg"
import diriyahImg from "../assets/Diriyah.jpg"
import ahsaImg from "../assets/ahsa.jpg"
import farsanImg from "../assets/farsan.jpeg"

const destinationsData = [
  {
    id: "hegra",
    title: "Hegra",
    location: "Al-Ula",
    description: "Saudi Arabia's first UNESCO site with ancient Nabataean tombs.",
    image: hegraImg,
  },
  {
    id: "edge-of-the-world",
    title: "Edge of the World",
    location: "Riyadh",
    image: edgeImg,
    description: "Dramatic cliffs offering breathtaking views of the desert landscape below.",
  },
  {
    id: "diriyah",
    title: "Diriyah",
    location: "Riyadh",
    image: diriyahImg,
    description: "The birthplace of the first Saudi state with traditional mud-brick architecture.",
  },
  {
    id: "al-ahsa-oasis",
    title: "Al-Ahsa Oasis",
    location: "Eastern Province",
    image: ahsaImg,
    description: "The largest oasis in the world with over 2.5 million date palms and natural springs.",
  },
  {
    id: "farasan-islands",
    title: "Farasan Islands",
    location: "Jazan",
    image: farsanImg,
    description: "A protected marine sanctuary with pristine beaches and diverse marine life.",
  },
]

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = destinationsData.filter(
    (dest) =>
      dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Container fluid className="px-0">
      
      <div style={{ backgroundColor: "#f5f0ff", padding: "60px 20px 30px 20px" }}>
        <div className="container">
          <h2 className="fw-bold mb-3" style={{ color: "#6A1B9A" }}>
            Discover landmarks and local experiences
          </h2>
          <Form style={{ maxWidth: "400px" }}>
            <Form.Control
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>
        </div>
      </div>

      
      <div className="d-flex justify-content-center">
        <Row className="g-3 px-3 pt-4 pb-5" style={{ maxWidth: "1200px" }}>
          {filtered.map((dest) => (
            <Col key={dest.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm d-flex flex-column">
                <Card.Img
                  variant="top"
                  src={dest.image}
                  alt={dest.title}
                  style={{ height: "160px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column p-3">
                  <div className="mb-3">
                    <Card.Title className="text-truncate">{dest.title}</Card.Title>
                    <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
                      {dest.description}
                    </Card.Text>
                  </div>
                  <div className="mt-auto">
                    <Link to={`/destination/${dest.id}`}>
                      <Button
                        size="sm"
                        className="w-100"
                        style={{
                          color: "#FFFFFF",
                          backgroundColor: "#6A1B9A",
                          borderColor: "#6A1B9A",
                        }}
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  )
}
