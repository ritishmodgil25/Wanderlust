const User = require("../models/user.cjs");

module.exports.renderSignupForm = (req, res) => {
    res.render("listings/signup.ejs");
}

module.exports.signup = async(req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                console.log("Just before next(err) is called");
                return next(err);
            }
            req.flash('success', "Welcome to Wanderlust");
            res.redirect('/listings');
        })
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("listings/login.ejs");
}

module.exports.login = async(req, res) => {
    res.locals.currUser = req.user;
    req.flash("success", "You are logged in successfully");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    console.log("This is redirect url:", redirectUrl);
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        console.log(req.path);
        req.flash("success", "Logged out successfully");
        res.redirect("/listings");
    });
}