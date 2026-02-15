export interface User {
    uid: string,
    email: string,
    username: string,
    password: string,
}

export interface ServerResponse {
    ok: boolean,
    message: string
}

export interface LoginResponse {
    ok: boolean, 
    message: string,
    user: User
}

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  year: number;
  stock: number,
}

export type SortCategory = "none" | "title" | "author" | "year" | "price";
export type SortOrder = "none" | "asc" | "desc";

export interface Filters {
  minPrice: number;
  maxPrice: number;
}

export interface Sorting {
  category: SortCategory;
  order: SortOrder;
}

export interface CartItem {
  book: Book;
  quantity: number;
}