// ============================== Imports ==============================
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// ============================== Component ==============================
export default function EditUserModal({ show, onClose, user, onSave }) {
  // ============================== State ==============================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    isVerified: false,
  });

  const [city, setCity] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [selectedRole, setSelectedRole] = useState("user");
  const [languages, setLanguages] = useState([]);
  const [specialRequests, setSpecialRequests] = useState([]);
  const [experienceYears, setExperienceYears] = useState("");

  // ============================== Effects ==============================
  useEffect(() => {
    if (user) {
      const role = user.role || "user";
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role,
        isVerified: user.isVerified || false,
      });
      setSelectedRole(role);
      setCity(user.city || "");
      setAboutMe(user.aboutMe || "");
      setLanguages(user.languages || []);
      setSpecialRequests(user.specialRequests || []);
      setExperienceYears(user.experienceYears || "");
    }
  }, [user]);

  // ============================== Handlers ==============================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    console.log(user._id);

    const isUpgradingToHost = user.role !== "host" && formData.role === "host";
    const isUpgradingToGuide =
      user.role !== "tourguide" && formData.role === "tourguide";
    const isExistingTourGuide =
      user.role === "tourguide" && formData.role === "tourguide";
    const isExistingHost = user.role === "host" && formData.role === "host";

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required user fields.");
      return;
    }

    if (
      (selectedRole === "host" || selectedRole === "tourguide") &&
      (!city || !aboutMe || !languages.length || experienceYears === "")
    ) {
      alert("Please fill in all required profile fields.");
      return;
    }

    if (isUpgradingToHost) {
      onSave({
        upgradeTo: "host",
        userId: user._id,
        city,
        aboutMe,
        languages,
        specialRequests,
        experienceYears,
      });
    } else if (isUpgradingToGuide) {
      onSave({
        upgradeTo: "tourguide",
        userId: user._id,
        city,
        aboutMe,
        languages,
        specialRequests,
        experienceYears,
      });
    } else if (isExistingHost || isExistingTourGuide) {
      onSave({
        _id: user._id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        isVerified: formData.isVerified,
        role: formData.role,
        city,
        aboutMe,
        languages,
        specialRequests,
        experienceYears,
      });
    } else {
      onSave({
        ...user,
        ...formData,
      });
    }
  };

  // ============================== JSX ==============================
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#E6D9F6", borderBottom: "none" }}
      >
        <Modal.Title className="fw-bold" style={{ color: "#4A148C" }}>
          🛠️ Edit User
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pt-3 pb-0">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-dark">Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-dark">Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-dark">Phone</Form.Label>
            <Form.Control
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-dark">Role</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({ ...prev, role: value }));
                setSelectedRole(value);
              }}
              required
            >
              <option value="user">User</option>
              <option value="host">Host</option>
              <option value="tourguide">Tour Guide</option>
            </Form.Select>
          </Form.Group>

          {(selectedRole === "host" || selectedRole === "tourguide") && (
            <>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-dark">City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-dark">
                  About Me
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-dark">
                  Languages (comma separated)
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., Arabic, English"
                  value={languages.join(", ")}
                  onChange={(e) =>
                    setLanguages(
                      e.target.value.split(",").map((lang) => lang.trim())
                    )
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-dark">
                  Special Requests (comma separated)
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., No smoking, No pets"
                  value={specialRequests.join(", ")}
                  onChange={(e) =>
                    setSpecialRequests(
                      e.target.value.split(",").map((req) => req.trim())
                    )
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-dark">
                  Years of Experience
                </Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  required
                />
              </Form.Group>
            </>
          )}

          <Form.Check
            type="checkbox"
            label="Verified"
            name="isVerified"
            checked={formData.isVerified}
            onChange={handleChange}
            className="fw-semibold mt-2"
            required
          />
        </Form>
      </Modal.Body>

      <Modal.Footer
        className="justify-content-end px-4 pb-4 pt-3"
        style={{ borderTop: "none" }}
      >
        <Button
          onClick={onClose}
          style={{
            backgroundColor: "#E6D9F6",
            border: "none",
            padding: "6px 20px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#4A148C",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          style={{
            backgroundColor: "#4A148C",
            border: "none",
            padding: "6px 20px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#fff",
            marginLeft: "10px",
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
