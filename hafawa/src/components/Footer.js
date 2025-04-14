import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="pt-5" style={{ backgroundColor: "#D8CBE8" }}>
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-3">
            <h5 className="fw-bold  mb-3">حـــــــفاوّة</h5>
            <p className="text-muted">
              Discover Saudi Arabia's rich cultural heritage and connect with
              local guides for an authentic experience.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-muted">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-muted">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-muted">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-muted">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div className="col-md-3">
            <h6 className="fw-bold text-dark mb-3">Explore</h6>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/content"
                  className="text-muted text-decoration-none"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/tour-guides"
                  className="text-muted text-decoration-none"
                >
                  Tour Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/local-hosts"
                  className="text-muted text-decoration-none"
                >
                  Local Hosts
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6 className="fw-bold text-dark mb-3">Information</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/about" className="text-muted text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted text-decoration-none">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6 className="fw-bold text-dark mb-3">Join Us</h6>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/apply"
                  className="text-muted text-decoration-none"
                >
                  Become a Tour Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/become-host"
                  className="text-muted text-decoration-none"
                >
                  Become a Host
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-top pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-muted mb-2 mb-md-0">
            &copy; {new Date().getFullYear()} Hafawa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
