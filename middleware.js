const Listing = require("./models/listing")
const ExpressError = require("./utiles/ExpressError")
const Review = require("./models/review")
const {listingSchema, reviewSchema} = require("./schema")


module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;  // saving the original url which we are trying to access
        req.flash("error", "You must be logged in!")
        return res.redirect("/login")
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirect = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You don't have permission for this listing")
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
    console.log(error)
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    } else{
        next();
    }
}

module.exports.validateReview = (req, res, next)=>{
    let {error} = reviewSchema.validate(req.body);
    console.log(error)
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    } else{
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) =>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You can't delete. You aren't author of this review")
        return res.redirect(`/listings/${id}`);
    }
    next();
}