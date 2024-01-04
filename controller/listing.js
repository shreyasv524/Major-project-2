const listing = require("../models/listing.js");
const multer = require("multer");
const upload = multer({ dest: 'upload/' });


module.exports.index = async (req, res) => {
    const allListings = await listing.find({});
    res.render("./listing/index.ejs", { allListings });
    // res.render("./filters/trending.ejs",{allListings});
}

module.exports.new = (req, res) => {
    console.log("new route was working");
    return res.render("./listing/new.ejs");
}

module.exports.trending = async(req,res) =>{
    let trendingListing;
    const allListings = await listing.find({category: "trending"});
    console.log(allListings);
    res.render("./filters/trending.ejs",{allListings});

}

module.exports.iconic_cities = async(req,res) =>{
    let trendingListing;
    const allListings = await listing.find({category: "iconic-cities"});
    console.log(allListings);
    res.render("./filters/iconic_cities.ejs",{allListings});

}

module.exports.mountains = async(req,res) =>{
    let trendingListing;
    const allListings = await listing.find({category: "mountains"});
    console.log(allListings);
    res.render("./filters/mountains.ejs",{allListings});

}

module.exports.rooms = async(req,res) =>{
    let trendingListing;
    const allListings = await listing.find({category: "rooms"});
    console.log(allListings);
    res.render("./filters/rooms.ejs",{allListings});

}

module.exports.amazing_pools = async(req,res) =>{
    let trendingListing;
    const allListings = await listing.find({category: "amazing-pools"});
    console.log(allListings);
    res.render("./filters/amazing-pools.ejs",{allListings});

}

module.exports.camping = async(req,res) =>{
    let trendingListing;
    const allListings = await listing.find({category: "camping"});
    console.log(allListings);
    res.render("./filters/camping.ejs",{allListings});

}

module.exports.arctic = async(req,res) =>{
    let trendingListing;
    const allListings = await listing.find({category: "arctic"});
    console.log(allListings);
    res.render("./filters/arctic.ejs",{allListings});

}

module.exports.farm =  async(req,res) =>{
    let trendingListing;
    const allListings = await listing.find({category: "farms"});
    console.log(allListings);
    res.render("./filters/farm.ejs",{allListings});

}

module.exports.castle = async(req,res) =>{
    let trendingListing;
    const allListings = await listing.find({category: "castle"});
    console.log(allListings);
    res.render("./filters/castle.ejs",{allListings});

}

module.exports.createListing = async(req, res, next) => {
//    res.send("route is working");
if (!req.body.listing) {
    console.log("error was found");
    throw new ExpressError(400, (_message));
}
try {
    console.log("create route was running");
    let url;
    let filename;
    if(typeof req.file.path != "undefined"){
         url = req.file.path;
         filename = req.file.filename;
    }
    const newlisting = req.body.listing;
    let newlist = new listing(newlisting);
    newlist.owner = req.user._id;
    newlist.image.url = url;
    newlist.image.filename = filename;
    newlist.save();
    req.flash("success", "listing was inserted successfull");
    res.redirect("/listings");
console.log("newlist: ",newlist);

}
catch (err) {
    next(err);
}

}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listingg = await listing.findById(id).populate({ path: "review", populate: { path: "author" } }).populate("owner");
    if (!listingg) {
        req.flash("fail", "listing doesn't exist");
        next(new ExpressError(404, "enter right id"));
        return res.redirect("/");

    }
    res.render("./listing/show.ejs", { listingg });
}

module.exports.editListingForm = async (req, res) => {

    let { id } = req.params;
    let newlisting = await listing.findById(id);
    if (!newlisting) {
        req.flash("fail", "listing doesn't exist");
        res.redirect("/listings");
    }
    else {
        let originalUrl = newlisting.image.url;
        originalUrll = originalUrl.replace("/upload","/upload/w_250,h_300");
        res.render("listing/edit.ejs", { newlisting,originalUrll });

    }

}

module.exports.editedListing = async (req, res) => {
    let { id } = req.params;
    let updated = await listing.findByIdAndUpdate(id, req.body.listing);

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        updated.image.url = url;
        updated.image.filename = filename;
        updated.save();
    }
    req.flash("success", "listing update successfull");
    res.redirect("/listings");
}

module.exports.deleteListing = async (req, res) => {

    let { id } = req.params;
    let deleted = await listing.findByIdAndDelete(id);

    req.flash("success", "listing was deleted");
    res.redirect("/listings");
}
