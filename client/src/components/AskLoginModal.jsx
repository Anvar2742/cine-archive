import { Link } from "react-router-dom";

const AskLoginModal = ({ handleAskLoginModal }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-stone-900 bg-opacity-75 flex justify-center items-center">
            <div className=" max-w-xs w-full bg-primary p-6 rounded-xl shadow-header text-center relative pb-12">
                <h3 className=" text-4xl font-bold mb-2">Log in required</h3>
                <p>Log in to add movies to your lists.</p>
                <Link
                    to="/auth"
                    className="font-semibold border py-1 sm:px-6 px-4 rounded-xl hover:bg-sec transition-colors text-lg mt-4 inline-block"
                >
                    Log in
                </Link>
                <button
                    onClick={handleAskLoginModal}
                    className="absolute block bg-sec font-semibold w-10 h-10 rounded-full -bottom-3 right-0 left-0 mx-auto 
                    hover:rotate-45 transition-transform
                    after:block after:w-4 after:h-[2px] after:bg-white after:left-0 after:right-1/2 after:mx-auto after:rotate-45 after:translate-y-[-1px]
                    before:translate-y-[1px] before:block before:w-4 before:h-[2px] before:bg-white before:left-0 before:right-1/2 before:mx-auto before:-rotate-45"
                ></button>
            </div>
        </div>
    );
};

export default AskLoginModal;
