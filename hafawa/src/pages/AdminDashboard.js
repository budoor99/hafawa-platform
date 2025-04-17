import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Nav,
  Tab,
  Button,
  Badge,
} from "react-bootstrap";
import "../styles/Dashboard.css";
import UsersTab from "../components/admin/UsersTab.js";
import TourGuidesTab from "../components/admin/TourGuidesTab.js";
import DestinationsTab from "../components/admin/DestinationsTab.js";

const stats = [
  { title: "Total Users", value: "4,289", change: "+12.5%", color: "success" },
  {
    title: "Total Destinations",
    value: "42",
    change: "+3.1%",
    color: "success",
  },

  {
    title: "Active Tour Guides",
    value: "87",
    change: "-2.3%",
    color: "danger",
  },
];

export default function AdminDashboard() {
  const [key, setKey] = useState("overview");

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Dashboard</h2>
          <p className="text-muted">
            Welcome back, Admin! Here's what's happening with Hafawa today.
          </p>
        </div>
        <Button className="btn-purple">Export Report</Button>
      </div>

      <Row className="mb-4">
        {stats.map((stat, idx) => (
          <Col md={6} lg={3} key={idx}>
            <Card className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title className="fs-3 fw-bold">{stat.value}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {stat.title}
                </Card.Subtitle>
                <Badge bg={stat.color}>{stat.change}</Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <Nav variant="tabs" className="custom-tabs mb-4">
          <Nav.Item>
            <Nav.Link eventKey="overview">Overview</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="users">Users</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="guides">Tour Guides</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="destinations">Destinations</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="overview">
            <h4>Overview Content</h4>
            <p>Summary of everything happening.</p>
          </Tab.Pane>

          <Tab.Pane eventKey="users">
            <UsersTab />
          </Tab.Pane>

          <Tab.Pane eventKey="guides">
            <TourGuidesTab />
          </Tab.Pane>

          <Tab.Pane eventKey="destinations">
            <DestinationsTab />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}
