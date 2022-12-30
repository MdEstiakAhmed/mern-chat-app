const mongoose = require("mongoose");

const ChatterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Chatter = mongoose.model("Chatter", ChatterSchema);

module.exports = Chatter;
