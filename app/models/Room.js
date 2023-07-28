const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Room = new Schema(
    {
        house_id: { type: String, required: true },
        room_name: { type: String, required: true },
        image: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Room", Room);
