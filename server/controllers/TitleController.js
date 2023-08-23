const jwt = require("jsonwebtoken");
const User = require("../models/User");

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return i;
        }
    }

    return -1;
}

module.exports.addToFavorites = async (req, res) => {
    const { title } = req.body;
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;

    try {
        if (!title?.id) return res.status(400).send("And id is required");
        // evaluate jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                console.log(err);
                if (err) return res.sendStatus(403);
                const foundUser = await User.findById(decoded.id);

                // Add or remove title id to user's favorites
                const favoriteTitleIds = foundUser.favoriteTitleIds;
                if (!(favoriteTitleIds.indexOf(title?.id) === -1)) {
                    const titleIdIndex = foundUser.favoriteTitleIds.indexOf(
                        title?.id
                    );
                    foundUser.favoriteTitleIds.splice(titleIdIndex, 1);
                } else {
                    foundUser.favoriteTitleIds.push(title?.id);
                }

                // Add title to user's favorite
                const titleIndex =
                    containsObject(title, foundUser.favoriteTitles) === -1;
                if (!titleIndex) {
                    foundUser.favoriteTitles.splice(titleIndex, 1);
                } else {
                    foundUser.favoriteTitles.push(title);
                }

                await foundUser.save();

                res.status(200).json(foundUser);
            }
        );
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};
