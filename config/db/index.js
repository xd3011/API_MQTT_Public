const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1/api_mqtt");
        console.log("Connected");
    } catch (err) {
        console.log("Error connecting");
    }
}

module.exports = { connect };
