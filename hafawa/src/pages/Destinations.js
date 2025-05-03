import React, { useEffect, useState } from "react";
import { Form, Container } from "react-bootstrap";
import DestinationCards from "../components/DestinationCards";
import { getAllDestinations } from "../services/destinationService";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const destinations = await getAllDestinations();
        setDestinations(destinations);
        console.log("Fetched destinations:", destinations);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, []);

  const filtered = destinations.filter((dest) =>
    dest.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container fluid className="px-0">
      <div
        style={{ backgroundColor: "#f5f0ff", padding: "60px 20px 30px 20px" }}
      >
        <div className="container text-center">
          <h2 className="fw-bold mb-3" style={{ color: "#6A1B9A" }}>
            Discover landmarks and local experiences
          </h2>
          <Form className="d-flex justify-content-center mb-2">
            <Form.Control
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                maxWidth: "400px",
                textAlign: "center",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}
            />
          </Form>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div style={{ maxWidth: "1200px", width: "100%" }}>
          <DestinationCards destinations={filtered} />
        </div>
      </div>
    </Container>
  );
}
