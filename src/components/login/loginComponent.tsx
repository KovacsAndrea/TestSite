import "../componentStyling.css"
import { InputField } from "../fields/inputField"
import { Validators } from "../../models/validators"
import { useState, type Dispatch, type SetStateAction } from "react"
import { PasswordField } from "../fields/passwordField"
import { NewPasswordField } from "../fields/newPasswordField"
import { ConfirmPasswordField } from "../fields/confirmPasswordField"
import { useGlobalState } from "../../global/globalState"
import { Link, useNavigate } from "react-router-dom"

export const LoginRegisterComponent: React.FC<{
    isLoggingin: SetStateAction<boolean>
    setIsLoggingIn: Dispatch<SetStateAction<boolean>>;
}> = ({
    isLoggingin,
    setIsLoggingIn
}) => {
    const navigate = useNavigate()
    const {registerUser, loginUser, user} = useGlobalState();

    //states for LOGIN
    //LOGIN - EMAIL ADDRESS
    const [loginEmailAddress, setLoginEmailAddress] = useState("")
    const [loginEmailAddressError, setLoginEmailAddressError] = useState("");
    //LOGIN - PASSWORD
    const [loginPassword, setLoginPassword] = useState("")
    const [loginPasswordError, setLoginPasswordError] = useState("");


    //states for REGISTERING
    //REGISTER - EMAIL ADDRESS
    const [registerEmailAddress, setRegisterEmailAddress] = useState("")
    const [registerEmailAddressError, setRegisterEmailAddressError] = useState("")
    //REGISTER - USERNAME
    const [registerUsername, setRegisterUsername] = useState("")
    const [registerUsernameError, setRegisterUsernameError] = useState("")
    //REGISTER - PASSWORD
    const [registerPassword, setRegisterPassword] = useState("")
    const [rPError, setRPError] = useState("")
    const [rPIsInvalid, setRPIsInvalid] = useState(false)
    //REGISTER - CONFIRM PASSWORD
    const [registerRepeatPassword, setRegisterRepeatPassword] = useState("")
    const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] = useState("")

    //login and register attempts response
    const [failedLoginResponse, setFailedLoginResponse] = useState("")
    const [failedRegisterResponse, setFailedRegisterResponse] = useState("") 

    const userIsRegistering = () => {
        //change window
        setIsLoggingIn(!isLoggingin)
        //clear login data once we switch between tabs
        setLoginEmailAddress("")
        setLoginPassword("")
        //clear login errors once we switch between tabs
        setLoginEmailAddressError("")
        setLoginPasswordError("")

        //clear register data once we switch between tabs
        setRegisterEmailAddress("")
        setRegisterUsername("")
        setRegisterPassword("")
        setRegisterRepeatPassword("")
        //clear register errors once we switch between tabs 
        setRegisterEmailAddressError("")
        setRegisterUsernameError("")
        setRPError("")
        setRPIsInvalid(false)
        setRepeatPasswordErrorMessage("")

        //clear the failed attempt message
        setFailedLoginResponse("")
        setFailedRegisterResponse("")
    }

    const validateFieldRequired = (fieldvalue: any, fieldErrorMessage: any, setFieldErrorMessage: any) => {
        if(!fieldErrorMessage){ 
            let newErrorMessage = Validators.required(fieldvalue);
            setFieldErrorMessage(newErrorMessage);
        }
    }

    const loginAttemptIsValid = () => {
        return(
            !loginEmailAddressError && 
            !loginPasswordError
        )
    }

    const tryLogin = async() => {
        //clear any error from previous attempts
        setFailedLoginResponse("")

        //check if fields are not empty, unless they have a previous logic error
        validateFieldRequired(loginEmailAddress, loginEmailAddressError, setLoginEmailAddressError)
        validateFieldRequired(loginPassword, loginPasswordError, setLoginPasswordError)

        if(loginAttemptIsValid()){
            if(loginEmailAddress.length > 0 && loginPassword.length > 0){
                    const response = await loginUser(loginEmailAddress, loginPassword)
            if(response.ok){
                navigate('/home')
            }
            else{
                setFailedLoginResponse(response.message)
            }
            }
        }
         
    }
    const registrationAttemptIsvalid = () => {
        return (
            !registerEmailAddressError && 
            !registerUsernameError && 
            !rPError && 
            !rPIsInvalid &&
            !repeatPasswordErrorMessage
        )
    }

    const tryRegister = async () => {
        //clear any error from previous attempts
        setFailedRegisterResponse("")

        //check if fields are not empty, unless they have a previous logic error
        validateFieldRequired(registerEmailAddress, registerEmailAddressError, setRegisterEmailAddressError);
        validateFieldRequired(registerUsername, registerUsernameError, setRegisterUsernameError);
        validateFieldRequired(registerPassword, rPError, setRPError);
        validateFieldRequired(registerRepeatPassword, repeatPasswordErrorMessage, setRepeatPasswordErrorMessage);
        
        if (registrationAttemptIsvalid()) {
            const response = await registerUser(registerEmailAddress, registerUsername, registerPassword);
            if(response.ok){
                navigate("/home")
            }else{
                setFailedRegisterResponse(response.message)
            }
        }
    }

    return (
        <>
            <>
                {isLoggingin ? (
                    <div id = "login-component-container" className="login-register-component center-center-flex">
                    <h1 id="login-title" className="login-component-title">Log In</h1>
                    <InputField 
                    id="login-email-input-field"
                    key="log-in-email" 
                    label="Email" 
                    value={loginEmailAddress} 
                    setValue={setLoginEmailAddress} 
                    error={loginEmailAddressError}
                    setError={setLoginEmailAddressError}
                    validate={Validators.email}
                    />
                    
                    <PasswordField 
                    id="login-password-input-field"
                    key = "login-password"
                    label = "Password"
                    value = {loginPassword}
                    setValue = {setLoginPassword}
                    error = {loginPasswordError}
                    setError= {setLoginPasswordError}
                    />
                    <p id = "login-error-message" className="small-text color-red">{failedLoginResponse}</p>
                    <button id="login-button" onClick={tryLogin}>Log in</button>
                    <div className="center-center-flex flex-row"  style={{ gap: "4px" }}> <p className="small-text">Don't have an account?</p> <a id = "register-link" onClick={userIsRegistering}>Register Now</a> </div>
                    <Link id="login-guest-link" to="/home">Visit as guest</Link>  
                    </div>
                    ) 
                    : 
                    (
                    <div id = "register-component-container" className="login-register-component center-center-flex">
                    <h1 id = "register-title" className="login-component-title">Register</h1>
                    <InputField 
                    id="register-email-input-field"
                    key="register-email" 
                    label="Email" 
                    value={registerEmailAddress} 
                    setValue={setRegisterEmailAddress}
                    validate={Validators.email}
                    error = {registerEmailAddressError}
                    setError={setRegisterEmailAddressError}
                    />
                    <InputField 
                    id="register-usename-input-field"
                    key="register-username" 
                    label="Username" 
                    value={registerUsername} 
                    setValue={setRegisterUsername} 
                    error= {registerUsernameError}
                    setError = {setRegisterUsernameError}
                    />
                    <NewPasswordField 
                    id="register-password-input-field"
                    key="register-password"
                    label = "Password"
                    value = {registerPassword}
                    setValue={setRegisterPassword}
                    error = {rPIsInvalid}
                    setError={setRPIsInvalid}
                    errorMessage= {rPError}
                    setErrorMessage = {setRPError}
                    />
                    
                    <ConfirmPasswordField 
                    id="register-confirm-password-input-field"
                    key="register-confirm-password"
                    label= "Confirm Passowrd" 
                    value={registerRepeatPassword} 
                    setValue={setRegisterRepeatPassword} 
                    error={repeatPasswordErrorMessage} 
                    setError={setRepeatPasswordErrorMessage}
                    password= {registerPassword}
                    otherPasswordIsInvalid = {rPIsInvalid} 
                    />
                    <p id = "register-error-message" className="small-text color-red">{failedRegisterResponse}</p>
                    <button id = "register-button" onClick={tryRegister}>Register</button>
                    <div className="center-center-flex flex-row"  style={{ gap: "4px" }}> <p className="small-text">Already have an account?</p> <a id = "login-link" onClick={userIsRegistering}>Log in</a> </div>
                    <Link id="register-guest-link" to="/home">Visit as guest</Link> 
                    </div>
                    )}
                                 
                 
            </>
 
        </>
    )
}