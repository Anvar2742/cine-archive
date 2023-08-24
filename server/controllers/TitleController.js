const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fetch = require("node-fetch");

const addToFavorites = async (body, sessionId) => {
    const url = `https://api.themoviedb.org/3/account/16104096/favorite?session_id=${sessionId}`;
    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWYzYWFmNGY1ZTk4YzRkMTJlM2VjZTI4NDI4NzFiZiIsInN1YiI6IjYzN2Y4Mjg0MjI5YWUyMTU1NDI2NTEyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lM2ZBMJJoT0GkS4xdQlRcxK0AjR9DBzxYN1t0c9_hyw",
        },
        body: JSON.stringify(body),
    };

    const resp = await fetch(url, options);
    const data = await resp.json();

    return data;
};

module.exports.add_to_favs = async (req, res) => {
    const { titleId } = req.body;
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;

    try {
        if (!titleId) return res.status(400).send("An id is required");
        const bodyToSend = {
            media_type: "movie",
            media_id: titleId,
            favorite: true,
        };
        // evaluate jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                console.log(err);
                if (err) return res.sendStatus(403);
                const foundUser = await User.findById(decoded.id);
                const sessionId = foundUser.session_id;
                const addToFavoritesResp = await addToFavorites(
                    bodyToSend,
                    sessionId
                );

                console.log(addToFavoritesResp);

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
