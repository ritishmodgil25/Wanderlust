const Listing = require("./models/listing.cjs");
const ExpressError = require("./utils/ExpressError.cjs");
const { listingSchema, reviewSchema } = require("./schema.cjs");
const Review = require("./models/review.js");


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    console.log(error);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(402, errMsg);
    }
    next();
}


let validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    console.log(error);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(402, errMsg);
    }
    next();
}

const isLoggedIn = (req, res, next) => {
    console.log("check if isLoggedIn is executing");
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', "You must be logged in to access that");
        return res.redirect("/login");
    }
    console.log("isLoggedIn executed");
    next();
}

const saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

const isOwner = async(req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

const isReviewAuthor = async(req, res, next) => {
    let { reviewId, id } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

const convertRateToNumber = (req, res, next) => {
    if (req.body.review && req.body.review.rate) {
        req.body.review.rate = Number(req.body.review.rate);
    }
    next();
};


module.exports = { isLoggedIn, saveRedirectUrl, isOwner, isReviewAuthor, validateReview, validateListing, convertRateToNumber };