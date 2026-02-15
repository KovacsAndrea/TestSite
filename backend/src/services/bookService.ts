import fs from "fs";
import path from "path";
import { Book, ServerResponse, CartItem } from "../models/models";
import { validateUid, validateBookid } from "./validators";

const BOOKS_FILE = path.join(__dirname, "../db/books.txt");
const FAVE_BOOKS_FILE = path.join(__dirname, "../db/favorites.txt");
const CART_FILE = path.join(__dirname, "../db/cart.txt");

/** Return all books from DB as objects */
export function getAllBooks(): Book[] {
  if (!fs.existsSync(BOOKS_FILE)) return [];

  const lines = fs.readFileSync(BOOKS_FILE, "utf8").trim().split("\n");

  return lines
    .filter(line => line.trim().length > 0)
    .map(line => {
      try {
        const book: Book = JSON.parse(line);
        return book;
      } catch (err) {
        console.error("Error parsing book line:", line, err);
        return null;
      }
    })
    .filter((b): b is Book => b !== null); // Type guard
}

/** Find books by title (case-insensitive, partial match) */
export function findBooksByTitle(title: string): Book[] {
  const books = getAllBooks();
  const search = title.trim().toLowerCase();

  if (!search) return [];

  return books.filter(b => b.title.toLowerCase().includes(search));
}

/** Find books by author (case-insensitive, partial match) */
export function findBooksByAuthor(author: string): Book[] {
  const books = getAllBooks();
  const search = author.trim().toLowerCase();

  if (!search) return [];

  return books.filter(b => b.author.toLowerCase().includes(search));
}


/** Search books by title OR author (case-insensitive, partial match) */
export function searchBooksByQuery(query: string): Book[] {
  const titleResults = findBooksByTitle(query);
  const authorResults = findBooksByAuthor(query);
  console.log("TITLE RESULTS")
  console.log(titleResults)
  console.log("AUTHOR RESULTS")
  console.log(authorResults)

  // merge results și elimină duplicate după id
  const merged: Record<string, Book> = {};

  [...titleResults, ...authorResults].forEach((b) => {
    merged[b.id] = b; // dacă există deja, suprascrie -> eliminate duplicates
  });

  return Object.values(merged);
}

export function getFaveBooks(uid: string): Book[] {
  if (!fs.existsSync(FAVE_BOOKS_FILE)) return [];

  // 1️⃣ Citim toate liniile din favorites.txt
  const lines = fs.readFileSync(FAVE_BOOKS_FILE, "utf8")
    .trim()
    .split("\n")
    .filter(line => line.trim().length > 0);
  // 2️⃣ Extragem toate bookIds pentru userul respectiv
  const favoriteBookIds = new Set(
    lines
      .map(line => {
        const [userId, bookId] = line.split("|");
        return userId === uid ? bookId : null;
      })
      .filter((id): id is string => id !== null)
  );

  if (favoriteBookIds.size === 0) return [];

  // 3️⃣ Luăm toate cărțile
  const allBooks = getAllBooks();

  // 4️⃣ Filtrăm doar cele care sunt în favorites
  const faveBooks = allBooks.filter(book =>
    favoriteBookIds.has(book.id)
  );

  return faveBooks;
}


export function isBookFavorite(uid: string, bookId: string): boolean {
  if (!fs.existsSync(FAVE_BOOKS_FILE)) return false;

  const lines = fs.readFileSync(FAVE_BOOKS_FILE, "utf8")
    .trim()
    .split("\n")
    .filter(line => line.trim().length > 0);

  return lines.some(line => line === `${uid}|${bookId}`);
}


export function writeBookToFavesFile(uid: string, bookid: string): boolean {
  try {
    fs.appendFileSync(FAVE_BOOKS_FILE, `${uid}|${bookid}\n`, { encoding: "utf8" });
    return true;
  } catch (err) {
    console.error("Error writing favorite:", err);
    return false;
  }
}


export function deleteBookFromFavesFile(uid: string, bookid: string): boolean {
  try {
    if (!fs.existsSync(FAVE_BOOKS_FILE)) return false;

    const lines = fs.readFileSync(FAVE_BOOKS_FILE, "utf8")
      .trim()
      .split("\n")
      .filter(line => line.trim().length > 0);

    const filtered = lines.filter(line => line !== `${uid}|${bookid}`);

    fs.writeFileSync(FAVE_BOOKS_FILE, filtered.join("\n") + "\n", "utf8");
    return true;
  } catch (err) {
    console.error("Error deleting favorite:", err);
    return false;
  }
}



export function addBookToFaves(uid: string, bookid: string): ServerResponse {
  // 1️⃣ Validăm user
  if (!validateUid(uid)) {
    return { ok: false, message: "Nu s-a găsit userul." };
  }

  // 2️⃣ Validăm carte
  const book = validateBookid(bookid);
  if (!book) {
    return { ok: false, message: "Nu s-a găsit cartea." };
  }

  // 3️⃣ Verificăm dacă deja e în favorite
  if (isBookFavorite(uid, bookid)) {
    return { ok: false, message: "Cartea este deja în favorite." };
  }

  // 4️⃣ Scriem în fisier
  const success = writeBookToFavesFile(uid, bookid);

  if (success) {
    return { ok: true, message: "Cartea a fost adăugată la favorite." };
  } else {
    // În mod normal nu ar trebui să ajungem aici dacă folosim isBookFavorite
    return { ok: false, message: "Ceva nu a mers bine. Încearcă din nou." };
  }
}


export function deleteBookFromFaves(uid: string, bookid: string): ServerResponse {
  // 1️⃣ Validăm user
  if (!validateUid(uid)) {
    return { ok: false, message: "Nu s-a găsit userul." };
  }

  // 2️⃣ Validăm carte
  const book = validateBookid(bookid);
  if (!book) {
    return { ok: false, message: "Nu s-a găsit cartea." };
  }

  // 3️⃣ Verificăm dacă cartea există în favorite
  if (!isBookFavorite(uid, bookid)) {
    return { ok: false, message: "Cartea nu se află în favorite." };
  }

  // 4️⃣ Ștergem efectiv din fișier
  const success = deleteBookFromFavesFile(uid, bookid);

  if (success) {
    return { ok: true, message: "Cartea a fost eliminată din favorite." };
  } else {
    // În mod normal nu ar trebui să ajungem aici dacă folosim isBookFavorite
    return { ok: false, message: "Ceva nu a mers bine. Încearcă din nou." };
  }
}

/* ========================= */
/* ===== READ HELPERS ====== */
/* ========================= */

function readCartFile(): string[] {
  if (!fs.existsSync(CART_FILE)) {
    fs.writeFileSync(CART_FILE, "");
  }

  const content = fs.readFileSync(CART_FILE, "utf-8");
  return content
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

function writeCartFile(lines: string[]) {
  fs.writeFileSync(CART_FILE, lines.join("\n"));
}

/* ============================= */
/* ===== GET ALL BOOKS ========= */
/* ============================= */

export function getAllBooksFromCart(uid: string): CartItem[] {
  if (!validateUid(uid)) return []; // user invalid

  if (!fs.existsSync(CART_FILE)) return [];

  const lines = fs.readFileSync(CART_FILE, "utf8")
    .trim()
    .split("\n")
    .filter(line => line.trim().length > 0);

  // luăm toate cărțile disponibile
  const allBooks = getAllBooks();

  // construim array-ul de cart items
  const cartItems: CartItem[] = [];

  for (const line of lines) {
    const [userId, bookId, qtyStr] = line.split("|");
    if (userId !== uid) continue;

    const quantity = parseInt(qtyStr, 10);
    const book = allBooks.find(b => b.id === bookId);
    if (book) {
      cartItems.push({ book, quantity });
    }
  }

  return cartItems;
}

/* ============================= */
/* ===== ADD BOOK ============== */
/* ============================= */

export function addBookToCart(uid: string, bookId: string) {
  validateUid(uid);
  validateBookid(bookId);

  const lines = readCartFile();
  let found = false;

  const updatedLines = lines.map(line => {
    const [userId, bId, quantity] = line.split("|");

    if (userId === uid && bId === bookId) {
      found = true;
      return `${uid}|${bookId}|${Number(quantity) + 1}`;
    }

    return line;
  });

  if (!found) {
    updatedLines.push(`${uid}|${bookId}|1`);
  }

  writeCartFile(updatedLines);
}

/* ============================= */
/* ===== DELETE ONE UNIT ======= */
/* ============================= */

export function deleteBookFromCart(uid: string, bookId: string) {
  validateUid(uid);
  validateBookid(bookId);

  const lines = readCartFile();

  const updatedLines = lines.flatMap(line => {
    const [userId, bId, quantity] = line.split("|");

    if (userId === uid && bId === bookId) {
      const qty = Number(quantity);

      if (qty > 1) {
        return [`${uid}|${bookId}|${qty - 1}`];
      }

      return []; // sterge linia daca era 1
    }

    return [line];
  });

  writeCartFile(updatedLines);
}

/* ============================= */
/* ===== DELETE ALL UNITS ====== */
/* ============================= */

export function deleteAllUnitsFromCart(uid: string, bookId: string) {
  validateUid(uid);
  validateBookid(bookId);

  const lines = readCartFile();

  const updatedLines = lines.filter(line => {
    const [userId, bId] = line.split("|");
    return !(userId === uid && bId === bookId);
  });

  writeCartFile(updatedLines);
}

/* ============================= */
/* ===== LOW LEVEL WRITE ======= */
/* ============================= */

export function writeBookToCartFile(uid: string, bookId: string) {
  validateUid(uid);
  validateBookid(bookId);

  const lines = readCartFile();
  lines.push(`${uid}|${bookId}|1`);
  writeCartFile(lines);
}

export function removeBookFrom(uid: string, bookId: string) {
  validateUid(uid);
  validateBookid(bookId);

  const lines = readCartFile();

  const updatedLines = lines.filter(line => {
    const [userId, bId] = line.split("|");
    return !(userId === uid && bId === bookId);
  });

  writeCartFile(updatedLines);
}
