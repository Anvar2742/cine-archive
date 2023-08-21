import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="py-6 shadow-header">
            <div className="container flex mx-auto items-center justify-between">
                <Link to="/" className=" text-2xl font-extrabold">
                    CINE-ARCHIVE
                </Link>
                <div className="flex gap-4">
                    <button className="font-semibold border py-1 px-6 rounded-xl hover:bg-sec transition-colors">
                        Sign up
                    </button>
                    <button className="font-semibold border py-1 px-6 rounded-xl hover:bg-sec transition-colors">
                        Log in
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
