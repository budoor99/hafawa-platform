import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import heroImg from "../assets/hero.jpg";
import fem from "../assets/fem.jpg";
import male from "../assets/man.jpg";


export default function TourGuideProfile() {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5050/api/tour-guides/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => setGuide(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div className="text-danger text-center mt-5">❌ Error: {error}</div>;
  if (!guide) return <div className="text-center mt-5">⏳ Loading...</div>;

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "60px 0"
      }}
    >
      <Container>
        <Card className="shadow-lg p-4 border-0" style={{ borderRadius: "16px" }}>
          <Row className="mb-4">
            <Col md={8}>
              <img
                src={male}
                alt={guide.name}
                className="rounded-circle mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <h2 className="fw-bold mb-2">👤 {guide.user.name}</h2>
              <p><strong>📧 Email:</strong> {guide.user.email}</p>
              <p><strong>📍 City:</strong> {guide.city}</p>
              <p><strong>🗣️ Languages:</strong> {(guide.languages || []).join(", ")}</p>
              <p><strong>🧳 Experience:</strong> {guide.experienceYears} years</p>
              <p><strong>📝 About Me:</strong> {guide.aboutMe}</p>
              <p><strong>🏞️ Activities:</strong> {(guide.activities || []).join(", ")}</p>
              <p><strong>📌 Special Requests:</strong> {(guide.specialRequests || []).join(", ")}</p>
            </Col>

          </Row>

          {guide.calendarUrl && (
            <>
              <h5 className="fw-bold mt-4">📅 Availability Calendar</h5>
              <iframe
                src={guide.calendarUrl}
                style={{ border: 0, width: "100%", height: "400px", borderRadius: "10px" }}
                frameBorder="0"
                scrolling="no"
                title="Tour Guide Calendar"
              ></iframe>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
}
