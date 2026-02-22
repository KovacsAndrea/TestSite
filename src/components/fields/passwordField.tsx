import React, { useState, type Dispatch, type SetStateAction } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./fieldsStyling.css";

type PasswordFieldProps = {
  label: string;
  value: string;
  id:string,
  setValue: Dispatch<SetStateAction<string>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  fullWidth?: boolean;
};

export const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  value,
  id,
  setValue,
  error,
  setError,
  fullWidth = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setError("")
    if(newValue.length == 0){
      setError("")
    }

  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="input-field">
      <TextField
        id={id}
        size = "small"
        label={label}
        variant="outlined"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={handleChange}
        error={!!error}
        helperText={error ?? ""}
        fullWidth={fullWidth}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
         sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor:
              value === ""
                ? ""              
                : error
                ? "red"          
                : "green",       
          },
          "&:hover fieldset": {
            borderColor:
              value === ""
                ? "" 
                : error
                ? "red"
                : "green",
          },
          "&.Mui-focused fieldset": {
            borderColor:
              value === ""
                ? "" 
                : error
                ? "red"
                : "green",
          },
        }
      }}
      />
    </div>
  );
};
