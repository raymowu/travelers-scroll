const express = require("express");
const router = express.Router();

const Builds = require("../models/Builds");

const Authenticate = (req, res, next) => {
	if(!req.session.user){
	  res.send({status: "err", message: "Login Required"});
	}
	else{
	  next()
	}
}

router.post("/", Authenticate, (req, res) => {
    const {title, character, weapons, artifacts, teams} = req.body;
    const data = {title: title, Author: {_id: req.session.user.id, username: req.session.user.username}}
    
    Builds.create({
        title,
        character,
        Author: req.session.user,
        weapons,
        artifacts,
        teams
    }, (err, build) => {
        if (err){
            return res.send({status: "err", err: err});
        }
        else{
            if(build){
                return res.send({status: "ok"});
            }
        }
    });
});

router.get("/:character", (req, res) =>{

    Builds.find({character: req.params.character}, (err, builds) => {
        if(err){
            return res.send({status: "err", err: err});
        }
        else{
            if(builds){
                return res.send({status: "ok", builds: builds});
            }
        }
    })
});

module.exports = router;