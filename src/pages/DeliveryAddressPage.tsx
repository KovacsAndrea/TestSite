import React from "react";

type Address = {
  id: string;
  fullName: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
};

const mockAddresses: Address[] = [
  {
    id: "1",
    fullName: "John Doe",
    street: "123 Fantasy Lane",
    city: "Orlando",
    country: "USA",
    postalCode: "32801",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    street: "456 Magic Street",
    city: "London",
    country: "UK",
    postalCode: "SW1A 1AA",
  },
  {
    id: "3",
    fullName: "Alice Johnson",
    street: "789 Dragon Ave",
    city: "Paris",
    country: "France",
    postalCode: "75001",
  },
];

export const DeliveryAddressPage: React.FC = () => {
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
          Delivery Addresses
        </h1>

        <p style={{ marginBottom: "32px", color: "#666" }}>
          Manage your saved delivery addresses.
        </p>

        {/* Addresses List */}
        <div style={{ display: "grid", gap: "16px" }}>
          {mockAddresses.map((addr) => (
            <div
              key={addr.id}
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
                <div style={{ fontWeight: 600 }}>{addr.fullName}</div>
                <div style={{ fontSize: "13px", color: "#777" }}>
                  {addr.street}, {addr.city}, {addr.country}, {addr.postalCode}
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

        {/* Add New Address */}
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
          <p style={{ marginBottom: "10px" }}>
            Want to add a new delivery address?
          </p>

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
            Add New Address
          </button>
        </div>
      </div>
    </div>
  );
};