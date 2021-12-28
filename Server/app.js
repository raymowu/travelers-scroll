const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
var passport = require("passport");
var LocalStrategy = require("passport-local");

// MODELS
var User = require("./models/user");

// DATABASE
mongoose.connect("mongodb+srv://rksp:rkspdbpass@cluster0.gkkn6.mongodb.net/GenshinApp?retryWrites=true&w=majority");

app.use(cors())
app.use(express.json())


// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "this is the secret",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ROUTES

app.get("/", (req, res) => {
    // res.send({status: "ok"});
	if(req.isAuthenticated()){
		res.send({status: "ok", user: req.user})
	}
	else{
		res.send({status: "ok"})
	}
});

app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username, email: req.body.email});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			res.send({status: "err", err: err})
			console.log(err)
		}
		else{
			passport.authenticate("local")(req, res, function(){
				res.send({status: "ok", user: user});
			});
		}

	});
	
	console.log(req.body)
});

// handling login logic
// app.post("/login", passport.authenticate("local", 
// 	{
// 		successRedirect: res.send({status: "ok"}),
// 		failureRedirect: res.send({status: "Faild to login"})
// 	}), (req, res) => {

// });
app.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) throw err;
		if (!user) res.send("No User Exists");
		else {
		  req.logIn(user, (err) => {
			if (err) throw err;
			// res.send("Successfully Authenticated");
			res.send({status: "ok", user: req.user})
			// console.log(req.user);
		  });
		}
	  })(req, res, next);
})
// logout rout
app.get("/logout", (req, res) => {
	req.logout();
	res.send({status: "ok", message: "Successfully logged out"})
});


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	else{
		res.redirect("/login");
	}
}


app.listen(5000, () =>{{
    console.log("Server is running on port: 5000");
}})
