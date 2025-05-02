import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/card.css";

export default function DestinationCards({ destinations }) {
  return (
    <Row className="g-3 px-3 pt-4 pb-5" style={{ maxWidth: "1200px" }}>
      {destinations.map((dest) => (
        <Col key={dest._id} xs={12} sm={6} md={4} lg={3}>
          <Card className="h-100 shadow-sm d-flex flex-column card-hover-lift">
            <Card.Img
              variant="top"
              src={dest.imageSrc}
              alt={dest.name}
              style={{ height: "160px", objectFit: "cover" }}
            />
            <Card.Body className="d-flex flex-column p-3">
              <div className="mb-3">
                <Card.Title className="text-truncate">{dest.name}</Card.Title>
                {dest.shortDescription && (
                  <Card.Text
                    className="text-muted"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {dest.shortDescription}
                  </Card.Text>
                )}
              </div>
              <div className="mt-auto">
                <Link to={`/destinations/${dest._id}`}>
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
  );
}
