if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
// console.log(process.env.SECRET)


const express = require("express")
const app = express();
const path = require("path");
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");
const ExpressError = require("./utiles/ExpressError")
// const cookieParser = require('cookie-parser')
const session = require("express-session")
const MongoStore = require('connect-mongo');
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user")



const listingRouter = require("./routes/listing")
const reviewRouter = require("./routes/review")
const userRouter = require("./routes/user")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate)
app.use(express.static(path.join(__dirname,"public")))
// app.use(cookieParser)

const dbUrl = process.env.ATLASDB_URL;


mongoose.connect(dbUrl)
.then((res)=> console.log("DB is connected"))
.catch((err)=> console.log(err))



// Mongo Session
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
})

store.on("error", ()=>{
    console.log("Error in MONGO SESSION STORE", err)
})

// Sessions ---->
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false, 
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // for security purpose it is true
    }
}


// app.get("/", (req, res)=>{
//     res.send("hi, I am Groot")
// })


app.use(session(sessionOptions))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})


// app.get("/testListing", async (req, res)=>{
//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     })

//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Successful testing")
// })


// Adding demo user
// app.get("/demouser", async (req, res)=>{
//     let fakeUser = new User({
//         email: "abhi@gmail.com",
//         username: "rudra",
//     })

//     let registeredUser = await User.register(fakeUser, "helloworld")
//     res.send(registeredUser)
// })


// Routes for Listings
app.use("/listings", listingRouter)

// Routes for Review
app.use("/listings/:id/reviews", reviewRouter)
 
// Routes for Review
app.use("/", userRouter)

// Handling all invalid Routes -->
app.all("*",(req, res, next)=>{
    next(new ExpressError(404, "Page not found"))
})

// End Middleware 
app.use((err, req, res, next)=>{
    // res.send("somthing went wrong")

    let {statusCode = 500, message = "Something Went Wrong" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("listings/error.ejs",{message})
}) 


app.listen(8000, ()=>
     console.log("Server is litening at port 8000"))