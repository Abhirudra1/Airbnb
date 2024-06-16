const express = require("express")
const router = express.Router({mergeParams: true});   // {mergeParams: true} helps to extract :id from parent route
const Listing = require("../models/listing")
const ExpressError = require("../utiles/ExpressError")
const Review = require("../models/review")
const wrapAsync = require("../utiles/wrapAsync")
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware")

const reviewController = require("../controllers/review")


// Reviews
router.post("/", validateReview, isLoggedIn, wrapAsync(reviewController.createReview))

// Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview))

module.exports = router;
 