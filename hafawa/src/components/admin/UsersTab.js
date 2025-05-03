// ============================== Imports ==============================
import React, { useEffect, useState } from "react";
import { Card, Table, Badge, Form, Button, Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical, BsPersonCircle } from "react-icons/bs";
import SendEmailModal from "./SendEmailModal";
import EditUserModal from "./EditUserModal";
import AddUserModal from "./AddUserModal";
import axios from "axios";

// ============================== Helpers ==============================
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

export default function UsersTab({ onStatsUpdate }) {
  // ============================== State ==============================
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const usersPerPage = 5;

  // ============================== Effects ==============================
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // ============================== Data Fetch ==============================
  const fetchUsers = () => {
    axios
      .get("/api/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users", err));
  };

  // ============================== Derived Data ==============================
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // ============================== Handlers ==============================
  const handleDeactivate = async (userId) => {
    try {
      await axios.patch(`/api/admin/users/${userId}/deactivate`);
      await fetchUsers();
      onStatsUpdate?.();
    } catch (err) {
      console.error("Failed to deactivate user", err);
    }
  };

  const handleActivate = async (userId) => {
    try {
      await axios.patch(`/api/admin/users/${userId}/activate`);
      await fetchUsers();
      onStatsUpdate?.();
    } catch (err) {
      console.error("Failed to activate user", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`/api/admin/users/delete/${userId}`);
      fetchUsers();
      onStatsUpdate?.();
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Error deleting user. Please try again.");
    }
  };

  const handleSaveEdit = async (updatedUser) => {
    try {
      if (updatedUser.upgradeTo === "host") {
        await axios.post("/api/hosts/upgrade", updatedUser);
      } else if (updatedUser.upgradeTo === "tourguide") {
        await axios.post("/api/tour-guides/upgrade", updatedUser);
      } else {
        await axios.put(`/api/admin/users/${updatedUser._id}`, updatedUser);
      }

      await fetchUsers();
      setShowEditModal(false);
      onStatsUpdate?.();
    } catch (err) {
      console.error("Save failed", err);
      alert("Something went wrong while saving the user.");
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const openEmailModal = (email) => {
    setSelectedUserEmail(email);
    setShowEmailModal(true);
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
    setSelectedUserEmail(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // ============================== JSX ==============================
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
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <i
              className="bi bi-search position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
              style={{ fontSize: "14px" }}
            />
          </div>
          <Button className="btn-purple" onClick={() => setShowAddModal(true)}>
            <i className="bi bi-person-plus me-2" />
            Add User
          </Button>
        </div>
      </div>

      {/*==================== Table ===================*/}
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
          {currentUsers.map((u) => (
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
                    <Dropdown.Item onClick={() => openEditModal(u)}>
                      Edit User
                    </Dropdown.Item>
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
                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => handleDeleteUser(u._id)}
                    >
                      Delete User
                    </Dropdown.Item>
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

      {/*==================== Modals ===================*/}
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
      <AddUserModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onUserAdded={fetchUsers}
        onStatsUpdate={onStatsUpdate}
      />
    </Card>
  );
}
