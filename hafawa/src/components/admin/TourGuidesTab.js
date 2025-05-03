// ============================== Imports ==============================
import React, { useEffect, useState } from "react";
import { Card, Table, Badge, Form, Button, Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical, BsPersonCircle } from "react-icons/bs";
import SendEmailModal from "./SendEmailModal";
import EditUserModal from "./EditUserModal";
import AddTourGuideModal from "./AddTourGuideModal";
import axios from "axios";

// ============================== Helpers ==============================
const getStatusText = (isVerified) => (isVerified ? "Active" : "Inactive");

const getStatusVariant = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "danger";
    default:
      return "secondary";
  }
};

export default function TourGuidesTab({ onStatsUpdate }) {
  // ============================== State ==============================
  const [guides, setGuides] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const guidesPerPage = 5;

  // ============================== Effects ==============================
  useEffect(() => {
    fetchGuides();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // ============================== Data Fetch ==============================
  const fetchGuides = () => {
    axios
      .get("/api/admin/tour-guides")
      .then((res) => setGuides(res.data))
      .catch((err) => console.error("Failed to fetch tour guides", err));
  };

  // ============================== Derived Data ==============================
  const filteredGuides = guides.filter(
    (g) =>
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLast = currentPage * guidesPerPage;
  const indexOfFirst = indexOfLast - guidesPerPage;
  const currentGuides = filteredGuides.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredGuides.length / guidesPerPage);

  // ============================== Handlers ==============================
  const handleActivate = async (id) => {
    try {
      await axios.patch(`/api/admin/tour-guides/${id}/activate`);
      await fetchGuides();
      onStatsUpdate?.();
    } catch (err) {
      console.error("Failed to activate guide", err);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await axios.patch(`/api/admin/tour-guides/${id}/deactivate`);
      await fetchGuides();
      onStatsUpdate?.();
    } catch (err) {
      console.error("Failed to deactivate guide", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this guide?"
    );
    if (!confirmed) return;
    try {
      await axios.delete(`/api/admin/users/delete/${id}`);
      fetchGuides();
      onStatsUpdate?.();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSaveEdit = async (guideData) => {
    try {
      await axios.put(`/api/admin/tour-guides/${guideData._id}`, guideData);
      await fetchGuides();
      setShowEditModal(false);
      onStatsUpdate?.();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update tour guide!");
    }
  };

  const openEmailModal = (email) => {
    setSelectedUserEmail(email);
    setShowEmailModal(true);
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
    setSelectedUserEmail(null);
  };

  const openEditModal = (guide) => {
    setSelectedUser(guide);
    setShowEditModal(true);
  };

  // ============================== JSX ==============================
  return (
    <Card className="p-4 shadow-sm">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold">Tour Guide Management</h4>
          <p className="text-muted">
            Manage registered tour guides and their accounts
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="position-relative" style={{ maxWidth: "280px" }}>
            <i
              className="bi bi-search position-absolute top-50 start-0 translate-middle-y text-muted"
              style={{ left: "12px", fontSize: "16px" }}
            />
            <Form.Control
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: "2.2rem" }}
            />
          </div>

          <Button className="btn-purple" onClick={() => setShowAddModal(true)}>
            <i className="bi bi-person-plus me-2" />
            Add Tour guide
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table hover responsive className="custom-table">
        <thead>
          <tr>
            <th>Guide</th>
            <th>City</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentGuides.map((g) => (
            <tr key={g._id} className="align-middle">
              <td>
                <div className="d-flex align-items-center">
                  <BsPersonCircle size={40} className="me-3 text-secondary" />
                  <div>
                    <div className="fw-semibold">{g.name}</div>
                    <div className="text-muted small">{g.email}</div>
                  </div>
                </div>
              </td>
              <td>{g.city}</td>
              <td>
                <Badge
                  bg={getStatusVariant(getStatusText(g.isVerified))}
                  className="px-2 py-1"
                >
                  {getStatusText(g.isVerified)}
                </Badge>
              </td>
              <td className="text-end">
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" className="text-muted p-0">
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => openEditModal(g)}>
                      Edit Guide
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => openEmailModal(g.email)}>
                      Send Message
                    </Dropdown.Item>
                    {g.isVerified ? (
                      <Dropdown.Item
                        className="text-danger"
                        onClick={() => handleDeactivate(g._id)}
                      >
                        Deactivate
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item
                        className="text-success"
                        onClick={() => handleActivate(g._id)}
                      >
                        Activate
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => handleDelete(g._id)}
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-between mt-3 align-items-center">
        <small className="text-muted">
          Showing {indexOfFirst + 1}–
          {Math.min(indexOfLast, filteredGuides.length)} of{" "}
          {filteredGuides.length} tour guides
        </small>

        <div className="pagination gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={currentPage === 1}
            style={{ borderRadius: "8px" }}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
              style={{
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                backgroundColor: currentPage === i + 1 ? "#f4f0ff" : "white",
                color: "#000",
              }}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline-secondary"
            size="sm"
            disabled={currentPage === totalPages}
            style={{ borderRadius: "8px" }}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modals */}
      <SendEmailModal
        show={showEmailModal}
        onClose={closeEmailModal}
        recipientEmail={selectedUserEmail}
      />
      <EditUserModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={selectedUser}
        onSave={handleSaveEdit}
      />
      <AddTourGuideModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onGuideAdded={fetchGuides}
        onStatsUpdate={onStatsUpdate}
      />
    </Card>
  );
}
