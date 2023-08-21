import React from "react";

const SignUp = ({ onChange, formData, formErrors }) => {
    return (
        <>
            <label htmlFor="email">
                Email
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your email"
                    className="border-white py-2 px-4 block mb-1 w-full text-primary"
                    onChange={onChange}
                    value={formData?.email}
                />
                <p className=" text-red-500 font-semibold">
                    {formErrors?.email}
                </p>
            </label>
            <label htmlFor="password">
                Password
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your password"
                    className="border-white py-2 px-4 block mb-1 w-full text-primary"
                    onChange={onChange}
                    value={formData?.password}
                />
                <p className=" text-red-500 font-semibold">
                    {formErrors?.password}
                </p>
            </label>
            <label htmlFor="passwordRep">
                Repeat password
                <input
                    type="password"
                    name="passwordRep"
                    id="passwordRep"
                    placeholder="Repeat your password"
                    className="border-white py-2 px-4 block mb-1 w-full text-primary"
                    onChange={onChange}
                    value={formData?.passwordRep}
                />
                <p className=" text-red-500 font-semibold">
                    {formErrors?.passwordRep}
                </p>
            </label>
        </>
    );
};

export default SignUp;
