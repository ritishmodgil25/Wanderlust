const Listing = require("../models/listing.cjs")
const Review = require("../models/review.js");


module.exports.createReview = async(req, res) => {

    let { id } = req.params;
    let listing = await Listing.findById(req.params.id).populate("owner");
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash('success', "Review saved successfully");
    console.log(listing);
    res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async(req, res) => {
    try {
        let { id, reviewId } = req.params;
        console.log("Finding and updating the listing:");
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }, { new: true });
        console.log("Deleting the reveiw");
        await Review.findByIdAndDelete(reviewId);
        req.flash('success', "Review deleted successfully");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.log(err);
    }
}