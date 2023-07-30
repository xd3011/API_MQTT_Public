const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Device = new Schema(
    {
        room_id: { type: String, required: true },
        device_name: { type: String, required: true },
        device_type: { type: String, require: true },
        device_image: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Device", Device);
