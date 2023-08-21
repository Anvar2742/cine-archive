const express = require("express");
const app = express();
const mongoose = require("mongoose");

const auth = require("./routes/auth");

// Models
const User = require("./models/User");

// env vars
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

// Mongoo
mongoose
    .connect(MONGO_URI)
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err));

app.use(auth);
