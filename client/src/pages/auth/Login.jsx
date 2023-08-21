import React from "react";

const Login = () => {
    return (
        <form className=" flex flex-col gap-4">
            <label htmlFor="email">
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your email"
                    className="border-white py-2 px-4"
                />
            </label>
            <label htmlFor="password">
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your password"
                    className="border-white py-2 px-4"
                />
            </label>
        </form>
    );
};

export default Login;
