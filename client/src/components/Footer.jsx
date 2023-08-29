import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="pt-16 pb-12 border-t-2 mt-32 px-4">
            <div className="container mx-auto px-4">
                <Link to="/" className=" text-2xl font-extrabold">
                    CINE-ARCHIVE
                </Link>
                <p>
                    Save movies, discover new titles, learn more things about
                    them.
                </p>
            </div>
        </div>
    );
};

export default Footer;
