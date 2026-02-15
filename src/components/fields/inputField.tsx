import { TextField } from "@mui/material";
import React, { useState, type Dispatch, type SetStateAction } from "react";
import "./fieldsStyling.css";

type InputFieldProps = {
    label: string;
    value: SetStateAction<string>;
    setValue: Dispatch<SetStateAction<string>>;
    validate?: (value: string) => string | null;
    error: string
    setError: Dispatch<SetStateAction<any>>;
    fullWidth?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    error,
    setError,
    setValue,
    validate,
    fullWidth = true,
}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        setError("")
        if(newValue.length == 0){
            setError("")
            return;
        }

        if (validate) {
            const validationResult = validate(newValue);
            setError(validationResult);
        }
    };

    return (
        <div className="input-field">
            <TextField
                size = "small"
                label={label}
                variant="outlined"
                type="text"
                value={value}
                onChange={handleChange}
                error={!!error}
                helperText={error ?? ""}
                fullWidth={fullWidth}
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
