import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import AuthModal from "../pages/auth/AuthModal";

const MainLayout = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isSignup, setIsSignup] = useState(null);

    const toggleAuthModal = (passedIsSignup) => {
        setIsSignup(passedIsSignup);
        setIsAuth((prev) => !prev);
    };

    const switchSignUpLogin = (passedIsSignup) => {
        setIsSignup(passedIsSignup);
    };
    return (
        <div>
            <Navbar toggleAuthModal={toggleAuthModal} />
            {isAuth ? (
                <AuthModal
                    isSignup={isSignup}
                    switchSignUpLogin={switchSignUpLogin}
                    toggleAuthModal={toggleAuthModal}
                />
            ) : (
                ""
            )}
            <Outlet />
        </div>
    );
};

export default MainLayout;
