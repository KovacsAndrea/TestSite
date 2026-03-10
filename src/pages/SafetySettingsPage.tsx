import React from "react";

type SafetyOption = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

const mockSafetyOptions: SafetyOption[] = [
  {
    id: "1",
    title: "Change Password",
    description: "Update your account password regularly to stay safe.",
    enabled: true,
  },
  {
    id: "2",
    title: "Two-Factor Authentication",
    description: "Add an extra layer of security to your account.",
    enabled: false,
  },
  {
    id: "3",
    title: "Login Alerts",
    description: "Receive notifications when your account is accessed.",
    enabled: true,
  },
];

export const SafetySettingsPage: React.FC = () => {
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
          Safety & Security
        </h1>

        <p style={{ marginBottom: "32px", color: "#666" }}>
          Manage your account safety settings to keep your information secure.
        </p>

        <div style={{ display: "grid", gap: "16px" }}>
          {mockSafetyOptions.map((option) => (
            <div
              key={option.id}
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
                <div style={{ fontWeight: 600 }}>{option.title}</div>
                <div style={{ fontSize: "13px", color: "#777" }}>
                  {option.description}
                </div>
              </div>

              <button
                style={{
                  border: "none",
                  background: option.enabled ? "#79d9b2" : "#f1f1f1",
                  color: option.enabled ? "#0f3d2e" : "#555",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {option.enabled ? "Enabled" : "Enable"}
              </button>
            </div>
          ))}
        </div>

        {/* Add Note Section */}
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
            Keep your account safe by reviewing these settings regularly.
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
            Review Security Tips
          </button>
        </div>
      </div>
    </div>
  );
};