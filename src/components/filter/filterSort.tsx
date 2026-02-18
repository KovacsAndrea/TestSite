
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import "./filterSortStyling.css";
import { useGlobalState } from "../../global/globalState";
import type { SortCategory, SortOrder } from "../../models/interfaces";
import { CustomRadio } from "./customRadio";
import { CustomCheckbox } from "./customCheck";

export const FilterSort: React.FC = () => {
  const {
    filters,
    sorting,
    updateFilters,
    updateSorting,
    lowestPrice,
    highestPrice,
    stockOnly,
    setStockOnly
  } = useGlobalState();

  // --- PRICE SLIDER ---
  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      updateFilters({ minPrice: newValue[0], maxPrice: newValue[1] });
    }
  };

  // --- SORT CATEGORY ---
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSorting({ category: event.target.value as SortCategory, order: sorting.order });
  };

  // --- SORT ORDER ---
  const handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSorting({ category: sorting.category, order: event.target.value as SortOrder });
  };


  return (
    <Box className="filter-sort-container">
      {/* -------- FILTER -------- */}
       <Box className="filter-section">
    <Typography className="section-title">Filter by</Typography>
    
    {/* --- Price Labels --- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          color: "#666",
          marginBottom: "4px",
        }}
      ><Typography className="radio-label" sx={{ marginBottom: "4px" }}>
        Price
      </Typography>
      <div>
      </div>
      </Box>
      <Slider
        value={[filters.minPrice, filters.maxPrice]}
        id = "filter-price-slide-bar"
        onChange={handlePriceChange}
        valueLabelDisplay="on" // <-- arată valorile curente în thumb
        min={lowestPrice}
        max={highestPrice}
        sx={{
          paddingTop: "2em",
          color: "#9c27b0",
          width: '80%',
          marginLeft: "1.5em",
          height: 2,
          "& .MuiSlider-thumb": { width: 18, height: 18 },
          "& .MuiSlider-valueLabel": {
            fontSize: "0.6rem",
            backgroundColor: "#9c27b0",
            color: "#fff",
            top: -10,
          },
        }}
      />
    </Box>


    <FormControlLabel
    control={
      <CustomCheckbox
        id = "filter-only-stock-checkbox"
        checked={stockOnly}
        onChange={(e) => setStockOnly(e.target.checked)}
      />
    }
    label="Doar cartile care sunt pe stoc"
  />
                 

      {/* -------- SORT CATEGORY -------- */}
      <Box className="sort-section">
        <Typography className="section-title">Sort By</Typography>

        <Typography className="radio-label">Criteria</Typography>
        <RadioGroup
          value={sorting.category}
          onChange={handleCategoryChange}
          className="radio-group"
          sx={{
            '& .MuiFormControlLabel-label': {
              fontSize: '0.85rem'
            }
          }}
        >
          <FormControlLabel value="none" control={<CustomRadio />} label="None" />
          <FormControlLabel value="title" control={<CustomRadio />} label="Title" />
          <FormControlLabel value="author" control={<CustomRadio />} label="Author" />
          <FormControlLabel value="year" control={<CustomRadio />} label="Year" />
          <FormControlLabel value="price" control={<CustomRadio />} label="Price" />
        </RadioGroup>

        <Typography className="radio-label">Order</Typography>
        <RadioGroup
          value={sorting.order}
          onChange={handleOrderChange}
          className="radio-group"
          sx={{
            '& .MuiFormControlLabel-label': {
              fontSize: '0.85rem'
            }
          }}
        >
          <FormControlLabel value="none" control={<CustomRadio />} label="None" />
          <FormControlLabel value="asc" control={<CustomRadio />} label="Ascending" />
          <FormControlLabel value="desc" control={<CustomRadio />} label="Descending" />
        </RadioGroup>
      </Box>
    </Box>
  );
};
