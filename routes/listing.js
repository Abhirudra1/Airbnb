const express = require("express")
const router = express.Router();
const Listing = require("../models/listing")
const wrapAsync = require("../utiles/wrapAsync")
const {isLoggedIn, isOwner, validateListing} = require("../middleware");
const listingController = require("../controllers/listing");
const multer  = require('multer')
const {storage} = require("../cloudConfig")
const upload = multer({ storage })


router.route("/")
.get(wrapAsync(listingController.index))   // Index Route 
.post(isLoggedIn, upload.single("listing[image]"), validateListing,  wrapAsync(listingController.createListing)) // Create Route


//! New Route --->
router.get("/new", isLoggedIn, listingController.renderNewForm)

router.route("/:id")
.get(wrapAsync(listingController.showListing))  // Show route
.put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing)) // Update Route
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));  // Delete Route

//! Edit Route --->
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;

//! Index Route --->
// router.get("/", wrapAsync(listingController.index))



//! Show Route --->
// router.get("/:id", wrapAsync(listingController.showListing));


//! Create Route --->
// router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing))


//! Update Route --->
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

// => In this case, the "id" variable is the ID of the listing to be updated, 
// which is extracted from the request parameters. The "req.body.listing" is 
// an object containing the updated data for the listing, which is obtained from the request body.

// => By using the spread operator ({...}), the code is creating a new object that includes all the properties of 
// "req.body.listing". This allows for selectively updating only the properties that are provided in the request body,
// while leaving the rest of the document unchanged.

//! Delete Route --->
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

