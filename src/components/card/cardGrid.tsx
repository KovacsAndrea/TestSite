// src/components/card/cardGrid.tsx
import React from "react";
import Box from "@mui/material/Box";
import { BookCard } from "./card";
import type { Book } from "../../models/interfaces";
import "./cardStyling.css";

interface CardGridProps {
  books: Book[];
}

export const CardGrid: React.FC<CardGridProps> = ({ books }) => {
  return (
    <Box className="card-grid" id = "card-grid">

      {books.map((book) => (
        <BookCard
          book = {book}
          key = {book.id}
        />
      ))}
    </Box>
  );
};
