import { Link } from "react-router-dom";

const AskLoginModal = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-stone-900 bg-opacity-75 flex justify-center items-center">
            <div className=" max-w-xs w-full bg-primary p-6 rounded-xl shadow-header text-center">
                <h3 className=" text-4xl font-bold mb-2">Log in required</h3>
                <p>Log in to add movies to your lists.</p>
                <Link
                    to="/auth"
                    className="ont-semibold bg-sec py-1 px-4 mt-4 mx-auto inline-block rounded-full"
                >
                    Log in
                </Link>
            </div>
        </div>
    );
};

export default AskLoginModal;
