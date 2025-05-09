import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Spinner } from "react-bootstrap";
import { FaBookmark, FaSpinner } from "react-icons/fa";
import {
  bookmarkDestination,
  unbookmarkDestination,
  getBookmarkedDestinations,
} from "../services/destinationService";
export default function DestinationDetails() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkIsLoading, setBookmarkIsLoading] = useState(false);
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
    const token = localStorage.getItem("token");
    if (token) {
      getBookmarkedDestinations(token).then((data) => {
        setBookmarked(data.includes(id));
      });
    }
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

  const handleBookmarkClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setBookmarkIsLoading(true);
      if (bookmarked) {
        unbookmarkDestination(id, token);
      } else {
        bookmarkDestination(id, token);
      }
      setBookmarked(!bookmarked);
      setBookmarkIsLoading(false);
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "960px" }}>
      <p
        className="text-uppercase text-muted mb-1"
        style={{ fontSize: "0.8rem" }}
      >
        CONTENT &gt; {destination.name?.toUpperCase()}
      </p>

      <h2 className="fw-bold mb-2" style={{ fontSize: "1.4rem" }}>
        {destination.name}
      </h2>

      {/* Save icon below title */}
      <div className="d-flex justify-content-start mb-2">
        {bookmarkIsLoading ? (
          <FaSpinner className="fa-spin" />
        ) : (
          <FaBookmark
            onClick={handleBookmarkClick}
            style={{
              cursor: "pointer",
              color: bookmarked ? "#6A1B9A" : "rgba(23, 23, 23, 0.5)",
            }}
          />
        )}
      </div>

      <div className="row align-items-start g-3">
        {/* Left: text */}
        <div className="col-md-6">
          <p
            className="text-muted mb-2"
            style={{ fontSize: "0.9rem", lineHeight: "1.5" }}
          >
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
              Read more ↗
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

          <Card
            className="shadow-sm"
            style={{ width: "80%", maxWidth: "280px" }}
          >
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
