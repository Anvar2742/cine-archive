import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthModal from "../pages/auth/AuthModal";
import useAuth from "../hooks/useAuth";
import useApproveReqToken from "../hooks/useApproveReqToken";
import { useEffectOnce } from "./../hooks/useEffectOnce";
import useLogout from "../hooks/useLogout";

const MainLayout = () => {
    const { auth } = useAuth();
    const [isAuth, setIsAuth] = useState(false);
    const [isSignup, setIsSignup] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const urlParams = new URLSearchParams(window.location.search);
    const reqTokenFromQuery = urlParams.get("request_token");
    const isTokenApproved = urlParams.get("approved");
    const approveReqToken = useApproveReqToken(
        reqTokenFromQuery,
        isTokenApproved
    );
    const logout = useLogout();

    useEffectOnce(() => {
        if (reqTokenFromQuery && isTokenApproved) {
            approveReqToken();
        }
    }, []);

    const toggleAuthModal = (passedIsSignup = null) => {
        if (passedIsSignup !== null) {
            setIsSignup(passedIsSignup);
        }
        setIsAuth((prev) => !prev);
    };

    const switchSignUpLogin = (passedIsSignup) => {
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
        if (auth?.accessToken || auth?.accessToken === false) {
            setIsLoading(false);
        }
    }, [auth]);

    if (isLoading) return <div>Loading...</div>;
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
