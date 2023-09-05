const NotLogedNavbar = ({ toggleAuthModal }) => {
    return (
        <div className="flex sm:gap-4 gap-2">
            <button
                className="font-semibold border py-1 sm:px-6 px-4 rounded-xl hover:bg-sec transition-colors text-sm"
                onClick={() => toggleAuthModal(true)}
            >
                Sign up
            </button>
            <button
                className="font-semibold border py-1 sm:px-6 px-4 rounded-xl hover:bg-sec transition-colors text-sm sm:block hidden"
                onClick={() => toggleAuthModal(false)}
            >
                Log in
            </button>
        </div>
    );
};
export default NotLogedNavbar;
