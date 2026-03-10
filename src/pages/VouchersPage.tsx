import React from "react";

type Voucher = {
  code: string;
  discount: string;
  expiry: string;
  status: "Active" | "Used" | "Expired";
};

const mockVouchers: Voucher[] = [
  {
    code: "BOOK10",
    discount: "10% OFF",
    expiry: "30 Apr 2026",
    status: "Active",
  },
  {
    code: "READMORE15",
    discount: "15% OFF",
    expiry: "12 Feb 2026",
    status: "Used",
  },
  {
    code: "SPRING20",
    discount: "20% OFF",
    expiry: "10 Jan 2026",
    status: "Expired",
  },
];

const statusStyle = (status: Voucher["status"]): React.CSSProperties => {
  const base = {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
  };

  switch (status) {
    case "Active":
      return { ...base, background: "#79d9b2", color: "#0f3d2e" };
    case "Used":
      return { ...base, background: "#f1f1f1", color: "#555" };
    case "Expired":
      return { ...base, background: "#f5f5f5", color: "#777" };
    default:
      return base;
  }
};

export const VouchersPage: React.FC = () => {
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
          Your Vouchers
        </h1>

        <p style={{ marginBottom: "32px", color: "#666" }}>
          Manage and view your available discount vouchers.
        </p>

        <div style={{ display: "grid", gap: "16px" }}>
          {mockVouchers.map((voucher) => (
            <div
              key={voucher.code}
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
                <div style={{ fontWeight: 600 }}>{voucher.code}</div>
                <div style={{ fontSize: "13px", color: "#777" }}>
                  Expires: {voucher.expiry}
                </div>
              </div>

              <div style={{ fontWeight: 600 }}>{voucher.discount}</div>

              <div style={statusStyle(voucher.status)}>{voucher.status}</div>

              <button
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#9c27b0",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Apply
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "40px",
            background: "white",
            padding: "20px",
            borderRadius: "14px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <p style={{ marginBottom: "10px" }}>Have a new voucher code?</p>
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
            Redeem Voucher
          </button>
        </div>
      </div>
    </div>
  );
};