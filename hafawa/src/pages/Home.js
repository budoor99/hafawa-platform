import React from "react";
import heroImg from "../assets/hero.jpg";

function Home() {
  return (
    <div
      className="d-flex align-items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "80vh",
        color: "black",
      }}
    >
      <div className="container">
        <div className="col-md-6">
          <p className="text-uppercase fw-bold small">Start Exploring</p>
          <h1 className="text-purple fw-bold">
            Discover Saudi Arabia: <br />
            From Ancient Wonders to Modern Marvels
          </h1>
          <p className="text-muted">
            Explore the diverse beauty of Saudi Arabia, from breathtaking
            deserts and historical landmarks to vibrant cities and cultural
            experiences. Plan your journey, bookmark must-visit destinations,
            and connect with local experts for an unforgettable adventure.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
