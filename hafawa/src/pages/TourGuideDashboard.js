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
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserEdit } from "react-icons/fa";

import "../styles/Profile.css";
import maleImg from "../assets/man.jpg";
import hegraImg from "../assets/hegra.jpg";
import madainImg from "../assets/madain.jpg";

const lavender = "#D6B8F9";
const darkLavender = "#B998E5";

const TourGuideDashboard = () => {
  const [guide, setGuide] = useState({
    name: "Ahmed Al-Saud",
    email: "ahmed.alsaud@example.com",
    phone: "+966-5X-XXX-XXXX",
    location: "Riyadh",
    languages: "Arabic, English, French",
    about:
      "With over 10 years of experience as a tour guide, I’m passionate about connecting people with Saudi Arabia’s culture and history. I specialize in historical sites and nature-based experiences around Al-Ula and beyond.",
    availability: [new Date()],
    activities: [
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
    ],
  });

  const [editingAbout, setEditingAbout] = useState(false);
  const [newAbout, setNewAbout] = useState(guide.about);
  const [dates, setDates] = useState(guide.availability);

  const handleEditAbout = () => {
    setGuide({ ...guide, about: newAbout });
    setEditingAbout(false);
  };

  const handleDeleteActivity = (id) => {
    setGuide((prev) => ({
      ...prev,
      activities: prev.activities.filter((a) => a.id !== id),
    }));
  };

  return (
    <div className="user-profile-wrapper" style={{ backgroundColor: "#F7F5FB", padding: "40px 0" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            
            <Card className="profile-card p-4 rounded-4 shadow-sm mb-4">
              <Row className="align-items-center">
                <Col md={3} className="text-center mb-3 mb-md-0">
                  <img src={maleImg} alt="avatar" className="profile-avatar" />
                </Col>
                <Col md={6}>
                  <h3 className="fw-bold mb-2">{guide.name}</h3>
                  <p className="text-muted mb-1">📍 {guide.location}</p>
                  <div className="text-muted small mt-2">
                    <p><FaEnvelope className="me-2" /> {guide.email}</p>
                    <p><FaPhone className="me-2" /> {guide.phone}</p>
                    <p><strong>Languages:</strong> {guide.languages}</p>
                  </div>
                </Col>
                <Col md={3} className="text-md-end text-center mt-3 mt-md-0">
                  <Button
                    style={{ backgroundColor: lavender, border: "none" }}
                    className="rounded-pill w-100"
                  >
                    <FaUserEdit className="me-2" />
                    Edit Profile
                  </Button>
                </Col>
              </Row>
            </Card>

            
            <Card className="shadow-sm border-0 p-4 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold">About Me</h5>
                <Button
                  size="sm"
                  style={{ backgroundColor: lavender, border: "none", color: "#000" }}
                  onClick={() => setEditingAbout(true)}
                >
                  Edit
                </Button>
              </div>
              <p className="text-muted">{guide.about}</p>
            </Card>

            
            <Row className="g-3 mb-5">
              <Col md={7}>
                <Card className="shadow-sm border-0 p-4 h-100">
                  <h5 className="fw-bold mb-3">My Activities</h5>
                  <Row className="g-3">
                    {guide.activities.map((activity) => (
                      <Col md={6} key={activity.id}>
                        <Card className="h-100 border-0 shadow-sm">
                          <Card.Img
                            variant="top"
                            src={activity.image}
                            style={{ height: "120px", objectFit: "cover" }}
                          />
                          <Card.Body>
                            <Card.Title>{activity.title}</Card.Title>
                            <Card.Text className="text-muted">{activity.description}</Card.Text>
                          </Card.Body>
                          <Card.Footer className="d-flex justify-content-between">
                            <Button
                              size="sm"
                              style={{ backgroundColor: lavender, border: "none" }}
                              onClick={() => handleDeleteActivity(activity.id)}
                            >
                              Delete
                            </Button>
                            <Button size="sm" style={{ backgroundColor: "#F3E9FF", border: "1px solid #ccc" }}>
                              Edit
                            </Button>
                          </Card.Footer>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <Button
                    className="mt-4 w-100"
                    style={{ backgroundColor: "#F3E9FF", border: "1px dashed #aaa" }}
                  >
                    + Add Activity
                  </Button>
                </Card>
              </Col>

              <Col md={5}>
                <Card className="shadow-sm border-0 p-4 text-center h-100">
                  <h5 className="fw-bold mb-3">My Available Dates</h5>
                  <Calendar
                    value={dates}
                    onChange={setDates}
                    tileClassName={({ date }) =>
                      dates.find((d) => new Date(d).toDateString() === date.toDateString())
                        ? "bg-primary text-white rounded"
                        : ""
                    }
                  />
                  <Button
                    className="mt-3"
                    style={{ backgroundColor: lavender, border: "none" }}
                  >
                    Edit
                  </Button>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      
      <Modal show={editingAbout} onHide={() => setEditingAbout(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit About Me</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={5}
              value={newAbout}
              onChange={(e) => setNewAbout(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#ccc", border: "none" }}
            onClick={() => setEditingAbout(false)}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: lavender, border: "none" }}
            onClick={handleEditAbout}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TourGuideDashboard;
