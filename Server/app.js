const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
var passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");

// MODELS
const User = require("./models/user");

// DATABASE
mongoose.connect(
  "mongodb+srv://rksp:rkspdbpass@cluster0.gkkn6.mongodb.net/GenshinApp?retryWrites=true&w=majority"
);

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: "secrettexthere",
    resave: false,
    saveUninitialized: true,
  })
);
//   app.use(cookieParser("secretcode"));
//   app.use(passport.initialize());
//   app.use(passport.session());
//   require("./passportConfig")(passport);

const Authenticate = (req, res, next) => {
  if (!req.session.user) {
    res.send({ status: "err", message: "Login Required" });
  } else {
    next();
  }
};

// Routes
const indexRoutes = require("./routes/index.js");
const buildRoutes = require("./routes/builds");

app.use(indexRoutes);
app.use("/builds", buildRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(process.env.PORT, () => {
  {
    console.log("Server is running on port: 5000");
  }
});
