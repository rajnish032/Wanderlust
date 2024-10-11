const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  validateReview,
  isLoggedIn,
  isReveiwAuthor,
} = require("../middleware.js");

//Post  Reviewn Route

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);

    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");

    res.redirect(`/listings/${listing._id}`);
  })
);

//Delete Review Route

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReveiwAuthor,
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    // Use $pull to remove the review from the 'reviews' array
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review from the Review collection
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!");

    // Redirect back to the listing's page
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
