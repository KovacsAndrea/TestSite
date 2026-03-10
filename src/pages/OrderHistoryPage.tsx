import React from "react";

type Order = {
  id: string;
  date: string;
  total: string;
  status: "Delivered" | "Processing" | "Cancelled";
};

const mockOrders: Order[] = [
  {
    id: "#10231",
    date: "12 Feb 2026",
    total: "$34.99",
    status: "Delivered",
  },
  {
    id: "#10212",
    date: "28 Jan 2026",
    total: "$19.50",
    status: "Processing",
  },
  {
    id: "#10198",
    date: "10 Jan 2026",
    total: "$42.00",
    status: "Cancelled",
  },
];

const statusStyle = (status: Order["status"]) => {
  const base: React.CSSProperties = {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
  };

  switch (status) {
    case "Delivered":
      return { ...base, backgroundColor: "#79d9b2", color: "#0f3d2e" };
    case "Processing":
      return { ...base, backgroundColor: "#eaeaea", color: "#333" };
    case "Cancelled":
      return { ...base, backgroundColor: "#f5f5f5", color: "#666" };
    default:
      return base;
  }
};

export const OrderHistoryPage: React.FC = () =>  {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7faf9",
        padding: "40px 24px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "8px",
          }}
        >
          Order History
        </h1>

        <p style={{ marginBottom: "32px", color: "#666" }}>
          View your previous orders and their current status.
        </p>

        <div
          style={{
            display: "grid",
            gap: "16px",
          }}
        >
          {mockOrders.map((order) => (
            <div
              key={order.id}
              style={{
                background: "white",
                borderRadius: "14px",
                padding: "18px 20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderLeft: "4px solid #79d9b2",
              }}
            >
              <div>
                <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                  {order.id}
                </div>
                <div style={{ fontSize: "13px", color: "#777" }}>
                  {order.date}
                </div>
              </div>

              <div style={{ fontWeight: 600 }}>{order.total}</div>

              <div style={statusStyle(order.status)}>{order.status}</div>

              <button
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#9c27b0",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                View
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            background: "white",
            borderRadius: "14px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <p style={{ marginBottom: "10px" }}>Need help with an order?</p>
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
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
