import { getAllUsers } from "./userService";

export function validateUid(uid: string): boolean {
  const users = getAllUsers();
  return users.some(user => user.uid === uid);
}

import { getAllBooks } from "./bookService";
import { Book } from "../models/models";

export function validateBookid(bookid: string): Book | null {
  const books = getAllBooks();
  const book = books.find(b => b.id === bookid);
  return book || null;
}

