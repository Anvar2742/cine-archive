import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ toggleAuthModal, auth, logoutHandle }) => {
    const [isLoged, setIsLoged] = useState(null);

    const LogedIn = () => {
        const [isMobileMenu, setIsMobileMenu] = useState(false);

        const handleMobileMenu = () => {
            setIsMobileMenu((prev) => !prev);
        };
        return (
            <>
                <button
                    className={`sm:hidden block`}
                    onClick={handleMobileMenu}
                >
                    menu
                </button>
                {isMobileMenu ? (
                    <div className=" fixed w-full h-full bg-black bg-opacity-40 top-0 left-0"></div>
                ) : (
                    ""
                )}
                <div
                    className={`flex sm:gap-4 gap-2 fixed sm:static right-0 left-0 mx-auto transform top-0 transition-all duration-500 ${
                        isMobileMenu ? " animate-curtain-down duration-150" : "-translate-y-[120%]"
                    }  phone:w-3/4 w-full h-1/2 bg-primary sm:bg-transparent flex-col sm:flex-row items-center justify-center rounded-b-3xl shadow-header`}
                >
                    <nav
                        className={`flex sm:gap-4 gap-2 flex-col sm:flex-row items-center`}
                    >
                        <NavLink
                            to="/discover"
                            className={({ isActive }) =>
                                isActive ? " underline font-bold" : ""
                            }
                        >
                            Discover
                        </NavLink>
                        <NavLink
                            to="/seen"
                            className={({ isActive }) =>
                                isActive ? " underline font-bold" : ""
                            }
                        >
                            Seen
                        </NavLink>
                        <NavLink
                            to="/watchlist"
                            className={({ isActive }) =>
                                isActive ? " underline font-bold" : ""
                            }
                        >
                            Watchlist
                        </NavLink>
                    </nav>
                    <button onClick={logoutHandle}>Sign out</button>
                    <button
                        onClick={handleMobileMenu}
                        className="absolute block bg-sec font-semibold w-10 h-10 rounded-full -bottom-3 right-0 left-0 mx-auto 
                hover:rotate-45 transition-transform
                after:block after:w-4 after:h-[2px] after:bg-white after:left-0 after:right-1/2 after:mx-auto after:rotate-45 after:translate-y-[-1px]
                before:translate-y-[1px] before:block before:w-4 before:h-[2px] before:bg-white before:left-0 before:right-1/2 before:mx-auto before:-rotate-45"
                    ></button>
                </div>
            </>
        );
    };
    const NotLogedIn = () => {
        return (
            <div className="flex sm:gap-4 gap-2">
                <button
                    className="font-semibold border py-1 sm:px-6 px-4 rounded-xl hover:bg-sec transition-colors text-lg"
                    onClick={() => toggleAuthModal(true)}
                >
                    Sign up
                </button>
                <button
                    className="font-semibold border py-1 sm:px-6 px-4 rounded-xl hover:bg-sec transition-colors text-lg sm:block hidden"
                    onClick={() => toggleAuthModal(false)}
                >
                    Log in
                </button>
            </div>
        );
    };

    useEffect(() => {
        if (auth?.accessToken) {
            setIsLoged(true);
        } else if (auth?.accessToken === false) {
            setIsLoged(false);
        }
    }, [auth]);

    return (
        <header className="flex items-center shadow-header relative z-10 h-20">
            <div className="container flex mx-auto items-center justify-between px-4">
                <Link
                    to="/"
                    className="sm:text-2xl text-xl font-extrabold leading-5"
                >
                    CINE <span className="block sm:inline">ARCHIVE</span>
                </Link>
                {isLoged ? <LogedIn /> : <NotLogedIn />}
            </div>
        </header>
    );
};

export default Navbar;
