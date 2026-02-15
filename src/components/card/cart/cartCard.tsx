import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DeleteIcon from "@mui/icons-material/Delete";

import { useGlobalState } from "../../../global/globalState";
import type { CartItem } from "../../../models/interfaces";

import "./cartCardStyling.css";

interface CartCardProps {
  item: CartItem;
}

export const CartCard: React.FC<CartCardProps> = ({ item }) => {
  const { faveBooks, addBookToFaves, removeBookFromFaves, addBookToCart, removeBookFromCart, removeAllBooksFromCart } =
    useGlobalState();
  const isFavorite = faveBooks.some((b) => b.id === item.book.id);

  const handleFavoriteClick = async () => {
    if (isFavorite) await removeBookFromFaves(item.book.id);
    else await addBookToFaves(item.book.id);
  };

  const handleIncrease = async () => {
  if (item.quantity < item.book.stock) {
    await addBookToCart(item.book.id);
  }
};

  const handleDecrease = async () => {
    if (item.quantity === 1) {
      const confirmDelete = window.confirm(
        `Esti sigur ca vrei sa elimini "${item.book.title}" din cos?`
      );
      if (confirmDelete) {
        await removeBookFromCart(item.book.id);
      }
    } else {
      await removeBookFromCart(item.book.id);
    }
  };


  const handleDeleteAll = async () => {
  const confirmDelete = window.confirm(
    `Esti sigur ca vrei sa elimini toate cele ${item.quantity} exemplare ale "${item.book.title}" din cos?`
  );
  if (confirmDelete) {
    await removeAllBooksFromCart(item.book.id);
  }
};

  return (
    <Card className="cart-card">
      {/* Upper section */}
      <Box className="cart-card-upper">
        <Box className="cart-card-banner">
          <MenuBookIcon className="cart-book-icon" />
        </Box>

        <CardContent className="cart-card-content">
          <Typography className="cart-title">{item.book.title}</Typography>
          <Typography className="cart-author">{item.book.author} • {item.book.year}</Typography>
          <Typography className="cart-author">In stock: {item.book.stock}</Typography>
          <Typography className="cart-price">{item.book.price} €</Typography>
        </CardContent>

        <IconButton className="favorite-button" onClick={handleFavoriteClick}>
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      {/* Lower section */}
      <Box className="cart-card-lower">
        <IconButton className="delete-button" onClick={handleDeleteAll}>
          <DeleteIcon />
        </IconButton>

        <Box className="quantity-actions">
          <IconButton className="quantity-button" onClick={handleDecrease}>-</IconButton>
          <Typography className="quantity-text">{item.quantity}</Typography>
          <IconButton
            className="quantity-button"
            onClick={handleIncrease}
            disabled={item.quantity >= item.book.stock} // 🔹 disabled când nu mai putem crește
          >
            +
          </IconButton>
        </Box>
      </Box>
    </Card>

  );
};
