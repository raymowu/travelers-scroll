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
    teams: []
});

module.exports = mongoose.model("Builds", Builds);
