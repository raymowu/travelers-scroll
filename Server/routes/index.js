const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const User = require("../models/user");

const nodemailer = require("nodemailer");

const Authenticate = (req, res, next) => {
	if(!req.session.user){
	  res.send({status: "err", message: "Login Required"});
	}
	else{
	  next()
	}
}

// function createJson(id){
// 	let date = new Date().toLocaleDateString();
// 	let ret = JSON.stringify({id: id, date: date})
// 	return ret;
// }

function returndate(json){
	let { date } = JSON.parse(json);
	let a = console.log(a);
	return date.substr(a + 1, 2);
}

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
	  user: "karthikapps70@gmail.com",
	  pass: "AppPasswords",
	},
});

router.get("/", (req, res) => {
    res.send({status: "ok"})
})

const SendEmail = (id, email) => {
	
	const url = `http://localhost:5000/confirmation/${id}`;

	transporter.sendMail({
	to: email,
	subject: 'Confirm Email',
	html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
	}, (error, result) =>{
		if(error){
			return console.log(error);
		}
		else{
			return console.log(result)
		}
	});
}

const ReSendEmail = async (id, email) => {

	let user = await User.findById(id);
	user.verification.date = new Date().toLocaleDateString();
	await user.save();
	
	const url = `http://localhost:5000/confirmation/${id}`;

	transporter.sendMail({
	to: email,
	subject: 'Confirm Email',
	html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
	}, (error, result) =>{
		if(error){
			return console.log(error);
		}
	});
}

router.post("/register", async (req, res) => {
	const { username, password, email } = req.body;
	User.findOne({ username}, async (err, user) => {
		if (err) throw err;
		if (user) res.send({status: "err", message: "User Already Exists"});
		if (!user){
			const hashed = await bcrypt.hash(password, 10);
			const newUser = new User({
				username,
				password: hashed,
				email
			});
			await newUser.save()
			req.session.user = req.session.user = {id: newUser._id, username: newUser.username};
			SendEmail(newUser._id, newUser.email);
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
			return res.send({status: "ok"});
		}
	}
	return res.send({status: "err", msg: "Username or Password was incorrect"});
});

router.get("/confirmation/:id", async (req, res) => {
	let user = await User.findById(req.params.id);
	if(user){
		user.verification.verified = true;
		await user.save();
		return res.redirect("http://localhost:3000/login");
	}
	else{
		return res.send("there was an error");
	}
});

router.get("/resendConfirmation/:id", async (req, res) => {
	let user = await User.findById(req.params.id);
	if(user){
		ReSendEmail(user._id, user.email)
	}
	else{
		return res.send({status: "err", msg: "couldnt find user"});
	}
});

router.get("/current-user", Authenticate, (req, res) => {
	res.send({status: "ok", user: req.session.user});
});

// logout rout
router.get("/logout", (req, res) => {
	req.session.destroy();
	return res.send({status: "ok"});
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