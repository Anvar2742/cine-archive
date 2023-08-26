const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fetch = require("node-fetch");
const Title = require("../models/Title");
require("dotenv").config();

const BASE_URL =
    "https://api.themoviedb.org/3/account/" + process.env.ACCOUNT_ID;

const addToList = async (listType, body, sessionId) => {
    const url = `${BASE_URL}/${listType}?session_id=${sessionId}`;
    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: "Bearer " + process.env.TMDB_TOKEN,
        },
        body: JSON.stringify(body),
    };

    const resp = await fetch(url, options);
    const data = await resp.json();

    return data;
};

module.exports.add_remove_default_list = async (req, res) => {
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

                const foundMovie = Title.findOne({ titleId });

                if (!foundMovie) {
                    const createdTitle = await Title.create({ ...title });
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

module.exports.addRemoveWatchlist = async (req, res) => {
    const { title } = req.body;
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;

    try {
        if (!title?.id) return res.status(400).send("An id is required");
        // evaluate jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                console.log(err);
                if (err) return res.sendStatus(403);
                const foundUser = await User.findById(decoded.id);

                // Add or remove title id to user's watchlist
                const watchlistTitleIds = foundUser.watchlistTitleIds;
                if (!(watchlistTitleIds.indexOf(title?.id) === -1)) {
                    const titleIdIndex = foundUser.watchlistTitleIds.indexOf(
                        title?.id
                    );
                    foundUser.watchlistTitleIds.splice(titleIdIndex, 1);
                } else {
                    foundUser.watchlistTitleIds.push(title?.id);
                }

                // Add title to user's watchlist
                const titleIndex = containsObject(
                    title,
                    foundUser.watchlistTitles
                );

                if (!(titleIndex === -1)) {
                    foundUser.watchlistTitles.splice(titleIndex, 1);
                } else {
                    const updatedTitle = { ...title, isSaved: true };
                    foundUser.watchlistTitles.push(updatedTitle);
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
