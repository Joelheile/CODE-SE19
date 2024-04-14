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

router.get(
  ["/", "/welcome", "/addsuccess", "/about", "/team"],
  verifyToken,
  (request, response) => {
    if (request.path === "/") {
      response.redirect("/successFeed");
    } else {
      const filePath = path.join(
        __dirname,
        `./../../views${request.path}.html`,
      );
      response.sendFile(filePath);
    }
  },
);

const mongoose = require("mongoose");

mongodb: mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("💽 Database connected"))
  .catch((error) => console.error(error));

const { successSchema } = require("../models/successModel");
const Success = mongoose.model("Success", successSchema);

router.post("/success", async (request, response) => {
  const id = uuidv4();
  try {
    const success = new Success({
      ...request.body,
      id: id,

      updatedAt: new Date(),
    });
    await success.save();
    response.redirect("/successfeed");
  } catch (error) {
    console.error(error);
    response.send(`Error: The success could not be created.\n ${error}`);
  }
});

router.get("/successfeed", verifyToken, async (request, response) => {
  try {
    const success = await Success.find({}).sort({ updatedAt: 1 }).exec();

    response.render("successFeed", {
      success: success,
    });
  } catch (error) {
    console.error(error);
    response.render("successFeed", {
      success: [],
    });
  }
});

router.get("/successfeed/search", async (request, response) => {
  const queryName = request.query.name;

  if (!queryName) {
    return response.redirect("/successfeed");
  }
  try {
    const success = await Success.find({ name: queryName })
      .collation({ locale: "en", strength: 2 }) // case insensitive search
      .exec();
    response.render("successFeed", {
      success: success,
    });
  } catch (error) {
    console.error(error);
    response.render("success", {
      succes: [],
    });
  }
});

// pages for showing single success and editing it
router.get("/success/:id", verifyToken, async (request, response) => {
  const id = request.params.id;
  try {
    const success = await Success.findOne({ id: id }).exec();
    if (!success) {
      return response
        .status(404)
        .send("Could not find the success you're looking for.");
    }
    response.render(`/success:${id}`, { success: success });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send("An error occurred while retrieving the success.");
  }
});

router.get("/success/:id/edit", async (request, response) => {
  try {
    const id = request.params.id;
    const success = await Success.findOne({ id: id }).exec();
    if (!success) {
      return response.status(404).redirect("/successfeed");
    }
    response.render("success", { success: success });
  } catch (error) {
    console.error(error);
    response.status(500).redirect("/successfeed");
  }
});


router.post("/success/:id", async (request, response) => {
  try {
    const success = await Success.findOneAndUpdate(
      { id: request.params.id },
      request.body
    );
    response.redirect(`/successfeed`);
  } catch (error) {
    console.error(error);
    response.send(`Error: The success could not be created. \n ${error}`);
  }
});




// middleware for deleting input
const methodOverride = require("method-override");
router.use(methodOverride("_method"));

// delete success
router.delete("/success/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const success = await Success.findOneAndDelete({ id: id }).exec();
    if (!success) {
      return response.status(404).redirect("/successfeed");
    }
    response.redirect("/successfeed");
  } catch (error) {
    console.error(error);
    response.status(500).redirect("/successfeed");
  }
});

module.exports = router;
