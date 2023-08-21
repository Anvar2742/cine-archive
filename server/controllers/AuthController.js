const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Error handling
const handleErrors = (err) => {
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

    return errors;
};

const handleEmpty = (email, password, passwordRep = null) => {
    const errors = { email: "", password: "" };
    if (!email) {
        errors.email = "Please enter an email.";
        return errors;
    }
    if (!password) {
        errors.password = "Please enter a password.";
        return errors;
    }
    if (!passwordRep && passwordRep !== null) {
        errors.password = "Please repeat your password.";
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

    return refreshToken;
};

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hash pass
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);

        const createdUser = await User.create({ email, password: hashedPass });

        const refreshToken = createJWT(createdUser);

        // Saving refreshToken with current user
        createdUser.refreshToken = refreshToken;
        await createdUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json(createdUser);
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
        if (emptyErrors.email && emptyErrors.password) {
            return res.status(400).json(emptyErrors);
        }

        const logedInUser = await User.login(email, password);
        const auth = bcrypt.compare(password, logedInUser.password);

        if (!auth) return res.sendStatus(401);

        const refreshToken = createJWT(logedInUser);
        // Saving refreshToken with current user
        logedInUser.refreshToken = refreshToken;

        res.status(200).json(logedInUser);
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.status(400).json(errors);
    }
};
