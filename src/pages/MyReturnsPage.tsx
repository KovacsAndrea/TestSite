import React from "react";

type ReturnItem = {
  id: string;
  book: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
};

const mockReturns: ReturnItem[] = [
  {
    id: "#R1021",
    book: "Mistborn: The Final Empire",
    date: "12 Mar 2026",
    status: "Pending",
  },
  {
    id: "#R1014",
    book: "The Way of Kings",
    date: "04 Mar 2026",
    status: "Approved",
  },
  {
    id: "#R1009",
    book: "The Priory of the Orange Tree",
    date: "20 Feb 2026",
    status: "Rejected",
  },
];

const statusStyle = (status: ReturnItem["status"]): React.CSSProperties => {
  const base = {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
  };

  switch (status) {
    case "Pending":
      return { ...base, background: "#f1f1f1", color: "#444" };
    case "Approved":
      return { ...base, background: "#79d9b2", color: "#0f3d2e" };
    case "Rejected":
      return { ...base, background: "#f5f5f5", color: "#777" };
    default:
      return base;
  }
};

export const MyReturnsPage: React.FC = () => {
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
          My Returns
        </h1>

        <p style={{ marginBottom: "32px", color: "#666" }}>
          Track and manage your return requests.
        </p>

        {/* Returns List */}
        <div style={{ display: "grid", gap: "16px" }}>
          {mockReturns.map((item) => (
            <div
              key={item.id}
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
                <div style={{ fontWeight: 600 }}>{item.book}</div>
                <div style={{ fontSize: "13px", color: "#777" }}>
                  Request ID: {item.id}
                </div>
                <div style={{ fontSize: "13px", color: "#777" }}>
                  Date: {item.date}
                </div>
              </div>

              <div style={statusStyle(item.status)}>{item.status}</div>

              <button
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#9c27b0",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* New Return Section */}
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
            Need to return another item?
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
            Start New Return
          </button>
        </div>
      </div>
    </div>
  );
};