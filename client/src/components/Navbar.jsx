import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ toggleAuthModal, auth, logoutHandle }) => {
    const [isLoged, setIsLoged] = useState(null);

    const LogedIn = () => {
        return (
            <nav className="flex gap-4">
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
                <button onClick={logoutHandle}>Sign out</button>
            </nav>
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
