const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.single_user_get = async (req, res) => {
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;

    try {
        // evaluate jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                console.log(err);
                if (err) return res.sendStatus(403);

                const foundUser = await User.findById(decoded.id);

                res.status(200).json(foundUser);
            }
        );
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};
