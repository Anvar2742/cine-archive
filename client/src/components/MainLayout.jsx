import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthModal from "../pages/auth/AuthModal";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import Footer from "./Footer";
import Loader from "./Loader";
import AskLoginModal from "./AskLoginModal";
import { ArrowUp } from "./svgIcons";

const MainLayout = () => {
    const { auth } = useAuth();
    const [isAuth, setIsAuth] = useState(false);
    const [isSignup, setIsSignup] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAskLogin, setIsAskLogin] = useState(false);
    const [isTopBtn, setIsTopBtn] = useState(false);
    const logout = useLogout();
    const location = useLocation();

    const toggleAuthModal = (passedIsSignup = null) => {
        if (passedIsSignup !== null) {
            setIsSignup(passedIsSignup);
        }
        setIsAuth((prev) => !prev);
    };

    const toggleAuthForms = (passedIsSignup) => {
        setIsSignup(passedIsSignup);
    };

    const logoutHandle = () => {
        setIsLoading((prev) => !prev);
        logout();
    };

    const handleAskLoginModal = () => {
        if (isAskLogin) {
            setIsAskLogin(false);
        } else if (auth?.accessToken === false) {
            setIsAskLogin(true);
        }
    };

    const toTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // You can also use 'auto' or 'instant'
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY || window.pageYOffset;
            const scrollThreshold = 300; // Adjust this value as needed

            if (scrollPosition >= scrollThreshold) {
                // console.log(
                //     "Scrolled by " + scrollThreshold + " pixels or more."
                // );
                // Perform your desired action here
                setIsTopBtn(true);
            } else {
                setIsTopBtn(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
        // console.log(auth);
        if (auth?.accessToken || auth?.accessToken === false) {
            setIsLoading(false);
        }
    }, [auth]);

    useEffect(() => {
        if (isAskLogin) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, [isAskLogin]);

    useEffect(() => {
        setIsAskLogin(false);
    }, [location?.pathname]);

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

            {isAskLogin ? (
                <AskLoginModal handleAskLoginModal={handleAskLoginModal} />
            ) : (
                ""
            )}
            <Outlet context={{ handleAskLoginModal }} />
            {location?.pathname === "/" ? "" : <Footer />}
            <button
                onClick={toTop}
                className={`fixed bottom-5 bg-slate-700 w-10 h-10 rounded-full transition-all ${
                    isTopBtn ? "right-5" : "-right-full"
                }`}
            >
                <ArrowUp />
            </button>
        </div>
    );
};

export default MainLayout;
