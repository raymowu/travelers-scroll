const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const User = require("../models/user");

const Authenticate = (req, res, next) => {
	if(!req.session.user){
	  res.send({status: "err", message: "Login Required"});
	}
	else{
	  next()
	}
}

router.get("/", (req, res) => {
    res.send({status: "ok"})
})

router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
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

router.get("/current-user", Authenticate, (req, res) => {
	res.send({status: "ok", user: req.session.user});
});

// logout rout
router.get("/logout", (req, res) => {
	req.session.destroy();
});

router.get("/profile/:id", (req, res) => {
	User.findOne({username: req.params.id}, async (err, user) => {
		if(err){
			res.send({status: "err"})
		}
		if(req.session.user){
			if(user._id == req.session.user.id){
				return res.send({status: "ok", user: {username: user.username}, modifier: true});
			}
		}
		if(!user){
			return res.send({status: "err", message: "Unable to find user"})
		}
		else{
			return res.send({status: "ok", user: {username: user.username}, modifier: false});
		}
	})
})


module.exports = router;