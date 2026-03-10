import React from "react";

type FAQ = {
  question: string;
  answer: string;
};

const mockFaq: FAQ[] = [
  {
    question: "Where can I track my order?",
    answer: "You can track all your orders in the Order History section of your account.",
  },
  {
    question: "How do I use a voucher?",
    answer: "You can apply a voucher during checkout or from the Vouchers page.",
  },
  {
    question: "Can I refund a purchase?",
    answer: "Refunds depend on the seller policy. Please contact support if you need assistance.",
  },
];

export const SupportPage: React.FC = () => {
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
          Support Center
        </h1>

        <p style={{ marginBottom: "32px", color: "#666" }}>
          Need help? Browse common questions or contact our support team.
        </p>

        {/* Contact Card */}
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
          <h2 style={{ marginBottom: "10px" }}>Contact Support</h2>
          <p style={{ marginBottom: "16px", color: "#666" }}>
            If you need help with orders, payments, or vouchers, our team is here to help.
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
            Send Message
          </button>
        </div>

        {/* FAQ Section */}
        <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>FAQ</h2>

        <div style={{ display: "grid", gap: "14px" }}>
          {mockFaq.map((item, index) => (
            <div
              key={index}
              style={{
                background: "white",
                borderRadius: "14px",
                padding: "18px 20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  marginBottom: "6px",
                  color: "#9c27b0",
                }}
              >
                {item.question}
              </div>

              <div style={{ fontSize: "14px", color: "#666" }}>
                {item.answer}
              </div>
            </div>
          ))}
        </div>

        {/* Help Footer */}
        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "8px", color: "#666" }}>
            Still can't find what you're looking for?
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
            Contact Support Team
          </button>
        </div>
      </div>
    </div>
  );
};