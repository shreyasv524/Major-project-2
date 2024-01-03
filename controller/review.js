const review = require("../models/review.js");
const listing = require("../models/listing.js");

module.exports.newReview = async(req,res) =>{
    console.log("hello");
    let listing1 =await listing.findById(req.params.id);
    let newreview = await new review(req.body.review);
    newreview.author = req.user._id;
    console.log(req.user);
    listing1.review.push(newreview);
    await listing1.save();
    await newreview.save();
    req.flash("success","New review insert successfull");
    res.redirect(`/listings/${req.params.id}`);


}

module.exports.deleteReview = async(req,res) =>{
    let {id, reviewid} = req.params;
    await listing.findByIdAndUpdate(id,{$pull: {review: reviewid}});
     const result = await review.findByIdAndDelete(reviewid);
    req.flash("success","Review is deleted");
    res.redirect(`/listings/${id}`);
}