const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fetch = require("node-fetch");
const ENV = process.env.ENV;

require("dotenv").config();

// Error handling
const handleErrors = (err) => {
    console.log(err);
    const errors = { email: "", password: "" };
    // User already exists
    if (err.code === 11000) {
        errors.email = "User already exists, please log in.";
        return errors;
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    if (err.message.includes("incorrect password")) {
        errors.password = "Incorrect Password";
    }

    if (err.message.includes("No user with this email")) {
        errors.email = "No user with this email";
    }

    return errors;
};

const handleEmpty = (email, password, passwordRep = null) => {
    const errors = { email: "", password: "", passwordRep: "" };
    if (!email) {
        errors.email = "Please enter an email.";
        return errors;
    }
    if (!password) {
        errors.password = "Please enter a password.";
        return errors;
    }
    if (!passwordRep && passwordRep !== null) {
        errors.passwordRep = "Please repeat your password.";
    }

    return errors;
};

const createJWT = (user) => {
    // create JWTs
    const accessToken = jwt.sign(
        {
            UserInfo: {
                email: user.email,
                id: user._id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
    );
    const refreshToken = jwt.sign(
        { email: user.email, id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    );

    return { accessToken, refreshToken };
};

module.exports.signup_post = async (req, res) => {
    const { email, password, passwordRep } = req.body;

    try {
        const emptyErrors = handleEmpty(email, password, passwordRep);
        if (
            emptyErrors.email ||
            emptyErrors.password ||
            emptyErrors.passwordRep
        ) {
            return res.status(400).json(emptyErrors);
        }
        // Hash pass
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);

        const createdUser = await User.create({ email, password: hashedPass });

        const { accessToken, refreshToken } = createJWT(createdUser);

        // Saving refreshToken with current user
        createdUser.refreshToken = refreshToken;
        await createdUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            // secure: true,
            // sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json(accessToken);
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.status(400).json(errors);
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const emptyErrors = handleEmpty(email, password);
        if (emptyErrors.email || emptyErrors.password) {
            return res.status(400).json(emptyErrors);
        }

        const logedInUser = await User.login(email, password);

        if (!logedInUser) return res.sendStatus(401);

        const { accessToken, refreshToken } = createJWT(logedInUser);
        // Saving refreshToken with current user
        logedInUser.refreshToken = refreshToken;
        await logedInUser.save();

        // Creates Secure Cookie with refresh token
        await res.cookie("jwt", refreshToken, {
            httpOnly: true,
            // secure: true,
            // sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json(accessToken);
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.status(400).json(errors);
    }
};

module.exports.refresh = async (req, res) => {
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;
    if (!refreshToken) return res.sendStatus(401);
    // console.log(refreshToken);

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden
    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            // console.log(foundUser);
            if (err || foundUser.email !== decoded.email)
                return res.sendStatus(403);
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: decoded.username,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "10s" }
            );
            res.json({ accessToken });
        }
    );
};
