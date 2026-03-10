import React from "react";

type Service = {
  id: string;
  title: string;
  description: string;
};

const mockServices: Service[] = [
  {
    id: "1",
    title: "Fast Delivery",
    description: "Receive your books quickly with our priority delivery service.",
  },
  {
    id: "2",
    title: "Gift Wrapping",
    description: "Send books as gifts with our premium wrapping service.",
  },
  {
    id: "3",
    title: "Digital Library",
    description: "Access selected books instantly through our digital reading service.",
  },
  {
    id: "4",
    title: "Personal Recommendations",
    description: "Get personalized book suggestions based on your reading habits.",
  },
];

export const ServicePage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7faf9",
        padding: "40px 24px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
          Our Services
        </h1>

        <p style={{ marginBottom: "32px", color: "#666" }}>
          Discover additional services designed to enhance your book shopping experience.
        </p>

        {/* Services Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
          }}
        >
          {mockServices.map((service) => (
            <div
              key={service.id}
              style={{
                background: "white",
                borderRadius: "14px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                borderTop: "4px solid #79d9b2",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: "#9c27b0",
                }}
              >
                {service.title}
              </div>

              <div style={{ fontSize: "14px", color: "#666" }}>
                {service.description}
              </div>

              <button
                style={{
                  marginTop: "14px",
                  border: "none",
                  background: "#79d9b2",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Call To Action */}
        <div
          style={{
            marginTop: "40px",
            background: "white",
            padding: "24px",
            borderRadius: "14px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <p style={{ marginBottom: "10px" }}>
            Looking for something specific?
          </p>

          <button
            style={{
              border: "none",
              background: "transparent",
              color: "#9c27b0",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};