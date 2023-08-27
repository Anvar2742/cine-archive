const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Title = require("../models/Title");
require("dotenv").config();

// Cut out url to just image name
const cutOutImageName = (imageUrl) => {
    const index = imageUrl.lastIndexOf("/");
    const imageName = imageUrl.slice(index, imageUrl.length);

    return imageName;
};

module.exports.add_remove_default_lists = async (req, res) => {
    const { title, isFav, isWatch } = req.body;
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;

    try {
        if (!title) return res.status(400).send("Title is required");

        // evaluate jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                console.log(err);
                if (err) return res.status(403).json(err);
                const foundUser = await User.findById(decoded.id);
                const titleId = title?.id;

                // Add to fav ids of user if not there
                // or delete if there
                // console.log(isFav);
                if (isFav) {
                    const titleIndex = foundUser.favIds.indexOf(titleId);
                    if (titleIndex === -1) {
                        foundUser.favIds.push(titleId);
                    } else {
                        foundUser.favIds.splice(titleIndex, 1);
                    }
                    await foundUser.save();
                }

                // Add to watchlist ids of user if not there
                // or delete if there
                if (isWatch) {
                    const titleIndex = foundUser.watchIds.indexOf(titleId);
                    if (titleIndex === -1) {
                        foundUser.watchIds.push(titleId);
                    } else {
                        foundUser.watchIds.splice(titleIndex, 1);
                    }
                    await foundUser.save();
                }

                const foundMovie = await Title.findOne({ id: titleId });

                if (!foundMovie) {
                    title.backdrop_path = cutOutImageName(title.backdrop_path);
                    title.poster_path = cutOutImageName(title.poster_path);

                    const createdTitle = await Title.create(title);
                    if (!createdTitle) return res.sendStatus(400);
                    return res.sendStatus(201);
                }

                res.status(200).json(foundUser);
            }
        );
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

module.exports.get_collectioin_titles = async (req, res) => {
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;
    const { isFavPage } = req.body;

    try {
        // verify token
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.status(403).json(err);
                const foundUser = await User.findById(decoded.id);
                let idsForSearch;

                if (isFavPage) {
                    idsForSearch = foundUser.favIds;
                } else {
                    idsForSearch = foundUser.watchIds;
                }

                const titles = await Title.find({ id: { $in: idsForSearch } });

                if (!titles) return res.status(404);

                res.status(200).json(titles);
            }
        );
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
