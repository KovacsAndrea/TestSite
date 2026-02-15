export interface User {
  uid: string;
  email: string;
  username: string;
  password: string;
}

export interface ServerResponse {
  ok: boolean;
  message: string;
}

export interface LoginResponse {
  ok: boolean;
  message: string;
  user: User;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  year: number;
  stock: number;
}

export interface CartItem {
  book: Book;
  quantity: number;
}