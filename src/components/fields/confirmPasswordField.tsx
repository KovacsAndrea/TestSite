import React, { useState, type Dispatch, type SetStateAction } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import "./fieldsStyling.css";

type ConfirmPasswordFieldProps = {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  password: string;
  otherPasswordIsInvalid: boolean;
  fullWidth?: boolean;
};

export const ConfirmPasswordField: React.FC<ConfirmPasswordFieldProps> = ({
  label,
  value,
  setValue,
  error,
  setError,
  fullWidth = true,
  password,
  otherPasswordIsInvalid
}) => {
    const [showPassword, setShowPassword] = useState(false);
        
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        if(newValue !== password){
            setError("Parolele nu se potrivesc.")
            return;
        }
        if(otherPasswordIsInvalid){
            setError("Parola nu e destul de puternica.")
            return;
        }
        setError("")
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="input-field">
        <TextField
            size = "small"
            label={label}
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={handleChange}
            error={!!error}
            helperText={error }
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
            },
        }}
        />
        </div>
  );
};
