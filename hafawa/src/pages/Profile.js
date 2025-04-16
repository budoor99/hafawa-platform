import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserEdit,
} from "react-icons/fa";
import "../styles/Profile.css";
import userImg from "../assets/user.jpeg";
import DestinationCards from "../components/DestinationCards";
import hegraImg from "../assets/hegra.jpg";
import edgeImg from "../assets/edge.jpg";

const defaultUser = {
  name: "Ahmed",
  email: "ahmed@example.com",
  phone: "+966 500 123 456",
  location: "Riyadh, Saudi Arabia",
  
  bookmarks: [
    {
      id: "hegra",
      title: "Hegra",
      location: "Al-Ula",
      description:
        "Saudi Arabia's first UNESCO site with ancient Nabataean tombs.",
      image: hegraImg,
    },
    {
      id: "edge-of-the-world",
      title: "Edge of the World",
      location: "Riyadh",
      image: edgeImg,
      description:
        "Dramatic cliffs offering breathtaking views of the desert landscape below.",
    },
  ],
};

const Profile = () => {
  const [user, setUser] = useState(defaultUser);
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSave = () => {
    setUser(formData);
    setShowEdit(false);
  };

  return (
    <div className="user-profile-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="profile-card p-4 rounded-4 shadow-sm">
              <Row className="align-items-center">
                <Col md={3} className="text-center mb-3 mb-md-0">
                  <img src={userImg} alt="avatar" className="profile-avatar" />
                </Col>
                <Col md={6}>
                  <h3 className="fw-bold mb-2">{user.name}</h3>

                  <div className="text-muted small mt-3">
                    <p>
                      <FaEnvelope className="me-2" /> {user.email}
                    </p>
                    <p>
                      <FaPhone className="me-2" /> {user.phone}
                    </p>
                    <p>
                      <FaMapMarkerAlt className="me-2" /> {user.location}
                    </p>
                  </div>
                </Col>
                <Col md={3} className="text-md-end text-center mt-3 mt-md-0">
                  <Button
                    variant="outline-secondary"
                    className="rounded-pill mb-2"
                    onClick={() => setShowEdit(true)}
                  >
                    <FaUserEdit className="me-2" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="rounded-pill w-100 mt-2"
                  >
                    Want to become a guide?
                  </Button>
                </Col>
              </Row>
            </Card>

            {/* Bookmarks */}
            <div className="mt-5">
              <h4 className="mb-4">📌 My Bookmarks</h4>
              <div className="d-flex justify-content-center">
                <DestinationCards destinations={user.bookmarks} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
