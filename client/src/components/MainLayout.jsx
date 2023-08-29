import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthModal from "../pages/auth/AuthModal";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import Footer from "./Footer";
import Loader from "./Loader";

const MainLayout = () => {
    const { auth } = useAuth();
    const [isAuth, setIsAuth] = useState(false);
    const [isSignup, setIsSignup] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const logout = useLogout();

    const toggleAuthModal = (passedIsSignup = null) => {
        if (passedIsSignup !== null) {
            setIsSignup(passedIsSignup);
        }
        setIsAuth((prev) => !prev);
    };

    const toggleAuthForms = (passedIsSignup) => {
        setFormErrors({});
        setIsSignup(passedIsSignup);
    };

    const logoutHandle = () => {
        setIsLoading((prev) => !prev);
        logout();
    };

    useEffect(() => {
        if (auth?.accessToken || auth?.accessToken === false) {
            setIsLoading(false);
        }
    }, [auth]);

    useEffect(() => {
        if (isAuth) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, [isAuth]);

    useEffect(() => {
        console.log(auth);
        if (auth?.accessToken || auth?.accessToken === false) {
            setIsLoading(false);
        }
    }, [auth]);

    if (isLoading) return <Loader />;
    return (
        <div>
            <Navbar
                toggleAuthModal={toggleAuthModal}
                auth={auth}
                logoutHandle={logoutHandle}
            />
            {isAuth ? (
                <AuthModal
                    isSignup={isSignup}
                    toggleAuthForms={toggleAuthForms}
                    toggleAuthModal={toggleAuthModal}
                />
            ) : (
                ""
            )}
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
