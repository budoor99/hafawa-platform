import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import bgImage from "../assets/hero.jpg"; // Optional background image

const AboutUs = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "100px 0",
        minHeight: "100vh",
      }}
    >
      <Container className="text-center">
        <motion.h1
          className="fw-bold mb-4"
          style={{ fontSize: "3rem", color: "#4A148C", letterSpacing: "1px" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ✨ Discover Hafawa
        </motion.h1>

        <motion.p
          className="mx-auto"
          style={{
            maxWidth: "850px",
            fontSize: "1.25rem",
            lineHeight: "2",
            color: "#333",
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          At <strong>Hafawa</strong>, we are passionate about bringing Saudi
          Arabia's rich cultural heritage and captivating history to the world.
          Whether you dream of standing beneath the towering Kingdom Tower or
          tracing the ancient footsteps in Al-Ula, Hafawa is your gateway. Our
          platform connects you to immersive local experiences, expert guides,
          and curated adventures designed to inspire and inform. ✈️🕌🌍
          <br />
          <br />
          Join us as we bridge tradition and exploration—one story, one guide,
          one destination at a time.
        </motion.p>
      </Container>
    </div>
  );
};

export default AboutUs;
