const express = require("express");
const router = express.Router();

const Builds = require("../models/Builds");
const Comments = require("../models/Comment");
const User = require("../models/user");

const Authenticate = (req, res, next) => {
	if(!req.session.user){
	  res.send({status: "err", message: "Login Required"});
	}
	else{
	  next()
	}
}

router.post("/", Authenticate, async (req, res) => {
    const {title, character, weapons, artifacts, teams} = req.body;
    
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

router.post("/:id/liked", Authenticate,  (req, res) => {
    Builds.findById(req.params.id, async (err, build) => {
        if(err){
            return res.send({status: "err", err: err});
        }
        else{
            if(build){
                const user = await User.findOne({ username });
                user.likedBuilds.push(build._id);
                build.likes += 1;
                return res.send({status: "ok"});
            }
        }
    });
});

router.post("/:id/disliked", Authenticate,  (req, res) => {
    Builds.findById(req.params.id,  async (err, build) => {
        if(err){
            return res.send({status: "err", err: err});
        }
        else{
            if(build){
                const user = await User.findOne({ username });
                user.likedBuilds.splice(user.likedBuilds.indexOf(build._id), 1);
                build.likes -= 1;
                return res.send({status: "ok"});
            }
        }
    });
});

// comment stuff
router.post("/:id/newComment", Authenticate,  (req, res) => {
    const { text } = req.body;
    Comment.create({
        text,
        Author: req.session.user
    }, async (err, comment) => {
        if(err){
            return res.send({status: "err", err: err});
        }
        else{
            if(comment){
                const build = await Builds.findById(req.params.id);
                if(build){
                    build.comment.push(comment._id);
                }
            }
        }
    })
})

module.exports = router;