import Radio from "@mui/material/Radio";
import { styled } from "@mui/material/styles";

export const CustomRadio = styled(Radio)(({ }) => ({
  '& .MuiSvgIcon-root': {
    display: 'none',
  },
  width: 20,
  height: 20,
  borderRadius: 6,
  border: '0px',
  backgroundColor: '#e2e2e2', // default unselected
  padding: '0',
  margin: "0.2em",

  '&.Mui-checked': {
    backgroundColor: '#9c27b0', // main purple
    borderColor: '#9c27b0',
  },

  '&:hover': {
    backgroundColor: '#7b1fa2', // darker purple on hover
  },
}));
