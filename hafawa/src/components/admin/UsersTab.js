import React, { useEffect, useState } from "react";
import { Card, Table, Badge, Form, Button, Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical, BsPersonCircle } from "react-icons/bs";
import SendEmailModal from "./SendEmailModal";
import axios from "axios";

// Helper functions
const getStatusText = (isVerified) => (isVerified ? "Active" : "Inactive");

const getStatusVariant = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "danger";
    case "Pending":
      return "warning";
    default:
      return "secondary";
  }
};

export default function UsersTab() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    axios
      .get("/api/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users", err));
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleDeactivate = async (userId) => {
    try {
      await axios.patch(`/api/admin/users/${userId}/deactivate`);
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isVerified: false } : user
        )
      );
    } catch (err) {
      console.error("Failed to deactivate user", err);
    }
  };

  const handleActivate = async (userId) => {
    try {
      await axios.patch(`/api/admin/users/${userId}/activate`);
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isVerified: true } : user
        )
      );
    } catch (err) {
      console.error("Failed to activate user", err);
    }
  };

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);

  const openEmailModal = (email) => {
    setSelectedUserEmail(email);
    setShowEmailModal(true);
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
    setSelectedUserEmail(null);
  };

  return (
    <Card className="p-4 shadow-sm">
      {/*==================== Header ===================*/}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold">User Management</h4>
          <p className="text-muted">
            Manage registered users and their accounts
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="position-relative" style={{ maxWidth: "280px" }}>
            <Form.Control
              type="text"
              placeholder="Search users..."
              className="ps-5"
            />
            <i
              className="bi bi-search position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
              style={{ fontSize: "14px" }}
            />
          </div>
          <Button variant="outline-light" className="border">
            <i className="bi bi-filter text-dark" />
          </Button>
          <Button className="btn-purple">
            <i className="bi bi-person-plus me-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* ========== Table ========== */}
      <Table hover responsive className="custom-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Joined</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((u, idx) => (
            <tr key={u._id} className="align-middle">
              <td>
                <div className="d-flex align-items-center">
                  <BsPersonCircle size={40} className="me-3 text-secondary" />
                  <div>
                    <div className="fw-semibold">{u.name}</div>
                    <div className="text-muted small">{u.email}</div>
                  </div>
                </div>
              </td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              <td>
                <Badge
                  bg={getStatusVariant(getStatusText(u.isVerified))}
                  className="px-2 py-1"
                >
                  {getStatusText(u.isVerified)}
                </Badge>
              </td>
              <td className="text-end">
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" className="text-muted p-0">
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>View Profile</Dropdown.Item>
                    <Dropdown.Item>Edit User</Dropdown.Item>
                    <Dropdown.Item onClick={() => openEmailModal(u.email)}>
                      Send Message
                    </Dropdown.Item>
                    {u.isVerified ? (
                      <Dropdown.Item
                        className="text-danger"
                        onClick={() => handleDeactivate(u._id)}
                      >
                        Deactivate
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item
                        className="text-success"
                        onClick={() => handleActivate(u._id)}
                      >
                        Activate
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/*==================== Pagination ===================*/}
      <div className="d-flex justify-content-between mt-3 align-items-center">
        <small className="text-muted">
          Showing {indexOfFirstUser + 1}–
          {Math.min(indexOfLastUser, users.length)} of {users.length} users
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
      <SendEmailModal
        show={showEmailModal}
        onClose={closeEmailModal}
        recipientEmail={selectedUserEmail}
      />
    </Card>
  );
}
