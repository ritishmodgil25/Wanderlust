const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rate: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    created_at: {
        type: Date,
        default: Date.now(),
    }
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;