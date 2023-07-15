const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Number_Random = new Schema(
    {
        field: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Number_Random", Number_Random);
