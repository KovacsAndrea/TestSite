import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import "./cardStyling.css";
import type { Book } from "../../models/interfaces";
import { useGlobalState } from "../../global/globalState";

export const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  const { faveBooks, addBookToFaves, removeBookFromFaves, addBookToCart, stockOnly } = useGlobalState();
  const isOutOfStock = book.stock === 0;

  const isFavorite = faveBooks.some((b) => b.id === book.id);
  const handleFavoriteClick = async () => {
    if (isFavorite) {
      await removeBookFromFaves(book.id);
    } else {
      await addBookToFaves(book.id);
    }
  };

  const handleAddToCart = async () => {
    await addBookToCart(book.id);
    alert(book.stock)
  }
  if (stockOnly && book.stock === 0) {
    return null;
  }

  return (
  <Card className={`book-card ${isOutOfStock ? "out-of-stock-card" : ""}`}>
    {isOutOfStock && (
      <Box className="out-of-stock-label">
        Out of stock
      </Box>
    )}

    <Box className={`book-card-icon ${isOutOfStock ? "out-of-stock-icon" : ""}`}>
      <MenuBookIcon className={`book-icon ${isOutOfStock ? "out-of-stock-book-icon" : ""}`} />
    </Box>

    <CardContent className="book-card-content">
      <Typography className="book-title">
        {book.title}
      </Typography>

      <Typography className="book-author">
        {book.author} • {book.year}
      </Typography>

      <Typography className="book-price">
        {book.price} €
      </Typography>
    </CardContent>

    <Box className="book-card-actions">
      <IconButton
        className="favorite-button"
        onClick={handleFavoriteClick}
      >
        {isFavorite ? (
          <FavoriteIcon className="favorite-filled" />
        ) : (
          <FavoriteBorderIcon className="favorite-empty" />
        )}
      </IconButton>

      <Button
      className={`add-to-cart-button ${isOutOfStock ? "out-of-stock-button" : ""}`}
      onClick={handleAddToCart}
      disabled={isOutOfStock}
      >
      Add to cart
    </Button>
    </Box>
  </Card>
);
};
