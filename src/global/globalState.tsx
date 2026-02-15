import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
} from "react";

import type {
  LoginResponse,
  ServerResponse,
  User,
  Book,
  Filters,
  Sorting,
  CartItem,
} from "../models/interfaces";

interface GlobalState {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;

  books: Book[];
  processedBooks: Book[];
  faveBooks: Book[];
  cartBooks: CartItem[];

  filters: Filters;
  sorting: Sorting;

  highestPrice: number;
  lowestPrice: number;

  fetchBooks: (searchQuery?: string) => Promise<void>;
  updateFilters: (filters: Filters) => void;
  updateSorting: (sorting: Sorting) => void;

  fetchFaveBooks: (uid: string) => Promise<void>;
  addBookToFaves: (bookId: string) => Promise<ServerResponse>
  removeBookFromFaves: (bookId: string) => Promise<ServerResponse>
  
  fetchCartBooks: (uid: string) => Promise<void>;
  addBookToCart: (bookId: string) => Promise<ServerResponse>;
  removeBookFromCart: (bookId: string) => Promise<ServerResponse>;
  removeAllBooksFromCart: (bookId: string) => Promise<ServerResponse>;

  stockOnly: boolean;
  setStockOnly: Dispatch<SetStateAction<boolean>>;

  registerUser: (
    email: string,
    username: string,
    password: string
  ) => Promise<ServerResponse>;

  loginUser: (
    email: string,
    password: string
  ) => Promise<ServerResponse>;

  logoutUser: () => void;
}

export const GlobalStateContext =
  createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const backendUrl = "http://localhost:3001";

  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [processedBooks, setProcessedBooks] = useState<Book[]>([]);
  const [faveBooks, setFaveBooks] = useState<Book[]>([]);
  const [cartBooks, setCartBooks] = useState<CartItem[]>([]);

  const [lowestPrice, setLowestPrice] = useState<number>(0);
  const [highestPrice, setHighestPrice] = useState<number>(0);
  const [stockOnly, setStockOnly] = useState(false)

  const [filters, setFilters] = useState<Filters>({
    minPrice: 0,
    maxPrice: 0,
  });

  const [sorting, setSorting] = useState<Sorting>({
    category: "none",
    order: "none",
  });

  // ----------------- CORE PROCESS FUNCTION -----------------
  const applyFiltersAndSorting = (
    booksList: Book[],
    currentFilters: Filters,
    currentSorting: Sorting
  ) => {
    console.log("APPLYING FILTERS AND SORTING!")
    let result = [...booksList];

    // FILTER
    result = result.filter(
      (b) =>
        b.price >= currentFilters.minPrice &&
        b.price <= currentFilters.maxPrice
    );

    // SORT
    // 1️⃣ Push out-of-stock books to the bottom
    result.sort((a, b) => {
      if (a.stock === 0 && b.stock > 0) return 1;
      if (a.stock > 0 && b.stock === 0) return -1;
      return 0; // dacă ambele au stock >0 sau ambele 0, rămâne ordinea
    });

    // 2️⃣ Apply normal sorting only if a criteria is selected
    if (currentSorting.category !== "none" && currentSorting.order !== "none") {
      result.sort((a, b) => {
        let comparison = 0;

        switch (currentSorting.category) {
          case "title":
            comparison = a.title.localeCompare(b.title);
            break;
          case "author":
            comparison = a.author.localeCompare(b.author);
            break;
          case "year":
            comparison = a.year - b.year;
            break;
          case "price":
            comparison = a.price - b.price;
            break;
        }

        // 3️⃣ Keep out-of-stock at bottom even after sorting
        // Daca stock e diferit, override sort
        if (a.stock === 0 && b.stock > 0) return 1;
        if (a.stock > 0 && b.stock === 0) return -1;

        return currentSorting.order === "asc" ? comparison : -comparison;
      });
    }

    setProcessedBooks(result);
  };

// ----------------- FETCH BOOKS -----------------
const fetchBooks = async (searchQuery?: string) => {
  try {
    let url = `${backendUrl}/books`;

    // dacă avem query, adaugăm param-ul title
    if (searchQuery && searchQuery.trim() !== "") {
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      url += `?title=${encodedQuery}`;
    }

    console.log("FETCHING BOOKS FROM:", url);

    const response = await fetch(url);
    const data: Book[] = await response.json();

    setBooks(data);

    if (data.length > 0) {
      const prices = data.map((b) => b.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);

      setLowestPrice(min);
      setHighestPrice(max);

      const initialFilters = { minPrice: min, maxPrice: max };
      setFilters(initialFilters);

      applyFiltersAndSorting(data, initialFilters, sorting);
    } else {
      // dacă nu s-au găsit cărți, aplicăm tot filtrarea și sorting-ul pe array gol
      applyFiltersAndSorting([], filters, sorting);
    }

  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

  // ----------------- FETCH FAVE BOOKS -----------------
  const fetchFaveBooks = async (uid?: string) => {
    console.log("FETCHING FAVE BOOKS")
    if (!uid && user) uid = user.uid; // fallback dacă nu e trecut ca param
    if (!uid) return;

    try {
      const response = await fetch(`${backendUrl}/books/favorites/${uid}`);
      if (!response.ok) throw new Error("Failed to fetch favorite books");

      const data: Book[] = await response.json();
      setFaveBooks(data);
    } catch (error) {
      console.error("Error fetching favorite books:", error);
      setFaveBooks([]);
    }
  }; 

  // ----------------- FETCH CART BOOKS -----------------
  const fetchCartBooks = async (uid?: string) => {
    console.log("FETCHING CART BOOKS");
    if (!uid && user) uid = user.uid; // fallback dacă nu e trecut ca param
    if (!uid) return;

    try {
      const response = await fetch(`${backendUrl}/books/cart/${uid}`);
      if (!response.ok) throw new Error("Failed to fetch cart books");

      const data: CartItem[] = await response.json();
      setCartBooks(data);
    } catch (error) {
      console.error("Error fetching cart books:", error);
      setCartBooks([]);
    }
  };

  // only call fetch at mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("USE EFFECT ON MOUNT")
    if (storedUser) {
       const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchFaveBooks(parsedUser.uid);
      fetchCartBooks(parsedUser.uid)
      fetchBooks();
    }
    
  }, []);

  // ----------------- UPDATE FILTER -----------------
  const updateFilters = (newFilters: Filters) => {
    console.log("UPDATING FILTERS")
    setFilters(newFilters);
    applyFiltersAndSorting(books, newFilters, sorting);
  };

  // ----------------- UPDATE SORT -----------------
  const updateSorting = (newSorting: Sorting) => {
    console.log("UPDATING SORTING")
    setSorting(newSorting);
    applyFiltersAndSorting(books, filters, newSorting);
  };

  //update faves
  //add faves

  // ----------------- ADD FAVE BOOK -----------------
  const addBookToFaves = async (bookid: string): Promise<ServerResponse> => {
    console.log("ADDING BOOK TO FAVES")
    if (!user) return { ok: false, message: "Trebuie sa te loghezi prima data!" };

    try {
      const response = await fetch(`${backendUrl}/books/favorites/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid, bookid }),
      });

      const data: ServerResponse = await response.json();

      if (data.ok) {
        // refresh favorite books
        await fetchFaveBooks();
      }

      return data;
    } catch (error) {
      console.error("Error adding book to favorites:", error);
      return { ok: false, message: "A apărut o eroare la server." };
    }
  };

  // ----------------- REMOVE FAVE BOOK -----------------
  const removeBookFromFaves = async (bookid: string): Promise<ServerResponse> => {
    console.log("REMOVING BOOK FROM FAVES")
    if (!user) return { ok: false, message: "Trebuie sa te loghezi prima data!" };

    try {
      const response = await fetch(`${backendUrl}/books/favorites/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid, bookid }),
      });

      const data: ServerResponse = await response.json();

      if (data.ok) {
        // refresh favorite books
        await fetchFaveBooks();
      }

      return data;
    } catch (error) {
      console.error("Error removing book from favorites:", error);
      return { ok: false, message: "A apărut o eroare la server." };
    }
  };

  //update cart

  // ----------------- ADD BOOK TO CART -----------------
  const addBookToCart = async (bookid: string): Promise<ServerResponse> => {
    console.log("ADDING BOOK TO CART");
    if (!user) return { ok: false, message: "Trebuie sa te loghezi prima data!" };

    try {
      const response = await fetch(`${backendUrl}/books/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid, bookid }),
      });

      const data: ServerResponse = await response.json();

      if (data.ok) {
        await fetchCartBooks(); // refresh cart
      }

      return data;
    } catch (error) {
      console.error("Error adding book to cart:", error);
      return { ok: false, message: "A apărut o eroare la server." };
    }
  };

  // ----------------- REMOVE ONE UNIT FROM CART -----------------
  const removeBookFromCart = async (bookid: string): Promise<ServerResponse> => {
    console.log("REMOVING ONE UNIT FROM CART");
    if (!user) return { ok: false, message: "Trebuie sa te loghezi prima data!" };

    try {
      const response = await fetch(`${backendUrl}/books/cart/remove-one`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid, bookid }),
      });

      const data: ServerResponse = await response.json();

      if (data.ok) {
        await fetchCartBooks(); // refresh cart
      }

      return data;
    } catch (error) {
      console.error("Error removing book from cart:", error);
      return { ok: false, message: "A apărut o eroare la server." };
    }
  };

  // ----------------- REMOVE ALL UNITS FROM CART -----------------
  const removeAllBooksFromCart = async (bookid: string): Promise<ServerResponse> => {
    console.log("REMOVING ALL UNITS FROM CART");
    if (!user) return { ok: false, message: "Trebuie sa te loghezi prima data!" };

    try {
      const response = await fetch(`${backendUrl}/books/cart/remove-all`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid, bookid }),
      });

      const data: ServerResponse = await response.json();

      if (data.ok) {
        await fetchCartBooks(); // refresh cart
      }

      return data;
    } catch (error) {
      console.error("Error removing all units from cart:", error);
      return { ok: false, message: "A apărut o eroare la server." };
    }
  };
  // ----------------- USER FUNCTIONS -----------------
  const registerUser = async (
    email: string,
    username: string,
    password: string
  ): Promise<ServerResponse> => {
    console.log("REGISTERING USER")
    try {
      const response = await fetch(`${backendUrl}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
      const data: ServerResponse | LoginResponse = await response.json();
      if(data.ok && "user" in data){
        setUser(data.user)
        localStorage.setItem("user", JSON.stringify(data.user));
        fetchBooks();
      }
      
      return data;
    } catch (error) {
      return {
        ok: false,
        message: "A apărut o eroare la conectarea cu serverul.",
      };
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<ServerResponse> => {
    console.log("LOGGING USER IN")
    try {
      const response = await fetch(`${backendUrl}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse =
        await response.json();

      if (data.ok && data.user) {
        setUser(data.user)
        localStorage.setItem("user", JSON.stringify(data.user));
        fetchFaveBooks(data.user.uid)
        fetchCartBooks(data.user.uid)
        fetchBooks();
      };

      return data;
    } catch (error) {
      return {
        ok: false,
        message: "A apărut o eroare la conectarea cu serverul.",
      };
    }
  };

  const logoutUser = () => {
    console.log("LOGGING USER OUT")
    localStorage.removeItem("user");
    setUser(null);
    setFaveBooks([]);
  }

  const state: GlobalState = {
    user,
    setUser,
    books,
    processedBooks,
    faveBooks,
    cartBooks,

    filters,
    sorting,
    highestPrice,
    lowestPrice,

    fetchBooks,
    updateFilters,
    updateSorting,
    stockOnly,
    setStockOnly,

    fetchFaveBooks,
    addBookToFaves,
    removeBookFromFaves,

    fetchCartBooks,
    addBookToCart,
    removeBookFromCart,
    removeAllBooksFromCart,

    registerUser,
    loginUser,
    logoutUser
  };

  return (
    <GlobalStateContext.Provider value={state}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const ctx = useContext(GlobalStateContext);
  if (!ctx)
    throw new Error(
      "useGlobalState must be used inside GlobalStateProvider"
    );
  return ctx;
};
