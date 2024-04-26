const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
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
        properties: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Property",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
