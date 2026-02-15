import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./messageStyling.css";

export const FavesMessages: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="empty-faves-container">

      <FavoriteBorderIcon className="empty-faves-icon" />

      <h2 className="empty-faves-title">
        Nu ai cărți favorite încă
      </h2>

      <p className="empty-faves-text">
        Explorează colecția noastră și adaugă cărțile care îți plac
      </p>

      <Button
        variant="contained"
        className="empty-faves-button"
        onClick={() => navigate("/home")}
      >
        Vezi cărțile
      </Button>

    </div>
  );
};
