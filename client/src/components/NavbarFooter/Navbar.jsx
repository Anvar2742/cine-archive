import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogedNavbar from "./LogedNavbar";
import NotLogedNavbar from "./NotLogedNavbar";
import SearchBar from "./SearchBar";

const Navbar = ({ toggleAuthModal, auth, logoutHandle, isTopBtn }) => {
    const [isLoged, setIsLoged] = useState(null);

    useEffect(() => {
        if (auth?.accessToken) {
            setIsLoged(true);
        } else if (auth?.accessToken === false) {
            setIsLoged(false);
        }
    }, [auth]);

    return (
        <header
            className={`flex items-center z-10 fixed left-0 top-0 w-full transition-all ${
                isTopBtn ? "bg-primary shadow-xs-custom h-11" : "h-16"
            }
            ${location?.pathname === "/" ? "" : "bg-primary shadow-sm-custom"}`}
        >
            <div className="container flex mx-auto items-center justify-between px-4 relative">
                <Link
                    to="/"
                    className="sm:text-2xl text-xl font-extrabold leading-5"
                >
                    CINE <span className="block sm:inline">ARCHIVE</span>
                </Link>

                <div className="flex gap-5 items-center">
                    <SearchBar />
                    {isLoged ? (
                        <LogedNavbar logoutHandle={logoutHandle} />
                    ) : (
                        <NotLogedNavbar toggleAuthModal={toggleAuthModal} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
