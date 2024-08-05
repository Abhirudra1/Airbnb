
const Listing = require("../models/listing");
const User = require("../models/user");


module.exports.showListing = async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if(!listing){
        // req.flash("error", "Listing you requested does not exist")
        res.redirect("/listings")
    }
    res.render("listings/show.ejs", {listing})
}


module.exports.renderSignupForm = (req, res)=>{
    res.render("users/signup.ejs")
}

module.exports.signup = async (req, res)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser)
        // The below code will automatically login after signup
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err)
            } 
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings")
        })
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup")
    }
}

module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login.ejs")
}


module.exports.login = async(req, res)=>{
    req.flash("success", "Welcome back to Wanderlust")
    let redirectUrl = res.locals.redirect || "/listings";
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res, next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out!")
        res.redirect("/listings")
    })
}