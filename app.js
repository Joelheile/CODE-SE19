const dotenv = require("dotenv/config");
const express = require("express");

const { v4: uuidv4 } = require("uuid");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/pages"));

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

app.get("/login", (request, response) => {
  response.sendFile(path.join(__dirname, "/public/pages/login.html"));
});
app.post("/login", (request, response) => {
  const mail = request.body.mail;
  const password = request.body.password;
  console.log("Mail: ", mail);
  console.log("Password: ", password);
  response.redirect("/welcome");
});

app.post("/register", (request, response) => {
  const mail = request.body.mail;
  const password = request.body.password;
  console.log("Mail: ", mail);
  console.log("Password: ", password);
  response.redirect("/welcome");
});

app.get("/register", (request, response) => {
  response.sendFile(path.join(__dirname, "/public/pages/register.html"));
});

app.get("/welcome", (request, response) => {
  response.sendFile(path.join(__dirname, "/public/pages/welcome.html"));
});

app.get("/addsuccess", (request, response) => {
  response.sendFile(path.join(__dirname, "/public/pages/addSuccess.html"));
});

app.get("/about", (request, response) => {
  response.sendFile(path.join(__dirname, "/public/pages/about.html"));
});
app.get("/team", (request, response) => {
  response.sendFile(path.join(__dirname, "/public/pages/team.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`👋 Started server on port ${process.env.PORT}`);
});

const mongoose = require("mongoose");
//127.0.0.1:27017
mongodb: mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("💽 Database connected"))
  .catch((error) => console.error(error));

const successSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  media: { type: String, default: true, required: true },
  description: { type: String, default: true, required: true },
  articleLink: { type: String, default: true, required: true },
  imageLink: { type: String, default: true, required: true },
});

const Success = mongoose.model("Success", successSchema);

app.post("/success", async (request, response) => {
  const id = uuidv4();
  try {
    const success = new Success({
      id: id,
      name: request.body.name,
      type: request.body.type,
      media: request.body.media,
      description: request.body.description,
      articleLink: request.body.articleLink,
      imageLink: request.body.imageLink,
      updatedAt: new Date(),
    });
    await success.save();
    response.redirect("/successes");
  } catch (error) {
    console.error(error);
    response.send(`Error: The success could not be created.\n ${error}`);
  }
});

app.get("/", (request, response) => {
  response.redirect("/successes");
});

app.get("/successes", async (request, response) => {
  try {
    const success = await Success.find({}).sort({ updatedAt: 1 }).exec();

    response.render("successes", {
      success: success,
    });
  } catch (error) {
    console.error(error);
    response.render("successes", {
      success: [],
    });
  }
});

app.get("/successes/search", async (request, response) => {
  const query = request.query.query;
  console.log("query", query);
  try {
    const success = await Success.find({ name: query })
      .collation({ locale: "en", strength: 2 }) // case insensitive search
      .exec();
    response.render("successes", {
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
app.get("/success/:id", async (request, response) => {
  response.render("success", success);

  try {
    const id = request.params.id;
    const success = await Success.findOne({ id: id }).exec();

    response.render(`/success:${id}`, {
      success: success,
    });
  } catch (error) {
    console.error(error);
    response
      .status(404)
      .send("Oh no, 404 🫣 Could not find the success you're looking for.");
  }
});

app.get("/success/:id/edit", async (request, response) => {
  try {
    const id = request.params.id;
    const success = await Success.findOne({ id: id }).exec();
    if (!success)
      throw new Error("We couldn't finde the success you're looking for.");

    response.render("success", { success: success });
  } catch (error) {
    console.error(error);
    response
      .status(404)
      .send(`Could not find the success you're looking for.\n ${error}`);
  }
});

app.post("/success/:id", async (request, response) => {
  try {
    const success = await Success.findOneAndUpdate(
      { id: request.params.id },
      request.body,
    );
    response.redirect(`/successes`);
  } catch (error) {
    console.error(error);
    response.send(`Error: The success could not be created. \n ${error}`);
  }
});

// delete success
app.get("/success/:id/delete", async (request, response) => {
  try {
    await Success.findOneAndDelete({ id: request.params.id });

    response.redirect("/successes");
  } catch (error) {
    console.error(error);
    response.send(`Error: The sucesses couldn't be deleted.\n ${error}`);
  }
});
