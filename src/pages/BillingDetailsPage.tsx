import React from "react";

type BillingDetail = {
  id: string;
  fullName: string;
  company?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
};

const mockBillingDetails: BillingDetail[] = [
  {
    id: "1",
    fullName: "John Doe",
    company: "Fantasy Books Ltd.",
    street: "123 Fantasy Lane",
    city: "Orlando",
    country: "USA",
    postalCode: "32801",
    phone: "+1 555-123-4567",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    street: "456 Magic Street",
    city: "London",
    country: "UK",
    postalCode: "SW1A 1AA",
    phone: "+44 20 7946 0958",
  },
];

export const BillingDetailsPage: React.FC = () => {
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
          Billing Details
        </h1>

        <p style={{ marginBottom: "32px", color: "#666" }}>
          View and manage your billing information.
        </p>

        {/* Billing Details List */}
        <div style={{ display: "grid", gap: "16px" }}>
          {mockBillingDetails.map((detail) => (
            <div
              key={detail.id}
              style={{
                background: "white",
                borderRadius: "14px",
                padding: "18px 20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                borderLeft: "4px solid #79d9b2",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{detail.fullName}</div>
                {detail.company && (
                  <div style={{ fontSize: "13px", color: "#777" }}>
                    {detail.company}
                  </div>
                )}
                <div style={{ fontSize: "13px", color: "#777" }}>
                  {detail.street}, {detail.city}, {detail.country}, {detail.postalCode}
                </div>
                <div style={{ fontSize: "13px", color: "#777" }}>
                  Phone: {detail.phone}
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#9c27b0",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#9c27b0",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Billing Detail */}
        <div
          style={{
            marginTop: "32px",
            background: "white",
            padding: "24px",
            borderRadius: "14px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <p style={{ marginBottom: "10px" }}>Add a new billing address</p>

          <button
            style={{
              background: "#79d9b2",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Add New Billing Address
          </button>
        </div>
      </div>
    </div>
  );
};