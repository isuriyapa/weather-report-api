// models/User.js
const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema(
    {
        date: String,
        time: String,
        data: Object,
    }
);

const userSchema = new mongoose.Schema(
    {
        email: { 
            type: String, 
            required: [true, "Please enter an email"], 
            unique: true 
        },
        location: { 
            type: String, 
            required: true 
        },
        weatherData: [weatherSchema],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
