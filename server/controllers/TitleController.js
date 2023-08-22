const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.addToFavorites = async (req, res) => {
    const { titleId } = req.body;
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;

    try {
        if (!titleId) return res.status(400).send("And id is required");
        // evaluate jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                console.log(err);
                if (err) return res.sendStatus(403);

                const foundUser = await User.findById(decoded.id);
                foundUser.favoriteTitles.push(titleId);
                await foundUser.save();

                res.status(200).json(foundUser);
            }
        );
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};
