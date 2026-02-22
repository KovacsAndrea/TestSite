import React, { useState, type Dispatch, type SetStateAction } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./fieldsStyling.css";

type PasswordFieldProps = {
  label: string;
  value: string;
  id:string,
  setValue: Dispatch<SetStateAction<string>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  fullWidth?: boolean;
};

export const NewPasswordField: React.FC<PasswordFieldProps> = ({
  label,
  value,
  id,
  setValue,
  error,
  setError,
  errorMessage,
  setErrorMessage,
  fullWidth = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rPLengthValidation, setRPLengthValidaiton] = useState ("")
  const [rPLowerCaseCharacter, setRPLowerCaseCharacter] = useState("")
  const [rPUpperCaseCharacter, setRPUpperCaseCharacter] = useState("")
  const [rPNumber, setRPNumber] = useState("")
  const [rPSpecialCharacter, setRPSpecialCharacter] = useState("")
  const rPLengthMessage = "Parola trebuie sa aiba minim 8 caractere."
  const rPLowerCaseCharacterMessage = "Parola trebuie sa contina o litera mica."
  const rPUpperCaseCharacterMessage = "Parola trebuie sa contina o litera mare."
  const rPNumberMessage = "Parola trebuie sa contina un numar."
  const rPSpecialCharacterMessage = "Parola trebuie sa contina un caracter special."
  const [showDropdown, setShowDropdown] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    //check if length is good 
    //check if has lower case character 
    //chesk if has upper case character 
    //check if has number
    //check if has special character
    //if all set error to good - adica no error
    setErrorMessage("")

    if(newValue == ""){
      setError(false);
      setRPLengthValidaiton("");
      setRPLowerCaseCharacter("");
      setRPUpperCaseCharacter("");
      setRPNumber("");
      setRPSpecialCharacter("");
      setShowDropdown(false);
      return;
    }
    setShowDropdown(true);
    const isLongEnough = newValue.length >= 8;
    const hasLower = /[a-z]/.test(newValue);
    const hasUpper = /[A-Z]/.test(newValue);
    const hasNumber = /[0-9]/.test(newValue);
    const hasSpecial = /[^A-Za-z0-9]/.test(newValue);

    setRPLengthValidaiton(isLongEnough ? "ok" : "error");
    setRPLowerCaseCharacter(hasLower ? "ok" : "error");
    setRPUpperCaseCharacter(hasUpper ? "ok" : "error");
    setRPNumber(hasNumber ? "ok" : "error");
    setRPSpecialCharacter(hasSpecial ? "ok" : "error");

    const isValid =
      isLongEnough && hasLower && hasUpper && hasNumber && hasSpecial && errorMessage.length == 0;

    setError(!isValid);
    
  };

  const ruleIcon = (status: string) => {
    if (status === "ok") return "✔️";
    if (status === "error") return "❌";
    return ""; // dacă input-ul e gol, nu afișăm nimic
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="input-field">
      <TextField
      id = {id}
      size = "small"
        label={label}
        variant="outlined"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={handleChange}
        helperText = {errorMessage}
        error={!!error || !!errorMessage}
        fullWidth={fullWidth}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => {
          if (value === "") setShowDropdown(false);
        }}
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
      {showDropdown && (
      <div className="password-dropdown">
        <p className={`password-paragraph-message ${rPLengthValidation}`}>
          {ruleIcon(rPLengthValidation)} {rPLengthMessage}
        </p>

        <p className={`password-paragraph-message ${rPLowerCaseCharacter}`}>
          {ruleIcon(rPLowerCaseCharacter)} {rPLowerCaseCharacterMessage}
        </p>

        <p className={`password-paragraph-message ${rPUpperCaseCharacter}`}>
          {ruleIcon(rPUpperCaseCharacter)} {rPUpperCaseCharacterMessage}
        </p>

        <p className={`password-paragraph-message ${rPNumber}`}>
          {ruleIcon(rPNumber)} {rPNumberMessage}
        </p>

        <p className={`password-paragraph-message ${rPSpecialCharacter}`}>
          {ruleIcon(rPSpecialCharacter)} {rPSpecialCharacterMessage}
        </p>
      </div>
    )}
    </div>
  );
};
