import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

type LoggedOutComponentProps = {
  redirectPath?: string; // optional, default /auth
};

export const LoggedOutComponent: React.FC<LoggedOutComponentProps> = ({ redirectPath = "/auth" }) => {
  const navigate = useNavigate();

  const goToAuth = () => navigate(redirectPath);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "#f0f0f0",
        borderRadius: "14px",
        textAlign: "center",
      }}
    >
      <AccountCircleIcon style={{ fontSize: 60, color: "#79d9b2", marginBottom: "12px" }} />
      <p style={{ fontWeight: 600, marginBottom: "6px" }}>
        Hei, acum esti un user anonim
      </p>
      <p style={{ fontSize: "14px", color: "#555", marginBottom: "16px" }}>
        Intra in contul tau sau inregistreaza-te pentru a-ti pastra produsele favorite.
      </p>
      <button
        id = "logged-out-component-button"
        onClick={goToAuth}
        style={{
          background: "#79d9b2",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Intra in cont
      </button>
    </div>
  );
};