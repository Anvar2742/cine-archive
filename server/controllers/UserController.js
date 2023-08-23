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
                const accessableUserData = {
                    favoriteTitleIds: foundUser.favoriteTitleIds,
                    favoriteTitles: foundUser.favoriteTitles,
                    watchlistTitleIds: foundUser.watchlistTitleIds,
                    watchlistTitles: foundUser.watchlistTitles,
                };

                res.status(200).json(accessableUserData);
            }
        );
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};
