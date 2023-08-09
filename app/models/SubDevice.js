const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubDevice = new Schema(
    {
        device_id: { type: String, required: true },
        sub_device_name: { type: String, required: true },
        sub_device_type: { type: String, require: true },
        sub_device_state: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("SubDevice", SubDevice);
