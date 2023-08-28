import { Link, NavLink } from "react-router-dom";

const Navbar = ({ toggleAuthModal, auth, logoutHandle }) => {
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
                    to="/favorite"
                    className={({ isActive }) =>
                        isActive ? " underline font-bold" : ""
                    }
                >
                    Favorite
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
            <div className="flex gap-4">
                <button
                    className="font-semibold border py-1 px-6 rounded-xl hover:bg-sec transition-colors"
                    onClick={() => toggleAuthModal(true)}
                >
                    Sign up
                </button>
                <button
                    className="font-semibold border py-1 px-6 rounded-xl hover:bg-sec transition-colors"
                    onClick={() => toggleAuthModal(false)}
                >
                    Log in
                </button>
            </div>
        );
    };
    return (
        <header className="py-6 shadow-header relative z-10">
            <div className="container flex mx-auto items-center justify-between px-4">
                <Link to="/" className=" text-2xl font-extrabold">
                    CINE-ARCHIVE
                </Link>
                {auth?.accessToken ? <LogedIn /> : <NotLogedIn />}
            </div>
        </header>
    );
};

export default Navbar;
