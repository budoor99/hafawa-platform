import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Spinner } from "react-bootstrap";

export default function DestinationDetails() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/destinations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDestination(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching destination:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!destination) {
    return <p className="p-4">Destination not found.</p>;
  }

  return (
    <div className="container py-4" style={{ maxWidth: "960px" }}>
      <p className="text-uppercase text-muted mb-1" style={{ fontSize: "0.8rem" }}>
        CONTENT &gt; {destination.name?.toUpperCase()}
      </p>

      <h2 className="fw-bold mb-2" style={{ fontSize: "1.4rem" }}>
        {destination.name}
      </h2>

      {/* Save icon below title */}
      <div
        onClick={() => setSaved(!saved)}
        style={{
          cursor: "pointer",
          fontSize: "1.2rem",
          marginBottom: "1rem",
          userSelect: "none",
          width: "fit-content",
        }}
        title={saved ? "Unsave this page" : "Save this page"}
      >
        {saved ? "🔖" : "📑"}
      </div>

      <div className="row align-items-start g-3">
        {/* Left: text */}
        <div className="col-md-6">
          <p className="text-muted mb-2" style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>
            {destination.fullDescription}
          </p>
          <div className="mt-2">
            <h6 className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>
              Sources
            </h6>
            <a
              href={destination.websiteUrl}
              className="text-decoration-none"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.85rem", color: "#6A1B9A" }}
            >
              Visit Saudi ↗
            </a>
          </div>
        </div>

        {/* Right: Image + button */}
        <div className="col-md-6 d-flex flex-column align-items-center">
          <img
            src={destination.imageSrc}
            alt={destination.name}
            className="rounded mb-3"
            style={{
              width: "100%",
              maxWidth: "350px",
              height: "auto",
              objectFit: "cover",
            }}
          />

          <Card className="shadow-sm" style={{ width: "80%", maxWidth: "280px" }}>
            <Card.Body className="p-2">
              <Button
                size="sm"
                href={destination.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-100 text-white"
                style={{
                  backgroundColor: "#6A1B9A",
                  borderColor: "#6A1B9A",
                  fontSize: "0.8rem",
                  padding: "6px 12px",
                }}
              >
                GET DIRECTIONS
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
