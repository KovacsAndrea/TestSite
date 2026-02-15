import { Request, Response } from "express";
import { addBookToCart, addBookToFaves, deleteAllUnitsFromCart, deleteBookFromCart, deleteBookFromFaves, findBooksByTitle, getAllBooks, getAllBooksFromCart, getFaveBooks, searchBooksByQuery } from "../services/bookService";


/** GET /books -> return all books OR search by query */
export const getBooks = (req: Request, res: Response) => {
  try {
    const query = req.query.title as string | undefined; // schimbăm param de la title -> q
    console.log("FETCH ALL BOOKS")
    console.log(query)
    if (query && query.trim().length > 0) {
      const foundBooks = searchBooksByQuery(query);
      return res.json(foundBooks);
    }

    const books = getAllBooks();
    return res.json(books);

  } catch (err) {
    console.error("Error getting books:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};

export const getFavoriteBooks = (req: Request, res: Response) => {
  try {
    const uid = req.params.uid;
    if (!uid) {
      return res.status(400).json({ ok: false, message: "Lipsește userId-ul." });
    }

    const faveBooks = getFaveBooks(uid);
    return res.json(faveBooks);

  } catch (err) {
    console.error("Error getting favorite books:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};

export const addBookToFavorites = (req: Request, res: Response) => {
  try {
    const { uid, bookid } = req.body;

    if (!uid || !bookid) {
      return res.status(400).json({ ok: false, message: "Lipesc uid sau bookId." });
    }

    const response = addBookToFaves(uid, bookid);
    return res.json(response);

  } catch (err) {
    console.error("Error adding book to favorites:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};


export const removeBookFromFavorites = (req: Request, res: Response) => {
  try {
    const { uid, bookid } = req.body;

    if (!uid || !bookid) {
      return res.status(400).json({ ok: false, message: "Lipesc uid sau bookId." });
    }

    const response = deleteBookFromFaves(uid, bookid);
    return res.json(response);

  } catch (err) {
    console.error("Error removing book from favorites:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};


//aici avem nevoie de: 
//get all books from cart for a user

export const getCartBooks = (req: Request, res: Response) => {
  try {
    const uid = req.params.uid;

    if (!uid) {
      return res.status(400).json({ ok: false, message: "Lipsește userId-ul." });
    }

    const cartBooks = getAllBooksFromCart(uid);

    return res.json(cartBooks);

  } catch (err) {
    console.error("Error getting cart books:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};


//add book to cart for a user (1 unit)
export const addBookToUserCart = (req: Request, res: Response) => {
  try {
    const { uid, bookid } = req.body;

    if (!uid || !bookid) {
      return res.status(400).json({ ok: false, message: "Lipsește uid sau bookId." });
    }

    addBookToCart(uid, bookid);

    return res.json({ ok: true, message: "Carte adăugată în coș." });

  } catch (err) {
    console.error("Error adding book to cart:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};


//remove book from cart for a use (1 unit) 
export const removeOneUnitFromCart = (req: Request, res: Response) => {
  try {
    const { uid, bookid } = req.body;

    if (!uid || !bookid) {
      return res.status(400).json({ ok: false, message: "Lipsește uid sau bookId." });
    }

    deleteBookFromCart(uid, bookid);

    return res.json({ ok: true, message: "Unitate eliminată din coș." });

  } catch (err) {
    console.error("Error removing unit from cart:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};


//remove books from cart for a use r(all units)
export const removeAllUnitsFromCart = (req: Request, res: Response) => {
  try {
    const { uid, bookid } = req.body;

    if (!uid || !bookid) {
      return res.status(400).json({ ok: false, message: "Lipsește uid sau bookId." });
    }

    deleteAllUnitsFromCart(uid, bookid);

    return res.json({ ok: true, message: "Cartea a fost eliminată complet din coș." });

  } catch (err) {
    console.error("Error removing all units from cart:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};
