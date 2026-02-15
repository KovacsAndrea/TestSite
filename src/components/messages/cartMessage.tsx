import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./messageStyling.css";

export const CartMessages: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="empty-cart-container">

      <ShoppingCartOutlinedIcon className="empty-cart-icon" />

      <h2 className="empty-cart-title">
        Coșul tău este gol
      </h2>

      <p className="empty-cart-text">
        Adaugă cărți în coș și revino pentru a finaliza comanda
      </p>

      <Button
        variant="contained"
        className="empty-cart-button"
        onClick={() => navigate("/home")}
      >
        Vezi cărțile
      </Button>

    </div>
  );
};
