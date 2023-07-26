const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const House = new Schema(
    {
        user_name: { type: String, required: true },
        house_name: { type: String, required: true },
        image: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("House", House);
