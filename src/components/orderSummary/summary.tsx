import React from "react";
import "./summaryStyling.css";
import { useGlobalState } from "../../global/globalState";
import type { CartItem } from "../../models/interfaces";

export const CartSummary: React.FC = () => {
  const { cartBooks } = useGlobalState();

  // calculează totalul fiecărui item și totalul general
  const totalPrice = cartBooks.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  return (
    <div className="cart-summary-container">
      <h2 className="cart-summary-title">Rezumat comenzii</h2>

      <div className="cart-items-list">
        {cartBooks.map((item: CartItem) => (
          <div key={item.book.id} className="cart-summary-item">
            <div className="item-info">
              <span className="item-title">{item.book.title}</span>
              <span className="item-author">{item.book.author}</span>
              <span className="item-quantity">
                x {item.quantity}
              </span>
            </div>
            <div className="item-price">
              {(item.book.price * item.quantity).toFixed(2)} €
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary-total">
        <span>Total</span>
        <span>{totalPrice.toFixed(2)} €</span>
      </div>

      <button className="checkout-button">Checkout</button>
    </div>
  );
};
