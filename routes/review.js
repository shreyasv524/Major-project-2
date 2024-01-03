const express = require("express");
const router = express.Router({mergeParams: true});
const { isLogedIn , isowner, isReviewAuthor} = require("../middleware.js");
const reviewcontroller = require("../controller/review.js");



router.post("/",isLogedIn,reviewcontroller.newReview);

router.delete("/:reviewid",isLogedIn,isReviewAuthor,reviewcontroller.deleteReview);

module.exports = router;
