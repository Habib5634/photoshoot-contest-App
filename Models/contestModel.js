const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: [true, "title is required"],
        },
        description: {
            type: String,
            require: [true, "description is require"],
        },
        image: {
            type: String,
            require: [true, "image is require"],
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            require: [true, "user id is require"],
        },
        likes: {
            type: Number,
            default: 0,
        },


    },
    { timestamps: true }
);

const contestModel = mongoose.model("Contest", contestSchema);

module.exports = contestModel;