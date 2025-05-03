// ============================== Imports ==============================
import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { PDFDownloadLink } from "@react-pdf/renderer";

import UsersTab from "../components/admin/UsersTab.js";
import TourGuidesTab from "../components/admin/TourGuidesTab.js";
import DestinationsTab from "../components/admin/DestinationsTab.js";
import HostsTab from "../components/admin/HostsTab";
// import DashboardPDFDocument from "../components/admin/DashboardPDFDocument.js";

export default function AdminDashboard() {
  // ============================== State ==============================
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRegularUsers: 0,
    totalTourGuides: 0,
    activeTourGuides: 0,
    inactiveTourGuides: 0,
    totalHosts: 0,
    activeHosts: 0,
    inactiveHosts: 0,
    totalDestinations: 0,
  });

  const [key, setKey] = useState("users");

  // ============================== Effects ==============================
  useEffect(() => {
    fetchStats();
  }, []);

  // ============================== Data Fetch ==============================
  const fetchStats = () => {
    axios
      .get("/api/admin/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to fetch admin stats", err));
  };

  // ============================== Card Config ==============================
  const cardConfig = [
    {
      key: "totalUsers",
      label: "Total Users",
      badge: "+12.5%",
      color: "primary",
    },
    {
      key: "totalRegularUsers",
      label: "Regular Users",
      badge: "+5.8%",
      color: "secondary",
    },
    {
      key: "totalTourGuides",
      label: "Total Tour Guides",
      badge: "+2.0%",
      color: "info",
    },
    {
      key: "activeTourGuides",
      label: "Active Tour Guides",
      badge: "+1.4%",
      color: "success",
    },
    {
      key: "inactiveTourGuides",
      label: "Inactive Tour Guides",
      badge: "-0.5%",
      color: "danger",
    },
    { key: "totalHosts", label: "Total Hosts", badge: "+3.4%", color: "info" },
    {
      key: "activeHosts",
      label: "Active Hosts",
      badge: "+2.8%",
      color: "success",
    },
    {
      key: "inactiveHosts",
      label: "Inactive Hosts",
      badge: "-1.1%",
      color: "warning",
    },
  ];

  // ============================== JSX ==============================
  return (
    <Container className="py-5">
      {/* ================= Header ================= */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Dashboard</h2>
          <p className="text-muted">
            Welcome back, Admin! Here's what's happening with Hafawa today.
          </p>
        </div>
        {/* <Button className="btn-purple">Export Report</Button> */}
        {/* <PDFDownloadLink
          document={<DashboardPDFDocument stats={stats} />}
          fileName="hafawa_dashboard_report.pdf"
        >
          {({ loading }) => (
            <Button className="btn-purple">
              {loading ? "Generating PDF..." : "Export Report"}
            </Button>
          )}
        </PDFDownloadLink> */}
      </div>

      {/* ================= Stats Cards ================= */}
      <Row className="mb-4">
        {cardConfig.map((item, index) => (
          <Col md={6} lg={3} key={index}>
            <Card className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title className="fs-3 fw-bold">
                  {stats[item.key]}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.label}
                </Card.Subtitle>
                <Badge bg={item.color}>{item.badge}</Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ================= Tabs ================= */}
      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <Nav variant="tabs" className="custom-tabs mb-4">
          <Nav.Item>
            <Nav.Link eventKey="hosts">Hosts</Nav.Link>
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
          <Tab.Pane eventKey="hosts">
            <HostsTab onStatsUpdate={fetchStats} />
          </Tab.Pane>

          <Tab.Pane eventKey="users">
            <UsersTab onStatsUpdate={fetchStats} />
          </Tab.Pane>

          <Tab.Pane eventKey="guides">
            <TourGuidesTab onStatsUpdate={fetchStats} />
          </Tab.Pane>

          <Tab.Pane eventKey="destinations">
            <DestinationsTab />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}
