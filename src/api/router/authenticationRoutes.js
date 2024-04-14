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

router.get("/login", (request, response) => {
  response.render("login", { toastMessage: "" });
});

router.get("/signup", (request, response) => {
  response.render("signup", { toastMessage: "" });
});

router.post("/login", async (request, response) => {
  try {
    const user = await collection.findOne({ mail: request.body.mail });
    if (!user) {
      response.render("login", {
        toastMessage: "User does not exist. Please sign up.",
      });
      response.redirect("/signup");
    }
    const passwordMatch = await bcrypt.compare(
      request.body.password,
      user.password,
    );
    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      response.cookie("token", token, { httpOnly: true });
      response.redirect("/successfeed");
    } else {
      response.render("login", {
        toastMessage: "Incorrect password. Please try again.",
      });
    }
  } catch {
    response.render("login", {
      toastMessage: "Incorrect password. Please try again.",
    });
  }
});

router.post("/signup", async (request, response) => {
  const data = {
    mail: request.body.mail,
    password: request.body.password,
  };

  const existingUser = await collection.findOne({ mail: data.mail });
  if (existingUser) {
    response.render("signup", {
      toastMessage: "User already exists. Please use another mail.",
    });
  } else if (!data.mail || !data.password) {
    response.render("signup", { toastMessage: "Please fill in all fields." });
  } else if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(data.mail) === false
  ) {
    response.render("signup", {
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
    response.cookie("token", token, { httpOnly: true });
    response.redirect("/successfeed");
  }
});

router.get("/logout", (request, response) => {
  console.log("logged out");
  response.clearCookie("token");
  response.redirect("/auth/login");
});

module.exports = router;
