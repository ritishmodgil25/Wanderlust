// requiring all the packages and files
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const ExpressError = require("./utils/ExpressError.cjs");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.cjs");



const app = express();
let port = 8080;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

// setting up ejs as default view engine 
// setting views folder as default folder to find any ejs files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

// connecting to mongoDB
const dbUrl = process.env.ATLASDB_URL
main().then((res) => {
        console.log("Mongoose: connection established");
    })
    .catch((err) => {
        console.log(err);
    })
async function main() {
    await mongoose.connect(dbUrl);
}


const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
})
store.on("error", () => {
    console.log("error in our mongo session store", err)
})
const sessionOptions = {
        store,
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        }
    }
    //middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser("my-secret-key"));
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
})


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.all('*', (req, res, next) => {
    throw new ExpressError(404, "Page not found");
})

app.use((err, req, res, next) => {

    let { status = 500, message = "Something went wrong" } = err;
    console.log(err);
    res.render("listings/error.ejs", { message, status });
    // res.status(status).send(message);
})