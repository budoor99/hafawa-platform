import React, { useState, useEffect, useContext } from "react";
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
import { getUserProfile, updateUserProfile } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
      });
      setProfileData(null);
      return;
    }
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userData = await getUserProfile(token);
        setProfileData(userData);
        setFormData(userData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load user data");
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    } else {
      setProfileData(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const updatedUser = await updateUserProfile(token, formData);
      setProfileData(updatedUser);
      setLoading(false);
      setShowEdit(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading profile...</p>
        </div>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="text-center">
          <div className="text-muted mb-3">
            <i className="bi bi-person-x-fill" style={{ fontSize: "3rem" }}></i>
          </div>
          <h4>Please login to view your profile</h4>
          <p className="text-muted">
            You need to be logged in to access this page
          </p>
        </div>
      </Container>
    );
  }

  if (error && !showEdit) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="text-center">
          <div className="text-danger mb-3">
            <i
              className="bi bi-exclamation-circle-fill"
              style={{ fontSize: "3rem" }}
            ></i>
          </div>
          <h4 className="text-danger">{error}</h4>
          <p className="text-muted">Please try again later</p>
        </div>
      </Container>
    );
  }

  if (!profileData) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="text-center">
          <div className="text-muted mb-3">
            <i className="bi bi-person-x-fill" style={{ fontSize: "3rem" }}></i>
          </div>
          <h4>No user data available</h4>
          <p className="text-muted">Please login to view your profile</p>
        </div>
      </Container>
    );
  }

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
                  <h3 className="fw-bold mb-2">{profileData.name}</h3>

                  <div className="text-muted small mt-3">
                    <p>
                      <FaEnvelope className="me-2" /> {profileData.email}
                    </p>
                    <p>
                      <FaPhone className="me-2" />{" "}
                      {profileData.phone || "Not provided"}
                    </p>
                    <p>
                      <FaMapMarkerAlt className="me-2" />{" "}
                      {profileData.location || "Not provided"}
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
            {profileData.bookmarks && profileData.bookmarks.length > 0 && (
              <div className="mt-5">
                <h4 className="mb-4">My Bookmarks</h4>
                <div className="d-flex justify-content-center">
                  <DestinationCards destinations={profileData.bookmarks} />
                </div>
              </div>
            )}
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
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                value={formData.phone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                value={formData.location || ""}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEdit(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={loading}
            onClick={loading ? null : handleSave}
          >
            {loading ? (
              <Container className="w-10 h-10 d-flex justify-content-center align-items-center">
                <div className="spinner-border text-white" role="status">
                  {/* <span className="visually-hidden">Loading...</span> */}
                </div>
              </Container>
            ) : (
              "Save"
            )}
          </Button>
          {error && (
            <div className="text-danger mt-2">
              <i className="bi bi-exclamation-circle-fill"></i> {error}
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
