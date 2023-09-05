import { useState } from "react";
import { NavLink } from "react-router-dom";

const LogedNavbar = ({ logoutHandle }) => {
    const [isMobileMenu, setIsMobileMenu] = useState(false);

    const handleMobileMenu = () => {
        setIsMobileMenu((prev) => !prev);
    };

    return (
        <>
            <button className={`sm:hidden block`} onClick={handleMobileMenu}>
                menu
            </button>
            {isMobileMenu ? (
                <div className=" fixed w-full h-full bg-black bg-opacity-40 top-0 left-0 sm:hidden"></div>
            ) : (
                ""
            )}
            <div
                className={`flex sm:gap-4 gap-2 fixed sm:static right-0 left-0 mx-auto sm:mx-0 top-0 transition-all sm:transition-none duration-500 ${
                    isMobileMenu
                        ? " animate-curtain-down duration-150"
                        : "-translate-y-[120%] sm:translate-y-0"
                } sm:w-auto phone:w-3/4 w-full h-1/2 bg-primary sm:bg-transparent flex-col sm:flex-row items-center justify-center sm:justify-end rounded-b-3xl shadow-sm-custom sm:shadow-none`}
            >
                <nav
                    className={`flex sm:gap-4 gap-2 flex-col sm:flex-row items-center`}
                >
                    <NavLink
                        to="/discover"
                        className={({ isActive }) =>
                            isActive
                                ? " underline font-bold text-xl sm:text-base"
                                : " text-xl sm:text-base"
                        }
                    >
                        Discover
                    </NavLink>
                    <NavLink
                        to="/seen"
                        className={({ isActive }) =>
                            isActive
                                ? " underline font-bold text-xl sm:text-base"
                                : " text-xl sm:text-base"
                        }
                    >
                        Seen
                    </NavLink>
                    <NavLink
                        to="/watchlist"
                        className={({ isActive }) =>
                            isActive
                                ? " underline font-bold text-xl sm:text-base"
                                : " text-xl sm:text-base"
                        }
                    >
                        Watchlist
                    </NavLink>
                </nav>
                <button
                    onClick={logoutHandle}
                    className="text-xl sm:text-base whitespace-nowrap"
                >
                    Sign out
                </button>
                <button
                    onClick={handleMobileMenu}
                    className="absolute block bg-sec font-semibold w-10 h-10 rounded-full -bottom-3 right-0 left-0 mx-auto 
            hover:rotate-45 transition-transform
            after:block after:w-4 after:h-[2px] after:bg-white after:left-0 after:right-1/2 after:mx-auto after:rotate-45 after:translate-y-[-1px]
            before:translate-y-[1px] before:block before:w-4 before:h-[2px] before:bg-white before:left-0 before:right-1/2 before:mx-auto before:-rotate-45 sm:hidden"
                ></button>
            </div>
        </>
    );
};

export default LogedNavbar;
