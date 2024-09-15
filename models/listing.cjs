const mongoose = require("mongoose");
const sampleImages = require("../init/sampleImage.cjs");
const Review = require("./review.js");

function getRandomImage() {
    return sampleImages[Math.floor(Math.random() * sampleImages.length)];
}
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        required: true,
        type: String
    },
    description: String,
    image: {
        filename: {
            type: String,
            set: (v) => v === "" ? "listingimage" : v
        },
        url: {
            type: String,
            set: (v) => v === "" ? getRandomImage() : v

        }
    },
    category: {
        type: String,
        enum: ['Rooms', 'Mountains', 'Castle', 'Pools', 'Beach', 'Cities'],
        required: true
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    },

    price: {
        required: true,
        type: String
    },
    location: {
        required: true,
        type: String
    },
    country: {
        required: true,
        type: String
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }]
});

listingSchema.post("findOneAndDelete", async(listing) => {

    await Review.deleteMany({ _id: { $in: listing.reviews } });
})

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;