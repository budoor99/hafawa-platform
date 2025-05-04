import React, { useEffect, useState } from "react";
import { Card, Table, Form, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import EditDestinationModal from "./EditDestinationModal";
import AddDestinationModal from "./AddDestinationModal";

export default function DestinationsTab({ onStatsUpdate }) {
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = () => {
    axios
      .get("/api/destinations")
      .then((res) => setDestinations(res.data))
      .catch((err) => console.error("Error fetching destinations", err));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );
    if (!confirmed) return;

    try {
      await axios.delete(`/api/admin/destinations/${id}`);
      fetchDestinations();
      onStatsUpdate?.();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete destination.");
    }
  };

  const openEditModal = (destination) => {
    setSelectedDestination(destination);
    setShowEditModal(true);
  };

  const filteredDestinations = destinations.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentDestinations = filteredDestinations.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);

  return (
    <Card className="p-4 shadow-sm">
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: "2.2rem" }}
            />
            <i
              className="bi bi-search position-absolute top-50 start-0 translate-middle-y text-muted"
              style={{ left: "12px", fontSize: "16px" }}
            />
          </div>
          <Button className="btn-purple" onClick={() => setShowAddModal(true)}>
            <i className="bi bi-plus-circle me-2" />
            Add Destination
          </Button>
        </div>
      </div>

      <Table hover responsive className="custom-table">
        <thead>
          <tr>
            <th>Destination</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentDestinations.map((d) => (
            <tr key={d._id} className="align-middle">
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={d.imageSrc.trim()}
                    alt={d.name}
                    width={60}
                    height={60}
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginRight: "12px",
                      border: "1px solid #ddd",
                    }}
                  />
                  <div>
                    <div className="fw-semibold">{d.name}</div>
                    <div className="text-muted small">ID: {d._id}</div>
                  </div>
                </div>
              </td>
              <td className="text-end">
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" className="text-muted p-0">
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => openEditModal(d)}>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => handleDelete(d._id, d.name)}
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

      <div className="d-flex justify-content-between mt-3 align-items-center">
        <small className="text-muted">
          Showing {indexOfFirst + 1}–
          {Math.min(indexOfLast, filteredDestinations.length)} of{" "}
          {filteredDestinations.length} destinations
        </small>
        <div className="pagination gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            style={{ borderRadius: "8px" }}
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
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            style={{ borderRadius: "8px" }}
          >
            Next
          </Button>
        </div>
      </div>

      <AddDestinationModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={fetchDestinations}
      />
      <EditDestinationModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        destination={selectedDestination}
        onSave={() => {
          fetchDestinations();
          setShowEditModal(false);
          onStatsUpdate?.();
        }}
      />
    </Card>
  );
}
