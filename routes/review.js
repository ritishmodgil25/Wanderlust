const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.cjs");
const { validateReview, isLoggedIn, isReviewAuthor, convertRateToNumber } = require("../middleware.cjs");
const reviewController = require("../controllers/reviews.js");

router.post("/", isLoggedIn, convertRateToNumber, validateReview, wrapAsync(reviewController.createReview));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviewController.destroyReview);

module.exports = router;