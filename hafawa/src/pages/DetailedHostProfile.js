import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";

const HostDetails = () => {
  const { id } = useParams(); // 'id' is now the HostProfile ID
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHost = async () => {
      try {
        // Make sure this URL matches the backend route
        const response = await axios.get(
          `http://localhost:5050/api/hosts/view/${id}`
        );
        setHost(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching host details:", error);
        setLoading(false);
      }
    };
    fetchHost();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!host) {
    return <div className="text-center py-5">Host not found.</div>;
  }

  return (
    <div style={{ backgroundColor: "#F7F5FB", padding: "60px 0" }}>
      <Container>
        <Card
          className="shadow-sm border-0 p-4"
          style={{ borderRadius: "16px" }}
        >
          <Row className="align-items-center">
            <Col md={4} className="text-center">
              <img
                src="https://i.postimg.cc/4NtgTkrN/E2-FA5221-6-DA4-4297-9070-EE3397-F67-A12.png"
                alt={host.user?.name}
                className="rounded-circle mb-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <h3 className="fw-bold">{host.user?.name}</h3>
              <p className="text-muted">📍 {host.city}</p>
              <p className="fw-semibold">
                Languages: {host.languages.join(", ")}
              </p>
              <p className="fw-semibold">Contact:</p>
              <p>Email: {host.user?.email}</p>
              <p>Phone: {host.user?.phone}</p>
            </Col>
            <Col md={8}>
              <h5>About Me</h5>
              <p>{host.aboutMe}</p>
              <h5>Special Requests</h5>
              <p>{host.specialRequests.join(", ")}</p>
              <h5>Availability</h5>
              <iframe
                src={
                  host.calendarUrl ||
                  "https://calendar.google.com/calendar/embed?src=en.saudi%23holiday%40group.v.calendar.google.com&ctz=Asia%2FRiyadh"
                }
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
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default HostDetails;
