import React from "react";
import type { Book } from "../../../models/interfaces";
import { CartCard } from "./cartCard";
import "./cartCardStyling.css";
import { CartMessages } from "../../messages/cartMessage";

interface CartItem {
  book: Book;
  quantity: number;
}

interface CartGridProps {
  cartItems: CartItem[];
}

export const CartGrid: React.FC<CartGridProps> = ({ cartItems }) => {
  if (cartItems.length === 0) {
    return <CartMessages />
  }

  return (
    <div className="cart-grid">
      {cartItems.map((item) => (
        <CartCard key={item.book.id} item={item} />
      ))}
    </div>
  );
};
