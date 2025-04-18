import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import maleImg from "../assets/man.jpg";


import hegraImg from "../assets/hegra.jpg";
import madainImg from "../assets/madain.jpg";

export default function TourGuideProfile() {

  const activities = [
    {
      id: 1,
      title: "Hegra",
      description: "Saudi Arabia’s first UNESCO site with ancient Nabataean tombs.",
      image: hegraImg,
    },
    {
      id: 2,
      title: "Madain Saleh",
      description: "Ancient stone-carved city in Al-Ula.",
      image: madainImg,
    },
  ];

  return (
    <div style={{ backgroundColor: "#F7F5FB", minHeight: "100vh", padding: "60px 0" }}>
      <Container className="d-flex justify-content-center">
        <div style={{ width: "100%", maxWidth: "1000px" }}>
          
          <Card className="shadow-sm border-0 p-4 mb-4" style={{ borderRadius: "16px" }}>
            <Row className="align-items-center">
              
              <Col md={6} className="d-flex align-items-center gap-4">
                <img
                  src={maleImg}
                  alt="Ahmed Al-Saud"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "3px solid #eee",
                  }}
                />
                <div>
                  <h4 className="fw-bold mb-1">Ahmed Al-Saud</h4>
                  <p className="text-muted mb-0">📍 Riyadh</p>
                </div>
              </Col>

              
              <Col md={6}>
                <div>
                  <p className="fw-semibold mb-1">Languages</p>
                  <p className="mb-3">Arabic, English, French</p>

                  <p className="fw-semibold mb-1">Contact</p>
                  <p className="mb-0">ahmed.alsaud@example.com</p>
                  <p className="mb-0">+966-5X-XXX-XXXX</p>
                </div>
              </Col>
            </Row>
          </Card>

          
          <Row className="g-4">
            
            <Col md={8}>
              <Card className="shadow-sm border-0 p-4" style={{ borderRadius: "16px", height: "100%" }}>
                <h5 className="fw-bold mb-3">About Me</h5>
                <p style={{ fontSize: "1rem", lineHeight: "1.8" }}>
                  With over a decade of experience as a tour guide, I've had the privilege of sharing Saudi Arabia's
                  rich cultural heritage with visitors from around the world. My academic background in archaeology and
                  history allows me to provide deep insights into the historical significance of each site we visit. I
                  believe that understanding our past is key to appreciating our present and shaping our future. My
                  tours are designed to be educational, engaging, and memorable, with a focus on creating authentic
                  connections between visitors and our heritage.
                </p>
              </Card>
            </Col>

            
            <Col md={4}>
              <Card className="shadow-sm border-0 p-4" style={{ borderRadius: "16px", height: "100%" }}>
                <h5 className="fw-bold mb-3">Availability</h5>
                <iframe
                  src="https://calendar.google.com/calendar/embed?src=en.saudi%23holiday%40group.v.calendar.google.com&ctz=Asia%2FRiyadh"
                  style={{
                    border: 0,
                    width: "100%",
                    height: "300px",
                    borderRadius: "10px",
                  }}
                  frameBorder="0"
                  scrolling="no"
                  title="availability-calendar"
                ></iframe>
              </Card>
            </Col>
          </Row>


          <Card className="shadow-sm border-0 p-4 mt-2" style={{ borderRadius: "16px" }}>
            <h5 className="fw-bold mb-4">Activities</h5>
            <Row className="g-4">
              {activities.map((activity) => (
                <Col md={6} key={activity.id}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={activity.image}
                      style={{
                        height: "160px",
                        objectFit: "cover",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{activity.title}</Card.Title>
                      <Card.Text className="text-muted">{activity.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>


          

          
        </div>
      </Container>
    </div>
  );
}
