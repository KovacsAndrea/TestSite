import { Router } from "express";
import { addBookToFavorites, addBookToUserCart, getBooks, getCartBooks, getFavoriteBooks, removeAllUnitsFromCart, removeBookFromFavorites, removeOneUnitFromCart } from "../controllers/bookController";

const bookRouter = Router();

/** GET /books -> all books OR search by title */
bookRouter.get("/", getBooks);

/** FAVORITES */
bookRouter.get("/favorites/:uid", getFavoriteBooks);
bookRouter.post("/favorites/add", addBookToFavorites);
bookRouter.delete("/favorites/remove", removeBookFromFavorites);

/** CART */
bookRouter.get("/cart/:uid", getCartBooks);
bookRouter.post("/cart/add", addBookToUserCart);
bookRouter.patch("/cart/remove-one", removeOneUnitFromCart);
bookRouter.delete("/cart/remove-all", removeAllUnitsFromCart);

export default bookRouter;
