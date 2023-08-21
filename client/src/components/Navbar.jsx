import { Link } from "react-router-dom";

const Navbar = ({ toggleAuthModal }) => {
    return (
        <header className="py-6 shadow-header">
            <div className="container flex mx-auto items-center justify-between">
                <Link to="/" className=" text-2xl font-extrabold">
                    CINE-ARCHIVE
                </Link>
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
            </div>
        </header>
    );
};

export default Navbar;
