import Navbar from "../NavbarFooter/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthModal from "../../pages/auth/AuthModal";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import Footer from "../NavbarFooter/Footer";
import Loader from "../UI/Loader";
import AskLoginModal from "../UI/AskLoginModal";
import { ArrowUp } from "../UI/svgIcons";

const MainLayout = () => {
    const { auth } = useAuth();
    const [isAuth, setIsAuth] = useState(false);
    const [isSignup, setIsSignup] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAskLogin, setIsAskLogin] = useState(false);
    const [isTopBtn, setIsTopBtn] = useState(false);
    const logout = useLogout();
    const location = useLocation();

    /**
     * Show or hide authentication modal with the clicked form turned on.
     * @param {boolean} passedIsSignup
     *
     */
    const toggleAuthModal = (passedIsSignup = null) => {
        if (passedIsSignup !== null) {
            setIsSignup(passedIsSignup);
        }
        setIsAuth((prev) => !prev);
    };

    /**
     * Toggle authentication forms
     * @param {*} passedIsSignup
     */
    const toggleAuthForms = (passedIsSignup) => {
        setIsSignup(passedIsSignup);
    };

    /**
     * Log out from account
     */
    const logoutHandle = () => {
        setIsLoading((prev) => !prev);
        logout();
    };

    /**
     * Whether to turn on the "login required" modal
     */
    const handleAskLoginModal = () => {
        if (isAskLogin) {
            setIsAskLogin(false);
        } else if (auth?.accessToken === false) {
            setIsAskLogin(true);
        }
    };

    /**
     * Scroll to top
     */
    const toTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Use effects
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 600;

            if (scrollPosition >= scrollThreshold) {
                setIsTopBtn(true);
            } else {
                setIsTopBtn(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
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

    // if (isLoading) return <Loader />;

    return (
        <div>
            <Navbar
                toggleAuthModal={toggleAuthModal}
                auth={auth}
                logoutHandle={logoutHandle}
                isTopBtn={isTopBtn}
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
            <Footer />
            <button
                onClick={toTop}
                className={`fixed bottom-5 bg-slate-700 w-10 h-10 rounded-full transition-all z-50 ${
                    isTopBtn ? "right-5" : "-right-full"
                }`}
            >
                <ArrowUp />
            </button>
        </div>
    );
};

export default MainLayout;
