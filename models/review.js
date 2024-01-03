const mongoose = require("mongoose");
const {Schema} = mongoose;

const reviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
    }

});

module.exports = mongoose.model("review",reviewSchema);