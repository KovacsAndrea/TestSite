import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

export const CustomCheckbox = styled(Checkbox)(({ }) => ({
  '& .MuiSvgIcon-root': {
    display: 'none',
  },
  width: 20,
  height: 20,
  borderRadius: 6,
  border: '0px',
  backgroundColor: '#e2e2e2', // default unselected
  padding: '0',
  margin: '0.2em 0.2em 0.2em 1.5em',

  '&.Mui-checked': {
    backgroundColor: '#9c27b0', // main purple
    borderColor: '#9c27b0',
  },

  '&:hover': {
    backgroundColor: '#7b1fa2', // darker purple
  },
}));
