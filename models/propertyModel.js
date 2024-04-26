const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
