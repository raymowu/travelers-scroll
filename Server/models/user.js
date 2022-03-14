const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  likedBuilds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Builds"
    }
  ]
});

module.exports = mongoose.model("User", user);
