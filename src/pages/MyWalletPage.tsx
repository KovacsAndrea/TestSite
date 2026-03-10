import React from "react";

type Transaction = {
  id: string;
  date: string;
  amount: string;
  type: "Top Up" | "Purchase" | "Refund";
};

const mockTransactions: Transaction[] = [
  {
    id: "#TX1021",
    date: "15 Mar 2026",
    amount: "+ $25.00",
    type: "Top Up",
  },
  {
    id: "#TX1012",
    date: "10 Mar 2026",
    amount: "- $12.99",
    type: "Purchase",
  },
  {
    id: "#TX1004",
    date: "05 Mar 2026",
    amount: "+ $8.99",
    type: "Refund",
  },
];

const typeStyle = (type: Transaction["type"]): React.CSSProperties => {
  const base = {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
  };

  switch (type) {
    case "Top Up":
      return { ...base, background: "#79d9b2", color: "#0f3d2e" };
    case "Purchase":
      return { ...base, background: "#f1f1f1", color: "#444" };
    case "Refund":
      return { ...base, background: "#e8e0f5", color: "#9c27b0" };
    default:
      return base;
  }
};

export const MyWalletPage: React.FC = () => {
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
          My Wallet
        </h1>

        <p style={{ marginBottom: "32px", color: "#666" }}>
          Manage your wallet balance and view recent transactions.
        </p>

        {/* Balance Card */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "32px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            borderLeft: "5px solid #79d9b2",
          }}
        >
          <div style={{ fontSize: "14px", color: "#777", marginBottom: "6px" }}>
            Current Balance
          </div>

          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            $52.40
          </div>

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
            Add Funds
          </button>
        </div>

        {/* Transactions */}
        <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>
          Recent Transactions
        </h2>

        <div style={{ display: "grid", gap: "14px" }}>
          {mockTransactions.map((tx) => (
            <div
              key={tx.id}
              style={{
                background: "white",
                borderRadius: "14px",
                padding: "18px 20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{tx.id}</div>
                <div style={{ fontSize: "13px", color: "#777" }}>
                  {tx.date}
                </div>
              </div>

              <div style={{ fontWeight: 600 }}>{tx.amount}</div>

              <div style={typeStyle(tx.type)}>{tx.type}</div>

              <button
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#9c27b0",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};