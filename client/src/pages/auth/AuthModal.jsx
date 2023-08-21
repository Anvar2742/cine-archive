import Login from "./Login";
import SignUp from "./SignUp";

const AuthModal = ({ isSignup, switchSignUpLogin, toggleAuthModal }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-stone-900 bg-opacity-75 flex justify-center items-center">
            <div>
                <button onClick={() => toggleAuthModal(isSignup)} className=" block ml-auto mb-4 bg-sec font-bold w-6 h-6">X</button>
                <div className=" mb-5 flex rounded-xl overflow-hidden">
                    <button
                        className={`font-semibold w-1/2 py-1 hover:bg-sec ${
                            isSignup ? "bg-sec" : ""
                        }`}
                        onClick={() => switchSignUpLogin(true)}
                    >
                        Sign up
                    </button>
                    <button
                        className={`font-semibold w-1/2 py-1 hover:bg-sec ${
                            !isSignup ? "bg-sec" : ""
                        }`}
                        onClick={() => switchSignUpLogin(false)}
                    >
                        Log in
                    </button>
                </div>
                {isSignup ? <SignUp /> : <Login />}
            </div>
        </div>
    );
};

export default AuthModal;
