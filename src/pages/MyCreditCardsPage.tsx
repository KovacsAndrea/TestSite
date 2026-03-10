import React from "react";

type CreditCard = {
  id: string;
  cardHolder: string;
  last4: string;
  expiry: string;
  brand: "Visa" | "Mastercard";
};

const mockCards: CreditCard[] = [
  {
    id: "1",
    cardHolder: "John Doe",
    last4: "4242",
    expiry: "08/27",
    brand: "Visa",
  },
  {
    id: "2",
    cardHolder: "John Doe",
    last4: "1881",
    expiry: "11/26",
    brand: "Mastercard",
  },
];

export const MyCreditCardsPage: React.FC = () => {
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
          My Credit Cards
        </h1>

        <p style={{ marginBottom: "32px", color: "#666" }}>
          Manage your saved payment methods.
        </p>

        {/* Cards */}
        <div style={{ display: "grid", gap: "16px" }}>
          {mockCards.map((card) => (
            <div
              key={card.id}
              style={{
                background: "linear-gradient(135deg, #79d9b2, #9c27b0)",
                borderRadius: "16px",
                padding: "24px",
                color: "white",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                position: "relative",
              }}
            >
              <div style={{ fontSize: "14px", opacity: 0.9 }}>
                {card.brand}
              </div>

              <div
                style={{
                  fontSize: "22px",
                  letterSpacing: "3px",
                  margin: "14px 0",
                  fontWeight: 600,
                }}
              >
                **** **** **** {card.last4}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                }}
              >
                <div>
                  <div style={{ opacity: 0.8 }}>Card Holder</div>
                  <div>{card.cardHolder}</div>
                </div>

                <div>
                  <div style={{ opacity: 0.8 }}>Expires</div>
                  <div>{card.expiry}</div>
                </div>
              </div>

              <button
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Add Card Section */}
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
          <p style={{ marginBottom: "12px" }}>
            Want to add another payment method?
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
            Add New Card
          </button>
        </div>
      </div>
    </div>
  );
};