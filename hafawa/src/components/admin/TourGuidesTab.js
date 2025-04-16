import React from "react";
import { Card, Table, Badge, Form, Button, Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical, BsPersonCircle } from "react-icons/bs";

const tourGuides = [
  {
    name: "Ahmed Al-Saud",
    email: "ahmed.s@example.com",
    location: "Riyadh",
    specialty: "Historical Sites",
    status: "Active",
  },
  {
    name: "Fatima Al-Qahtani",
    email: "fatima.q@example.com",
    location: "Jeddah",
    specialty: "Cultural Experiences",
    status: "Active",
  },
  {
    name: "Mohammed Al-Harbi",
    email: "mohammed.h@example.com",
    location: "Al-Ula",
    specialty: "Adventure Tours",
    status: "Active",
  },
  {
    name: "Layla Al-Zahrani",
    email: "layla.z@example.com",
    location: "Dammam",
    specialty: "Food & Culinary",
    status: "Inactive",
  },
  {
    name: "Khalid Al-Otaibi",
    email: "khalid.o@example.com",
    location: "Abha",
    specialty: "Photography Tours",
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

export default function TourGuidesTab() {
  return (
    <Card className="p-4 shadow-sm">
      {/*==================== Header =====================*/}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold">Tour Guide Management</h4>
          <p className="text-muted">Manage tour guides and their profiles</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="position-relative" style={{ maxWidth: "280px" }}>
            <Form.Control
              type="text"
              placeholder="Search guides..."
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
            Add Guide
          </Button>
        </div>
      </div>

      {/*==================== Table =====================*/}
      <Table hover responsive className="custom-table">
        <thead>
          <tr>
            <th>Guide</th>
            <th>Location</th>
            <th>Specialty</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tourGuides.map((guide, idx) => (
            <tr key={idx} className="align-middle">
              <td>
                <div className="d-flex align-items-center">
                  <BsPersonCircle size={40} className="me-3 text-secondary" />
                  <div>
                    <div className="fw-semibold">{guide.name}</div>
                    <div className="text-muted small">{guide.email}</div>
                  </div>
                </div>
              </td>
              <td>{guide.location}</td>
              <td>{guide.specialty}</td>
              <td>
                <Badge
                  bg={getStatusVariant(guide.status)}
                  className="px-2 py-1"
                >
                  {guide.status}
                </Badge>
              </td>
              <td className="text-end">
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" className="text-muted p-0">
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>View Profile</Dropdown.Item>
                    <Dropdown.Item>Edit Guide</Dropdown.Item>
                    <Dropdown.Item>Send Message</Dropdown.Item>
                    <Dropdown.Item className="text-danger">
                      Deactivate Account
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
        <small className="text-muted">Showing 5 of 87 tour guides</small>
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
