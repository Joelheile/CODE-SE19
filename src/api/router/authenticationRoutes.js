const express = require("express");
const router = express.Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

const verifyToken = require("../middleware/authMiddleware");

const collection = require("../models/userModel");

router.get("/login", (req, res) => {
  res.render("login", { toastMessage: "" });
});

router.get("/signup", (req, res) => {
  res.render("signup", { toastMessage: "" });
});

router.post("/login", async (req, res) => {
  try {
    const user = await collection.findOne({ mail: req.body.mail });
    if (!user) {
      res.render("login", {
        toastMessage: "User does not exist. Please sign up.",
      });
      res.redirect("/signup");
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true });
      res.redirect("/successfeed");
    } else {
      res.render("login", {
        toastMessage: "Incorrect password. Please try again.",
      });
    }
  } catch {
    res.render("login", {
      toastMessage: "Incorrect password. Please try again.",
    });
  }
});

router.post("/signup", async (req, res) => {
  const data = {
    mail: req.body.mail,
    password: req.body.password,
  };

  const existingUser = await collection.findOne({ mail: data.mail });
  if (existingUser) {
    res.render("signup", {
      toastMessage: "User already exists. Please use another mail.",
    });
  } else if (!data.mail || !data.password) {
    res.render("signup", { toastMessage: "Please fill in all fields." });
  } else if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(data.mail) === false
  ) {
    res.render("signup", {
      toastMessage: "Please enter a valid email adress",
    });
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword;

    const user = await collection.insertMany(data);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/successfeed");
  }
});

router.get("/logout", (req, res) => {
  console.log("logged out");
  res.clearCookie("token");
  res.redirect("/auth/login");
});

module.exports = router;
