const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const { isLogedIn , isowner} = require("../middleware.js");
const listingcontroller = require("../controller/listing.js");
const {storage} = require("../cloudconfigs.js");
const multer = require('multer');
const upload = multer({dest: 'uploads/'});


router.get("/listings/new", isLogedIn,listingcontroller.new);
router.get("/listings/trending",listingcontroller.trending);
router.get("/listings/rooms",listingcontroller.rooms);
router.get("/listings/iconic-cities",listingcontroller.iconic_cities);
router.get("/listings/mountains",listingcontroller.mountains);
router.get("/listings/amazing-pools",listingcontroller.amazing_pools);
router.get("/listings/castle",listingcontroller.castle);
router.get("/listings/camping",listingcontroller.camping);
router.get("/listings/farm",listingcontroller.farm);
router.get("/listings/arctic",listingcontroller.arctic);



router.route("/listings")
.get(wrapAsync(listingcontroller.index));

router.route("/listings/newest")
.post(upload.single('listing[imgurl]') ,(req,res) =>{
    // listingcontroller.createListing
    res.send(req.file);
});


router.get("/listings/edit/:id", isLogedIn,isowner, wrapAsync(listingcontroller.editListingForm));

router.route("/listings/:id")
.get(wrapAsync(listingcontroller.showListing))
.put(wrapAsync(listingcontroller.editedListing))
.delete(isLogedIn,isowner, wrapAsync(listingcontroller.deleteListing));



module.exports = router;