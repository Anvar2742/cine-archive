const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fetch = require("node-fetch");

require("dotenv").config();

const createSession = async (request_token) => {
    const getSessionUrl =
        "https://api.themoviedb.org/3/authentication/session/new";
    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: "Bearer " + process.env.TMDB_TOKE,
        },
        body: JSON.stringify({
            request_token,
        }),
    };

    try {
        const resp = await fetch(getSessionUrl, options);
        const respData = await resp.json();

        return respData;
    } catch (error) {
        console.log(error);
    }
};

module.exports.approveAndCreateSession = async (req, res) => {
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
                const requestToken = await foundUser.requestTokenObj
                    .request_token;

                foundUser.requestTokenObj = {
                    isApproved: true,
                    request_token: requestToken,
                };
                await foundUser.save();

                const sessionData = await createSession(requestToken);
                if (sessionData.success) {
                    return res.status(200).json(sessionData);
                }

                return res.status(400).json(sessionData);
            }
        );
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};
