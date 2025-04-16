import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import maleImg from "../assets/man.jpg"; // Default image
import femImg from "../assets/fem.jpg"; // Default image


import "react-calendar/dist/Calendar.css"; // Import default styles

const hostsData = [
  {
    id: "Ahmed",
    name: "Ahmed Al-Saud",
    age: 35,
    location: "Riyadh",
    email: "Ahmed.Al-Saud@example.com",
    phone: "+966-5X-XXX-XXXX",
    specialRequests: "No smoking allowed",
    languages: "Arabic, English, French",
    about: "With over a decade of experience as a tour guide, I've had the privilege of sharing Saudi Arabia's rich cultural heritage with visitors from around the world. My academic background in archaeology and history allows me to provide deep insights into the historical significance of each site we visit.",
    availability: "April 2025",
    image: maleImg,
  },
  
  {
    id: "fatima",
    name: "Fatima Al-Qarni",
    age: 28,
    location: "Jeddah",
    email: "fatima.allqarni@example.com",
    phone: "+966-5X-XXX-XXXX",
    specialRequests: "No pets allowed",
    languages: "Arabic, English",
    about: "I am passionate about showcasing the hidden gems of Jeddah and sharing local stories that bring the city to life ,Having spent over ten years as a tour guide, I’m fortunate to share the vibrant cultural heritage of Saudi Arabia with travelers worldwide. My educational background in archaeology and history equips me to deliver valuable insights into the significance of the historical sites we explore together" ,
    availability: "May 2025",
    image: femImg,
  },
  {
    id: "mohammed",
    name: "Mohammed Al-Zahrani",
    age: 40,
    location: "Mecca",
    email: "mohammed.alzahrani@example.com",
    phone: "+966-5X-XXX-XXXX",
    specialRequests: "None.",
    languages: "Arabic, English",
    about: "As a local historian, I can provide unique insights into the cultural and religious significance of Mecca , Having spent over ten years as a tour guide, I’m fortunate to share the vibrant cultural heritage of Saudi Arabia with travelers worldwide. My educational background in archaeology and history equips me to deliver valuable insights into the significance of the historical sites we explore together." ,
    availability: "June 2025",
    image: maleImg,
  },
  {
    id: "fahd",
    name: "Fahd Alabdullah",
    age: 24,
    location: "Taif",
    email: "fahd.alabdullah@example.com",
    phone: "+966-5X-XXX-XXXX",
    specialRequests: "No Vlogging allowed",
    languages: "Arabic, English",
    about: "I love guiding tourists through the beautiful landscapes of Taif and sharing its rich history and Having spent over ten years as a tour guide, I’m fortunate to share the vibrant cultural heritage of Saudi Arabia with travelers worldwide my educational background in archaeology and history equips me to deliver valuable insights into the significance of the historical sites we explore together.",
    availability: "July 2025",
    image: maleImg,
  },
  {
    id: "nasser",
    name: "Nasser Hamad",
    age: 30,
    location: "Janoub",
    email: "nasser.hamad@example.com",
    phone: "+966-5X-XXX-XXXX",
    specialRequests: "No large groups",
    languages: "Arabic, English",
    about: "I focus on providing personalized tours that highlight the lesser-known parts of Saudi Arabia.",
    availability: "August 2025",
    image: maleImg,
  },
  


];

const DetailedHostProfile = () => {
  const { hostId } = useParams();
  const host = hostsData.find((h) => h.id === hostId);

  if (!host) {
    return <div>Host not found!</div>;
  }

  return (
    <div style={{ backgroundColor: "#F7F5FB", padding: "60px 0" }}>
      <Container>
        <Card className="shadow-sm border-0 p-4" style={{ borderRadius: "16px" }}>
          <Row className="align-items-center">
            <Col md={4} className="text-center">
              <img
                src={host.image}
                alt={host.name}
                className="rounded-circle mb-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <h3 className="fw-bold">{host.name}</h3>
              <p className="text-muted">📍 {host.location}</p>
              <p className="fw-semibold">Languages: {host.languages}</p>
              <p className="fw-semibold">Contact:</p>
              <p>Email: {host.email}</p>
              <p>Phone: {host.phone}</p>
            </Col>
            <Col md={8}>
              <h5>About Me</h5>
              <p>{host.about}</p>
              <h5>Special Requests</h5>
              <p>{host.specialRequests}</p>
              <h5>Availability</h5>
              <iframe
                src="https://calendar.google.com/calendar/embed?src=en.saudi%23holiday%40group.v.calendar.google.com&ctz=Asia%2FRiyadh"
                style={{
                  border: 0,
                  width: "100%",
                  height: "300px",
                  borderRadius: "10px",
                }}
                frameBorder="0"
                scrolling="no"
                title="availability-calendar"
              ></iframe>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default DetailedHostProfile;