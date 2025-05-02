import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Card } from "react-bootstrap"
import hegraImg from "../assets/hegra.jpg"

export default function DestinationDetails() {
  const { id } = useParams()
  const [saved, setSaved] = useState(false)

  const destinations = {
    hegra: {
      title: "HEGRA – PRESERVED TOMBS AND ANCIENT WONDERS",
      image: hegraImg,
      description: `The Hegra Archaeological Site (Al-Hijr / Madāʾin Ṣāliḥ) is the first World Heritage property to be inscribed in Saudi Arabia. Formerly known as Hegra, it is the largest conserved site of the civilization of the Nabataeans south of Petra in Jordan. It features well-preserved monumental tombs with decorated facades dating from the 1st century BC to the 1st century AD. The site also features some 50 inscriptions of the pre-Nabataean period and some cave drawings. Al-Hijr bears a unique testimony to Nabataean civilization. With its 111 monumental tombs, 94 of which are decorated, and water wells, the site is an outstanding example of the Nabataeans’ architectural accomplishment and hydraulic expertise.`,
      directions: "https://www.google.com/maps/search/?api=1&query=26.804340596065433,37.95787770815628",
      sourceUrl: "https://www.visitsaudi.com/en/alula/attractions/a-carved-phenomenon-envisioning-the-past",
    },
  }

  const data = destinations[id]
  if (!data) return <p className="p-4">Destination not found.</p>

  return (
    <div className="container py-4" style={{ maxWidth: "960px" }}>
      <p className="text-uppercase text-muted mb-1" style={{ fontSize: "0.8rem" }}>
        CONTENT &gt; {id.toUpperCase()}
      </p>

      <h2 className="fw-bold mb-2" style={{ fontSize: "1.4rem" }}>{data.title}</h2>

      {/* Save icon below title */}
      <div
        onClick={() => setSaved(!saved)}
        style={{
          cursor: "pointer",
          fontSize: "1.2rem",
          marginBottom: "1rem",
          userSelect: "none",
          width: "fit-content"
        }}
        title={saved ? "Unsave this page" : "Save this page"}
      >
        {saved ? "🔖" : "📑"}
      </div>

      <div className="row align-items-start g-3">
        {/* Left: text */}
        <div className="col-md-6">
          <p className="text-muted mb-2" style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>
            {data.description}
          </p>
          <div className="mt-2">
            <h6 className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>Sources</h6>
            <a
              href={data.sourceUrl}
              className="text-decoration-none"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.85rem", color: "#6A1B9A" }}
            >
              Read more ↗
            </a>
          </div>
        </div>

        {/* Right: Image + button */}
        <div className="col-md-6 d-flex flex-column align-items-center">
          <img
            src={data.image}
            alt={data.title}
            className="rounded mb-3"
            style={{ width: "100%", maxWidth: "350px", height: "auto", objectFit: "cover" }}
          />

          <Card className="shadow-sm" style={{ width: "80%", maxWidth: "280px" }}>
            <Card.Body className="p-2">
              <Button
                size="sm"
                href={data.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="w-100 text-white"
                style={{
                  backgroundColor: "#6A1B9A",
                  borderColor: "#6A1B9A",
                  fontSize: "0.8rem",
                  padding: "6px 12px"
                }}
              >
                GET DIRECTIONS
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}
