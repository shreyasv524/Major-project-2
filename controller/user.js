const user = require("../models/user.js");

module.exports.signupUser = (req, res) => {
    res.render("./user/signup.ejs");
}

module.exports.signupComfirm = async (req, res, next) => {
    try {
        let { email, username, password } = req.body;
        const newUser = new user({ email, username });
        const registeredUser = await user.register(newUser, password);
        req.login(registeredUser,(e) =>{
            if(e) {
                return next(e);
            }
        req.flash("success", "Welcome to Wonderlust");
            return res.redirect("/listings");
        })
    }
    catch (e) {
        req.flash("fail", "user are already exist");
        res.redirect('/signup');
    }
}

module.exports.loginUser = (req, res) => {
    res.render("./user/login.ejs");
}

module.exports.loginComfirm = (req, res) => {
    let {username} = req.body;
    req.flash("success", "Hello! Welcome back to Wonderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
   return res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) =>{
       if(err){
           next(err);
       }
       req.flash("success", "You are logged out");
       res.redirect("/listings");
    })
   }