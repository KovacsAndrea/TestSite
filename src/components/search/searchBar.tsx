import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { useGlobalState } from "../../global/globalState";
import "./searchStyling.css";

export const SearchBar: React.FC = () => {
  const { fetchBooks } = useGlobalState();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  // 📌 dacă icon-ul e X și user modifică input-ul, revenim la lupă
  useEffect(() => {
  // dacă search e activ (icon X) și user modifică textul -> revenim la lupă
  if (searchActive && searchQuery !== "") {
    setSearchActive(false);
  }
  if(searchQuery === ""){
    fetchBooks()
  }

}, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;

    setSearchActive(true);
    fetchBooks(searchQuery.trim());
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchActive(false); 
    fetchBooks(); 
  };

  // 📌 handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !searchActive) {
      handleSearch();
    }
  };

  return (
    <Box className="search-bar-container">
      <InputBase
        placeholder="Cauta carti..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="search-input"
        fullWidth
      />
      <IconButton
        className="search-button"
        onClick={searchActive ? handleClear : handleSearch}
      >
        {searchActive ? (
          <CloseIcon className="search-icon" />
        ) : (
          <SearchIcon className="search-icon" />
        )}
      </IconButton>
    </Box>
  );
};
