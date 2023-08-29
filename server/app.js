const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const title = require("./routes/title");
const user = require("./routes/user");
const verifyJWT = require("./middleware/verifyJWT");
const updateTitles = require("./middleware/updateTitles");
const cron = require("node-cron");

// env vars
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
app.use(cookieParser());

// Mongooooooooo
mongoose
    .connect(MONGO_URI)
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err));

// Periodic update for titles

// cron.schedule("* * * * *", () => {

// });
updateTitles();

app.use(auth);
app.use(user);
app.use(verifyJWT);
app.use(title);
