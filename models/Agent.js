const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        rating: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Agent", agentSchema);
