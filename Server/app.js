const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
var passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");

// MODELS
var User = require("./models/user");

// DATABASE
mongoose.connect("mongodb+srv://rksp:rkspdbpass@cluster0.gkkn6.mongodb.net/GenshinApp?retryWrites=true&w=majority");

app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
);
app.use(express.json())


// PASSPORT CONFIGURATION
// app.use(require("express-session")({
// 	secret: "this is the secret",
// 	resave: false,
// 	saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(function(req, res, next){
// 	res.locals.currentUser = req.user;
// 	next();
// });

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


app.use(
	session({
	  secret: "secretcode",
	  resave: true,
	  saveUninitialized: true,
	})
  );
  app.use(cookieParser("secretcode"));
  app.use(passport.initialize());
  app.use(passport.session());
  require("./passportConfig")(passport);


  // Routes
  app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send({status: "ok", message: "Username or Password are incorrect"});
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send({status: "ok", user: {id: req.user._id, username: req.user.username}, message: "Successfully Authenticated"});
        });
      }
    })(req, res, next);
  });
  app.post("/register", (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send({status: "err", message: "Username or Email already exist"});
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
        const newUser = new User({
          username: req.body.username,
		  email: req.body.email,
          password: hashedPassword,
        });
        await newUser.save();
        res.send({status: "ok", message: "User Successfully created"});
      }
    });
  });

app.get("/", (req, res) => {
    // res.send({status: "ok"});
	if(req.isAuthenticated()){
		res.send({status: "ok", user: req.user})
	}
	else{
		res.send({status: "ok"})
	}
});

app.get("/current-user", (req, res) => {
	console.log(req.isAuthenticated())
	if (req.isAuthenticated()){
		res.send({id: req.user._id, username: req.user.username})
	}
	else{
		res.send(req.isAuthenticated())
	}
  // res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

app.get("/profile/:id", (req, res) => {
	User.findById({_id: req.params.id}, async (err, user) => {
		if(err){
			res.send({status: "err"})
		}
		if(!user){
			res.send({status: "err", message: "Unable to find user"})
		}
		else{
			res.send({status: "ok", user: {username: user.username}})
		}
	})
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
		res.send({status: "err", err: "not logged in"});
	}
}




app.listen(5000, () =>{{
    console.log("Server is running on port: 5000");
}})
