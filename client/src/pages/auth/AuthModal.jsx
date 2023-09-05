import { useEffect, useState } from "react";
import axios from "../../api/axios";
import Login from "./Login";
import SignUp from "./SignUp";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AuthModal = ({ isSignup, toggleAuthForms, toggleAuthModal }) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordRep: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [serverErr, setServerErr] = useState(null);
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
        setServerErr("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerErr("");
        setFormErrors({});
        if (handleAuthErrors(formData)) {
            setIsSubmit(true);
            try {
                const resp = await axios.post(
                    isSignup ? "/signup" : "/login",
                    formData,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );

                console.log(resp);
                if (resp.status === 200 || 201) {
                    if (location?.pathname === "/discover") {
                        // TODO: set is loading to true instead of reload
                        return window.location.reload();
                    }

                    // console.log(resp?.data);
                    const accessToken = resp?.data;
                    setAuth({ accessToken });
                    toggleAuthModal(false);
                    setFormData({
                        email: "",
                        password: "",
                        passwordRep: "",
                    });
                    setIsSubmit(false);

                    // navigate("/discover", {
                    //     replace: true,
                    // });
                }
            } catch (error) {
                console.log(error);
                if (error?.response?.data) {
                    setFormErrors(error?.response?.data);
                } else {
                    setServerErr("Server is not responding...");
                }
                setIsSubmit(false);
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

    useEffect(() => {
        setFormErrors({});
        setServerErr("");
    }, [isSignup]);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-stone-900 bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative max-w-xs w-full backdrop-blur bg-opacity-5 bg-white p-8 pb-12 rounded-3xl">
                <div
                    className={`max-w-xs w-full mx-auto relative ${
                        isSubmit ? "pointer-events-none" : ""
                    }`}
                >
                    {isSubmit ? (
                        <div className="flex items-center justify-center w-full h-full absolute top-0 left-0 animate-spin">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="50"
                                viewBox="0 0 24 24"
                                fill="white"
                            >
                                <path d="M13.75 22c0 .966-.783 1.75-1.75 1.75s-1.75-.784-1.75-1.75.783-1.75 1.75-1.75 1.75.784 1.75 1.75zm-1.75-22c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 10.75c.689 0 1.249.561 1.249 1.25 0 .69-.56 1.25-1.249 1.25-.69 0-1.249-.559-1.249-1.25 0-.689.559-1.25 1.249-1.25zm-22 1.25c0 1.105.896 2 2 2s2-.895 2-2c0-1.104-.896-2-2-2s-2 .896-2 2zm19-8c.551 0 1 .449 1 1 0 .553-.449 1.002-1 1-.551 0-1-.447-1-.998 0-.553.449-1.002 1-1.002zm0 13.5c.828 0 1.5.672 1.5 1.5s-.672 1.501-1.502 1.5c-.826 0-1.498-.671-1.498-1.499 0-.829.672-1.501 1.5-1.501zm-14-14.5c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm0 14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2z" />
                            </svg>
                        </div>
                    ) : (
                        ""
                    )}
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

                    <form
                        className={`flex flex-col gap-4 ${
                            isSubmit ? "opacity-60" : ""
                        }`}
                        onSubmit={handleSubmit}
                    >
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
                </div>
                {serverErr ? (
                    <p className=" first-letter:capitalize text-red-500 mt-4">
                        {serverErr}
                    </p>
                ) : (
                    ""
                )}
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
