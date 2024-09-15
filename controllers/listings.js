const mapToken = process.env.MAP_TOKEN;
const Listing = require("../models/listing.cjs");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async(req, res) => {
    let { category } = req.query;
    let listings = []
    if (category) {
        if (category.toLowerCase() === "trending") {
            listings = await Listing.find({}).populate("reviews");
            let trendingListing = listings.reduce((max, listing) => {
                return listing.reviews.length > max.reviews.length ? listing : max;
            }, { reviews: [] });
            res.render("listings/index.ejs", { listings: [trendingListing] });

        } else {

            listings = await Listing.find({ category: category });
            res.render("listings/index.ejs", { listings });
        }
    } else {

        listings = await Listing.find({});
        res.render("listings/index.ejs", { listings });
    }
}

module.exports.renderNewForm = (req, res) => {

    res.render("listings/new.ejs");
}

module.exports.showListing = async(req, res) => {

    let { id } = req.params;
    let list = await Listing.findById(id).populate({ path: "reviews", populate: "author" }).populate("owner");
    res.render("listings/show.ejs", { list, id });

}

module.exports.createListing = async(req, res) => {
    // console.log(result);
    // console.dir(result.error);
    // const newListing = new Listing(req.body.listing);
    // await newListing.save();
    // req.flash('success', "Listing created successfully");
    // res.redirect("/listings");
    try {
        let response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        }).send()
        console.log(response.body.features[0].geometry.coordinates);

        console.log("Data submitted:", req.body);
        let url = req.file.path;
        let filename = req.file.filename;
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        newListing.geometry = response.body.features[0].geometry;
        await newListing.save();
        console.log("Data in database:", newListing);
        req.flash('success', "Listing created successfully");
        res.redirect("/listings");
    } catch (err) {
        console.error("Error saving listing:", err); // Add this line
        req.flash('error', 'Failed to create listing');
        res.redirect("/listings/new");
    }

}

module.exports.renderEditForm = async(req, res) => {

    let { id } = req.params;
    let list = await Listing.findById(id);
    console.log(list);
    res.render("listings/edit.ejs", { list, id });
}

module.exports.updateListing = async(req, res) => {

    let { id } = req.params;
    let { path: url, filename } = req.file;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing }, { new: true });
    listing.image = { filename, url };
    await listing.save();
    res.redirect("/listings");
}

module.exports.destroyListing = async(req, res) => {

    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', "Listing deleted successfully");
    res.redirect("/listings");
}