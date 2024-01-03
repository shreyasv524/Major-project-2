const express = require("express");
const router = express.Router();
const passport = require("passport");
const {saveUrl} = require("../middleware.js");
const usercontroller = require("../controller/user.js");

router.route("/signup")
.get(usercontroller.signupUser)
.post(usercontroller.signupComfirm);

router.route("/login")
.get(usercontroller.loginUser)
.post(saveUrl,
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: false }), usercontroller.loginComfirm);


router.get("/logout", usercontroller.logoutUser);

module.exports = router;
