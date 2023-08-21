import Login from "./Login";
import SignUp from "./SignUp";

const AuthModal = ({ isSignup, switchSignUpLogin }) => {
    return (
        <div className=" fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-stone-900 bg-opacity-75 flex justify-center items-center">
            <div>
                <div className=" mb-5 flex">
                    <button
                        className={`font-semibold w-1/2 py-1 hover:bg-sec ${isSignup ? "bg-sec" : ""}`}
                        onClick={() => switchSignUpLogin(true)}
                    >
                        Sign up
                    </button>
                    <button
                        className={`font-semibold w-1/2 py-1 hover:bg-sec ${!isSignup ? "bg-sec" : ""}`}
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
