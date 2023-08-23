const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.approveRequestToken = async (req, res) => {
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;
    const reqToken = cookies?.requestToken;

    try {
        // evaluate jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                console.log(err);
                if (err) return res.sendStatus(403);

                const foundUser = await User.findById(decoded.id);
                const requestToken = await foundUser.requestTokenObj
                    .request_token;

                foundUser.requestTokenObj = {
                    isApproved: true,
                    request_token: requestToken,
                };
                await foundUser.save();
                return res.status(200).json(foundUser);
            }
        );
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};
