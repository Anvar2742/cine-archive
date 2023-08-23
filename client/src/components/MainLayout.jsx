import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthModal from "../pages/auth/AuthModal";
import useAuth from "../hooks/useAuth";

const MainLayout = () => {
    const { auth } = useAuth();
    const [isAuth, setIsAuth] = useState(false);
    const [isSignup, setIsSignup] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const toggleAuthModal = (passedIsSignup) => {
        setIsSignup(passedIsSignup);
        setIsAuth((prev) => !prev);
    };

    const switchSignUpLogin = (passedIsSignup) => {
        setIsSignup(passedIsSignup);
    };

    useEffect(() => {
        console.log(auth);
        if (auth?.accessToken) {
            setIsLoading(false);
        }
    }, [auth]);

    if (isLoading) return <div>Loading...</div>;
    return (
        <div>
            <Navbar toggleAuthModal={toggleAuthModal} auth={auth} />
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
