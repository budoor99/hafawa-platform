// ============================== Imports ==============================
import React, { useState, useEffect } from "react";
import { Card, Table, Badge, Form, Button, Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical, BsPersonCircle } from "react-icons/bs";
import axios from "axios";
import SendEmailModal from "./SendEmailModal";
import EditUserModal from "./EditUserModal";
import GenericProfileModal from "./GenericProfileModal";

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

export default function HostsTab({ onStatsUpdate }) {
  const [hosts, setHosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const hostsPerPage = 5;

  // ============================== Effects ==============================
  useEffect(() => {
    fetchHosts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // ============================== Data Fetch ==============================
  const fetchHosts = () => {
    axios
      .get("/api/admin/hosts")
      .then((res) => setHosts(res.data))
      .catch((err) => console.error("Failed to fetch hosts", err));
  };

  // ============================== Handlers ==============================
  const handleActivate = async (id) => {
    try {
      await axios.patch(`/api/admin/hosts/${id}/activate`);
      await fetchHosts();
      onStatsUpdate?.();
    } catch (err) {
      console.error("Failed to activate host", err);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await axios.patch(`/api/admin/hosts/${id}/deactivate`);
      await fetchHosts();
      onStatsUpdate?.();
    } catch (err) {
      console.error("Failed to deactivate host", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this host?"
    );
    if (!confirmed) return;
    try {
      await axios.delete(`/api/admin/users/delete/${id}`);
      fetchHosts();
      onStatsUpdate?.();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSaveEdit = async (hostData) => {
    try {
      await axios.put(`/api/admin/hosts/${hostData._id}`, hostData);
      await fetchHosts();
      setShowEditModal(false);
      onStatsUpdate?.();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update host!");
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

  const openEditModal = (host) => {
    setSelectedUser(host);
    setShowEditModal(true);
  };

  // ============================== Pagination Logic ==============================
  const filteredHosts = hosts.filter(
    (h) =>
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLast = currentPage * hostsPerPage;
  const indexOfFirst = indexOfLast - hostsPerPage;
  const currentHosts = filteredHosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredHosts.length / hostsPerPage);

  // ============================== JSX ==============================
  return (
    <Card className="p-4 shadow-sm">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold">Host Management</h4>
          <p className="text-muted">
            Manage registered hosts and their accounts
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
              placeholder="Search hosts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: "2.2rem" }}
            />
          </div>
          <Button className="btn-purple" onClick={() => setShowAddModal(true)}>
            <i className="bi bi-person-plus me-2" />
            Add Host
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table hover responsive className="custom-table">
        <thead>
          <tr>
            <th>Host</th>
            <th>City</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentHosts.map((h) => (
            <tr key={h._id} className="align-middle">
              <td>
                <div className="d-flex align-items-center">
                  <BsPersonCircle size={40} className="me-3 text-secondary" />
                  <div>
                    <div className="fw-semibold">{h.name}</div>
                    <div className="text-muted small">{h.email}</div>
                  </div>
                </div>
              </td>
              <td>{h.city}</td>
              <td>
                <Badge
                  bg={getStatusVariant(getStatusText(h.isVerified))}
                  className="px-2 py-1"
                >
                  {getStatusText(h.isVerified)}
                </Badge>
              </td>
              <td className="text-end">
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" className="text-muted p-0">
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => openEditModal(h)}>
                      Edit Host
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => openEmailModal(h.email)}>
                      Send Message
                    </Dropdown.Item>
                    {h.isVerified ? (
                      <Dropdown.Item
                        className="text-danger"
                        onClick={() => handleDeactivate(h._id)}
                      >
                        Deactivate
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item
                        className="text-success"
                        onClick={() => handleActivate(h._id)}
                      >
                        Activate
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => handleDelete(h._id)}
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
          {Math.min(indexOfLast, filteredHosts.length)} of{" "}
          {filteredHosts.length} hosts
        </small>

        <div className="pagination gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={currentPage === 1}
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
      <GenericProfileModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        endpoint="/api/hosts/apply"
        title="➕ Add Host"
        buttonLabel="Add Host"
        onSuccess={() => {
          fetchHosts();
          onStatsUpdate?.();
        }}
      />
    </Card>
  );
}
