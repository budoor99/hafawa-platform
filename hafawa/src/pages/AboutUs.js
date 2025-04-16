import React from "react";
import { Container, Card } from "react-bootstrap";

const AboutUs = () => {
  return (
    <div style={{ backgroundColor: "#F7F5FB", padding: "60px 0" }}>
      <Container>
        <Card className="shadow-sm border-0 p-4" style={{ borderRadius: "16px" }}>
          <h2 className="fw-bold text-center mb-4">About Us</h2>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8", textAlign: "center" }}>
            At Hafawa, we are dedicated to showcasing the rich cultural and historical heritage of Saudi Arabia, making it accessible and engaging for visitors from around the world. Our platform invites travelers to explore the Kingdom’s diverse attractions, from iconic landmarks like the Kingdom Tower to the ancient ruins of Al-Ula. We strive to provide a seamless experience where tourists can browse destinations, create personalized itineraries, and discover unique local experiences, all while connecting with knowledgeable local guides. Whether planning a trip or simply learning about the sites, Hafawa is your premier destination to explore all that Saudi Arabia has to offer.
          </p>
        </Card>
      </Container>
    </div>
  );
};
export default AboutUs;