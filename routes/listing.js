const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.cjs");
const { validateListing, isOwner, isLoggedIn } = require("../middleware.cjs");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


//Index route
router.route("/").get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single("listing[image][url]"), validateListing, wrapAsync(listingController.createListing));
// .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));

// New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get(listingController.showListing)
    .put(isLoggedIn, isOwner, upload.single("listing[image][url]"), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

// Update route

//Delete route

module.exports = router;