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


app.use(session({
secret: 'secrettexthere',
resave: false,
saveUninitialized: true
}));
//   app.use(cookieParser("secretcode"));
//   app.use(passport.initialize());
//   app.use(passport.session());
//   require("./passportConfig")(passport);

const Authenticate = (req, res, next) => {
	if(!req.session.user){
	  res.send({status: "err", message: "Login Required"});
	}
	else{
	  next()
	}
  }

// Routes
app.get("/", (req, res) => {
	res.redirect("/blog");
})

app.post("/register", async (req, res) => {
	const { username, password } = req.body;
	User.findOne({ username}, async (err, user) => {
		if (err) throw err;
		if (user) res.send({status: "err", message: "User Already Exists"});
		if (!user){
			const hashed = await bcrypt.hash(password, 10);
			const newUser = new User({
				username,
				password: hashed
			});
			await newUser.save()
			req.session.user = req.session.user = {id: newUser._id, username: newUser.username};
			res.send({status: "ok"})
		}
	})
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	if(user){
		const valid = await bcrypt.compare(password, user.password);
		if(valid){
			req.session.user = {id: user._id, username: user.username};
			res.send({status: "ok"});
		}
	}
})

app.get("/current-user", Authenticate, (req, res) => {
	res.send({status: "ok", user: req.session.user});
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


app.listen(5000, () =>{{
    console.log("Server is running on port: 5000");
}})
