import React from "react";
import { Card, Table, Badge, Form, Button, Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical, BsPersonCircle } from "react-icons/bs";

const users = [
  {
    name: "Mohammed Al-Qahtani",
    email: "mohammed@example.com",
    joined: "Jan 15, 2023",
    status: "Active",
  },
  {
    name: "Sara Ahmed",
    email: "sara@example.com",
    joined: "Feb 3, 2023",
    status: "Active",
  },
  {
    name: "Ahmed Al-Saud",
    email: "ahmed.s@example.com",
    joined: "Nov 20, 2022",
    status: "Active",
  },
  {
    name: "Fatima Al-Zahrani",
    email: "fatima@example.com",
    joined: "Mar 5, 2023",
    status: "Inactive",
  },
  {
    name: "Khalid Al-Otaibi",
    email: "khalid@example.com",
    joined: "Dec 12, 2022",
    status: "Pending",
  },
];

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
          {users.map((u, idx) => (
            <tr key={idx} className="align-middle">
              <td>
                <div className="d-flex align-items-center">
                  {/* <Image
                    src="/placeholder.svg"
                    roundedCircle
                    width="40"
                    height="40"
                    className="me-3"
                    alt="avatar"
                  /> */}
                  <BsPersonCircle size={40} className="me-3 text-secondary" />

                  <div>
                    <div className="fw-semibold">{u.name}</div>
                    <div className="text-muted small">{u.email}</div>
                  </div>
                </div>
              </td>
              <td>{u.joined}</td>
              <td>
                <Badge bg={getStatusVariant(u.status)} className="px-2 py-1">
                  {u.status}
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
                    <Dropdown.Item>Send Message</Dropdown.Item>
                    <Dropdown.Item className="text-danger">
                      Deactivate
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
        <small className="text-muted">Showing 5 of 4,289 users</small>
        <div className="pagination gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            disabled
            style={{ borderRadius: "8px" }}
          >
            Previous
          </Button>
          <Button
            variant="light"
            size="sm"
            active
            style={{
              backgroundColor: "#f4f0ff",
              color: "#000",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
            }}
          >
            1
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            style={{ borderRadius: "8px" }}
          >
            2
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            style={{ borderRadius: "8px" }}
          >
            3
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            style={{ borderRadius: "8px" }}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
