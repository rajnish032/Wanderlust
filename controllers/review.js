const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);

    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");

    res.redirect(`/listings/${listing._id}`);
  };

  module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    // Use $pull to remove the review from the 'reviews' array
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review from the Review collection
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!");

    // Redirect back to the listing's page
    res.redirect(`/listings/${id}`);
  };