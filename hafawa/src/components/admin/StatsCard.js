import React from "react";
import { Card } from "react-bootstrap";

export default function StatsCard({ title, value, change, trend, icon }) {
  return (
    <Card className="text-center p-3 shadow-sm border-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="bg-light p-2 rounded-circle">{icon}</div>
        <span
          className={`badge ${trend === "up" ? "bg-success" : "bg-danger"}`}
        >
          {trend === "up" ? "↑" : "↓"} {change}
        </span>
      </div>
      <h4 className="fw-bold">{value}</h4>
      <p className="text-muted mb-0">{title}</p>
    </Card>
  );
}
