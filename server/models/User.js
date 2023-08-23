const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Email is required"],
        validate: [isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum password length is 6 characters"],
    },
});

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw Error("No user with this email");
    }

    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
        return user;
    }
    throw Error("incorrect password");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
