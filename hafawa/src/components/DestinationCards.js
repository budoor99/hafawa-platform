import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/card.css";
import { FaBookmark, FaSpinner } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  getBookmarkedDestinations,
  bookmarkDestination,
  unbookmarkDestination,
} from "../services/destinationService";

export default function DestinationCards({ destinations }) {
  const { user } = useContext(AuthContext);
  const [hovered, setHovered] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loadingBookmarks, setLoadingBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const token = localStorage.getItem("token");
      try {
        const bookmarksData = await getBookmarkedDestinations(token);
        console.log("Bookmarks data:", bookmarksData);
        setBookmarks(bookmarksData);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        setBookmarks([]);
      }
    };
    fetchBookmarks();
  }, []);

  const handleMouseEnter = (id) => {
    setHovered(id);
  };

  const handleMouseLeave = (id) => {
    setHovered(null);
  };

  const handleBookmark = async (destinationId) => {
    setLoadingBookmarks((prev) => [...prev, destinationId]);
    const token = localStorage.getItem("token");

    if (!user) {
      toast.error("Please log in to bookmark destinations");
      return;
    }

    try {
      const updatedBookmarks = await bookmarkDestination(destinationId, token);
      console.log("Updated bookmarks:", updatedBookmarks);
      setBookmarks(updatedBookmarks);
      toast.success("Destination bookmarked successfully");
    } catch (error) {
      toast.error("Failed to bookmark destination");
    }
    setLoadingBookmarks((prev) => prev.filter((id) => id !== destinationId));
  };

  const handleUnbookmark = async (destinationId) => {
    setLoadingBookmarks((prev) => [...prev, destinationId]);
    const token = localStorage.getItem("token");

    if (!user) {
      toast.error("Please log in to unbookmark destinations");
      return;
    }

    try {
      const updatedBookmarks = await unbookmarkDestination(
        destinationId,
        token
      );
      console.log("Updated bookmarks after unbookmark:", updatedBookmarks);
      setBookmarks(updatedBookmarks);
      toast.success("Destination unbookmarked successfully");
    } catch (error) {
      toast.error("Failed to unbookmark destination");
    }
    setLoadingBookmarks((prev) => prev.filter((id) => id !== destinationId));
  };

  const isBookmarked = (destinationId) => {
    // Check if the destination ID exists in the bookmarks array
    console.log(bookmarks.includes(destinationId));
    return bookmarks.includes(destinationId);
  };

  return (
    <Row
      className="g-3 px-3 pt-4 pb-5 justify-content-start"
      style={{ maxWidth: "1200px" }}
    >
      {destinations.map((dest) => (
        <Col
          key={dest._id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={{ minWidth: "250px", maxWidth: "300px" }}
        >
          <Card className="h-100 shadow-sm d-flex flex-column card-hover-lift">
            <Container className="position-relative p-0">
              <Card.Img
                variant="top"
                src={dest.imageSrc}
                alt={dest.name}
                style={{ height: "160px", objectFit: "cover" }}
              />
              {/* Bookmark Button */}
              <Container
                className="d-flex justify-content-end circle"
                style={{ color: "rgba(204, 200, 200, 0.5)" }}
              >
                <Button
                  variant="outline-secondary"
                  style={{
                    backgroundColor: "rgba(204, 200, 200, 0.5)",
                    borderColor: "rgba(204, 200, 200, 0.5)",
                    borderRadius: "50%",
                  }}
                  onClick={() => {
                    if (isBookmarked(dest._id)) {
                      handleUnbookmark(dest._id);
                    } else {
                      handleBookmark(dest._id);
                    }
                  }}
                  className="position-absolute top-0 end-0 m-2"
                >
                  {loadingBookmarks.includes(dest._id) ? (
                    <FaSpinner className="fa-spin" />
                  ) : (
                    <FaBookmark
                      style={{
                        color: isBookmarked(dest._id)
                          ? "#6A1B9A"
                          : hovered === dest._id
                          ? "rgba(111, 25, 126, 0.5)"
                          : "rgba(23, 23, 23, 0.5)",
                      }}
                      onMouseEnter={() => handleMouseEnter(dest._id)}
                      onMouseLeave={() => handleMouseLeave(dest._id)}
                    />
                  )}
                </Button>
              </Container>
            </Container>
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
