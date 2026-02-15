import { useState } from "react";
import { LoginRegisterComponent } from "../components/login/loginComponent"
import './pageStyle.css'
export const LoginRegisterPage: React.FC = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(true);

    return (
        

        <>
        <div className="full-view-height-full-view-width-page center-center-flex">
            <LoginRegisterComponent 
            isLoggingin = {isLoggingIn} 
            setIsLoggingIn={setIsLoggingIn}
            />
            
        </div>
        
        </>
    )
}