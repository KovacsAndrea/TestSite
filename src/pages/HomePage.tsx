import React from "react";
import { NavbarComponent } from "../components/navBar/navBar";
import { CardGrid } from "../components/card/cardGrid";
import { useGlobalState } from "../global/globalState";

import "./pageStyle.css";
import { FilterSort } from "../components/filter/filterSort";
import { SearchBar } from "../components/search/searchBar";

export const HomePage: React.FC = () => {
  const { processedBooks } = useGlobalState();


  return (
    <>
      <NavbarComponent />

      <div className="flex-page-layout">
        <div className="twenty-panel">
          <FilterSort />
        </div>

        <div className="eighty-panel">
          <SearchBar />
          <CardGrid books={processedBooks} />
        </div>
      </div>
    </>
  );
};
