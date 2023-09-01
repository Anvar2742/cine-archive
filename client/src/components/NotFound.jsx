import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className=" h-screen w-screen flex items-center justify-center flex-col">
            <h1 className=" sm:text-6xl font-bold mb-4 text-3xl">Page not found</h1>
            <nav className=" flex gap-3">
                <Link
                    to="/discover"
                    className="inline-block bg-sec font-bold py-2 px-8 mt-4 transition-colors border-2 border-transparent hover:border-sec hover:bg-transparent"
                >
                    Discover
                </Link>
                <Link
                    to="/"
                    className="inline-block border-sec border-2 font-bold py-2 px-8 mt-4 transition-colors hover:bg-sec"
                >
                    Home
                </Link>
            </nav>
        </div>
    );
};

export default NotFound;
