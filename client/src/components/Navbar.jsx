import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header>
            <Link to="/" className=" text-2xl font-extrabold">
                CINE-ARCHIVE
            </Link>
            
        </header>
    );
};

export default Navbar;
