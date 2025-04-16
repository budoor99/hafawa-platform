import React from "react";
import { Card, Table, Badge, Form, Button, Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical, BsFilter, BsPlus, BsMap } from "react-icons/bs";

const destinations = [
  {
    id: "D-001",
    name: "Hegra - Ancient City",
    location: "Al-Ula",
    image: "/download.png",
    status: "Active",
  },
  {
    id: "D-002",
    name: "Edge of the World",
    location: "Riyadh",
    image: "/download.png",
    status: "Active",
  },
  {
    id: "D-003",
    name: "Diriyah",
    location: "Riyadh",
    image: "/download.png",
    status: "Active",
  },
  {
    id: "D-004",
    name: "Jeddah Corniche",
    location: "Jeddah",
    image: "/download.png",
    status: "Active",
  },
  {
    id: "D-005",
    name: "Red Sea Project",
    location: "Red Sea Coast",
    image: "/download.png",
    status: "Coming Soon",
  },
];

const getStatusVariant = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Coming Soon":
      return "info";
    default:
      return "secondary";
  }
};

export default function DestinationsTab() {
  return (
    <Card className="p-4 shadow-sm">
      {/*==================== Header ===================*/}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold">Destination Management</h4>
          <p className="text-muted">Manage destinations and attractions</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="position-relative" style={{ maxWidth: "280px" }}>
            <Form.Control
              type="text"
              placeholder="Search destinations..."
              className="ps-5"
            />
            <i
              className="bi bi-search position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
              style={{ fontSize: "14px" }}
            />
          </div>
          <Button variant="outline-light" className="border">
            <BsFilter className="text-dark" />
          </Button>
          <Button className="btn-purple">
            <BsPlus className="me-2" />
            Add Destination
          </Button>
        </div>
      </div>

      {/*==================== Table ===================*/}
      <Table hover responsive className="custom-table">
        <thead>
          <tr>
            <th>Destination</th>
            <th>Location</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map((d, idx) => (
            <tr key={idx} className="align-middle">
              <td>
                <div className="d-flex align-items-center">
                  <BsMap size={32} className="me-3 text-primary" />

                  <div>
                    <div className="fw-semibold">{d.name}</div>
                    <div className="text-muted small">ID: {d.id}</div>
                  </div>
                </div>
              </td>
              <td>{d.location}</td>
              <td>
                <Badge bg={getStatusVariant(d.status)} className="px-2 py-1">
                  {d.status}
                </Badge>
              </td>
              <td className="text-end">
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" className="text-muted p-0">
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>View Details</Dropdown.Item>
                    <Dropdown.Item>Edit Destination</Dropdown.Item>
                    <Dropdown.Item>View Analytics</Dropdown.Item>
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
        <small className="text-muted">Showing 5 of 42 destinations</small>
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
