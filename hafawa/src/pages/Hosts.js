
import React, { useEffect, useState } from "react";
import { Card, Form, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Hosts() {
  const [hosts, setHosts] = useState([]);
  const [filteredHosts, setFilteredHosts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/hosts");
        setHosts(response.data);
        setFilteredHosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hosts:", error);
        setLoading(false);
      }
    };

    fetchHosts();
  }, []);

  useEffect(() => {
    const filtered = hosts.filter((host) => {
      const matchesCity = selectedCity ? host.city === selectedCity : true;
      const matchesSearch = host.user?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());
      return matchesCity && matchesSearch;
    });
    setFilteredHosts(filtered);
  }, [search, selectedCity, hosts]);

  const uniqueCities = [...new Set(hosts.map((host) => host.city))];

  return (
    <>
      <div style={{ backgroundColor: "#E6D9F6", padding: "60px 0" }}>
        <Container className="text-center text-dark">
          <h1 className="fw-bold mb-3">Meet Our Local Hosts</h1>
          <p className="mb-4">
            Experience Saudi hospitality with our warm and welcoming local hosts
            who will ensure your stay is unforgettable.
          </p>
          <Form className="d-flex justify-content-center">
            <Form.Control
              type="text"
              placeholder="Search hosts by name..."
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
            <h5 className="fw-bold mb-4">
              {filteredHosts.length} Hosts Available
            </h5>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <Row className="g-4">
                {filteredHosts.map((host) => (
                  <Col key={host._id} xs={12} sm={6} md={6} lg={4}>
                    <Card className="text-center shadow-sm border-0 h-100 d-flex flex-column justify-content-between p-3">
                      <div>
                        <div className="d-flex justify-content-center">
                          <img
                            src={host.profilePicture || "/default-host.jpg"} // Default image if not available
                            alt={host.user?.name}
                            className="rounded-circle mb-3"
                            style={{
                              width: "120px",
                              height: "120px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <Card.Title className="mb-1">
                          {host.user?.name}
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-3">
                          {host.city}
                        </Card.Subtitle>
                      </div>
                      <Link
                        to={`/hosts/view/${host._id}`} // Link to view details
                        style={{ textDecoration: "none" }}
                      >
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
            )}
          </Col>
        </Row>

        <div className="text-center mt-5">
          <Link to="/applyhost"> {/* Updated link to host application */}
            <Button
              style={{
                backgroundColor: "#6A1B9A",
                color: "white",
                borderRadius: "10px",
                padding: "10px 20px",
              }}
            >
              Apply to Join as a Host
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
