const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const { isLogedIn , isowner} = require("../middleware.js");
const listingcontroller = require("../controller/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
.get(wrapAsync(listingcontroller.index))
.post(isLogedIn,upload.single('listing[image]'),listingcontroller.createListing);


// router.get("/new", isLogedIn,listingcontroller.new)
// router.get("/trending",listingcontroller.trending)
// router.get("/rooms",listingcontroller.rooms)
// router.get("/iconic-cities",listingcontroller.iconic_cities)
// router.get("/mountains",listingcontroller.mountains)
// router.get("/amazing-pools",listingcontroller.amazing_pools)
// router.get("/castle",listingcontroller.castle)
// router.get("/camping",listingcontroller.camping)
// router.get("/farm",listingcontroller.farm)
// router.get("/arctic",listingcontroller.arctic);



router.get("/edit/:id", isLogedIn,isowner, wrapAsync(listingcontroller.editListingForm));

router.route("/:id")
.get(wrapAsync(listingcontroller.showListing))
.put(upload.single('listing[image]'),wrapAsync(listingcontroller.editedListing))
.delete(isLogedIn,isowner, wrapAsync(listingcontroller.deleteListing));



module.exports = router;