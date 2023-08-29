const Title = require("../models/Title");
const fetch = require("node-fetch");

// env vars
require("dotenv").config();
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

const getTitleData = async (id) => {
    const singleTitleUrl = TMDB_BASE_URL + "/movie/" + id;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: "Bearer " + process.env.TMDB_TOKEN,
        },
    };
    try {
        const resp = await fetch(singleTitleUrl, options);
        const titleToReturn = resp.json();
        if (!titleToReturn) return console.log("Title not found"); // TODO: write error log
        return titleToReturn;
    } catch (error) {
        console.log(error);
    }
};

const limitFunctionCallsPerSec = (titlesArr, callback, updateTitleData) => {
    let numberOfMadeCalls = 0;
    let startingNumber = 0;
    let numberOfMax = titlesArr.length;
    const titlesPerSecond = 2;

    const interval = setInterval(async () => {
        for (
            let i = numberOfMadeCalls;
            i < startingNumber + titlesPerSecond;
            i++
        ) {
            // Stop loop and function
            if (i === numberOfMax) {
                callback();
                clearInterval(interval);
                break;
            }
            // console.log(i);
            const titleData = await getTitleData(titlesArr[i].id);
            let _id = titlesArr[i]._id;
            const titleDataToUpdate = { ...titleData, _id };

            // console.log(titlesArr[i]);
            updateTitleData(titleDataToUpdate);
            numberOfMadeCalls++;
        }

        startingNumber = numberOfMadeCalls;
    }, 1000);
};

const updateTitles = async () => {
    let updatedTitles = [];
    // Get all titles from 'titles' collection
    const titlesFromDB = await Title.find({});

    const isDone = async () => {
        // console.log(updatedTitles);
        for (let i = 0; i < updatedTitles.length; i++) {
            // console.log(updatedTitles[i]);
            const resp = await Title.updateOne(
                { _id: updatedTitles[i]._id },
                { $set: updatedTitles[i] }
            );
            // console.log("done " + i, resp);
        }
        // console.log("we cool");
    };
    // Update data of a title
    const updateTitleData = (title) => {
        console.log("update " + title._id);
        updatedTitles.push(title);
    };
    // Get data and update for each title
    limitFunctionCallsPerSec(titlesFromDB, isDone, updateTitleData);
};

module.exports = updateTitles;
