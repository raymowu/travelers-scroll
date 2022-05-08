const mongoose = require("mongoose");
const Builds = new mongoose.Schema({
  title: { type: String, required: true },
  character: {type: String, required: true},
  Author: {
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: {type: String, required: true}
    },
    weapons: [],
    artifacts: [],
    teams: [],
    Comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    likes: {type: Number, default: 0}, 
    LikedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    Date: {type: String, default: new Date().toLocaleDateString()}
});

module.exports = mongoose.model("Builds", Builds);
