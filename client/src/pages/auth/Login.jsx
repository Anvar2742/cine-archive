import React from "react";

const Login = ({ onChange, formData }) => {
    return (
        <>
            <label htmlFor="email">
                Email
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your email"
                    className="border-white py-2 px-4 block w-full text-primary"
                    onChange={onChange}
                    value={formData?.email}
                />
            </label>
            <label htmlFor="password">
                Password
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your password"
                    className="border-white py-2 px-4 block w-full text-primary"
                    onChange={onChange}
                    value={formData?.password}
                />
            </label>
        </>
    );
};

export default Login;
