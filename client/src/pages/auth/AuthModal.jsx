import { useState } from "react";
import axios from "../../api/axios";
import Login from "./Login";
import SignUp from "./SignUp";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AuthModal = ({ isSignup, toggleAuthForms, toggleAuthModal }) => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordRep: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const onChange = (e) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value,
            };
        });
        setFormErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleAuthErrors(formData)) {
            try {
                const resp = await axios.post(
                    isSignup ? "/signup" : "/login",
                    formData,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );

                if (resp.status === 200 || 201) {
                    if (location?.pathname === "/discover") {
                        // TODO: set is loading to true instead of reload
                        return window.location.reload();
                    }

                    // console.log(resp?.data);
                    const accessToken = resp?.data;
                    setAuth({ accessToken });
                    toggleAuthModal();
                    navigate("/discover", {
                        replace: true,
                    });
                }
            } catch (error) {
                console.log(error);
                setFormErrors(error?.response?.data);
            }
        }
    };

    const handleAuthErrors = (formData) => {
        const authErrors = { email: "", password: "", passwordRep: "" };

        if (!formData.email) {
            authErrors.email = "Please enter an email";
            setFormErrors(authErrors);
            return false;
        }

        if (!formData.password) {
            authErrors.password = "Please enter a password";
            setFormErrors(authErrors);
            return false;
        }

        if (!formData.passwordRep && isSignup) {
            authErrors.passwordRep = "Repeat your password please";
            setFormErrors(authErrors);
            return false;
        }

        return true;
    };

    useState(() => {
        setFormErrors({});
    }, [isSignup]);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-stone-900 bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative max-w-xs w-full backdrop-blur bg-opacity-5 bg-white p-8 pb-12 rounded-3xl">
                <div className=" mb-5 flex rounded-xl overflow-hidden">
                    <button
                        className={`font-semibold w-1/2 py-1 hover:bg-sec transition-colors ${
                            isSignup ? "bg-sec" : ""
                        }`}
                        onClick={() => toggleAuthForms(true)}
                    >
                        Sign up
                    </button>
                    <button
                        className={`font-semibold w-1/2 py-1 hover:bg-sec transition-colors ${
                            !isSignup ? "bg-sec" : ""
                        }`}
                        onClick={() => toggleAuthForms(false)}
                    >
                        Log in
                    </button>
                </div>

                <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
                    {isSignup ? (
                        <SignUp
                            onChange={onChange}
                            formData={formData}
                            formErrors={formErrors}
                        />
                    ) : (
                        <Login
                            onChange={onChange}
                            formData={formData}
                            formErrors={formErrors}
                        />
                    )}
                    <button
                        type="submit"
                        className="text-white font-semibold bg-sec w-1/2 mx-auto py-1"
                    >
                        {isSignup ? "Sign up" : "Log in"}
                    </button>
                </form>
                <button
                    onClick={() => toggleAuthModal(isSignup)}
                    className="absolute block bg-sec font-semibold w-10 h-10 rounded-full -bottom-3 right-0 left-0 mx-auto 
                    hover:rotate-45 transition-transform
                    after:block after:w-4 after:h-[2px] after:bg-white after:left-0 after:right-1/2 after:mx-auto after:rotate-45 after:translate-y-[-1px]
                    before:translate-y-[1px] before:block before:w-4 before:h-[2px] before:bg-white before:left-0 before:right-1/2 before:mx-auto before:-rotate-45"
                ></button>
            </div>
        </div>
    );
};

export default AuthModal;
