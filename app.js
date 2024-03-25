const express = require("express");

const { v4: uuidv4 } = require("uuid");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/pages"));
const PORT = 3000;

// import static pages etc from public so that it can be called without having to put /public in url
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use("/pages", express.static(path.join(__dirname, "public/pages")));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use(
  "/components",
  express.static(path.join(__dirname, "public/components"))
);

app.use(express.urlencoded({ extended: true }));


app.get("/search", (request, response) => {
  const query = request.query.query;
  response.send(`You searched for: ${query}`);
});

// Will later be replaced by directly authorizing the user when they click first on homepage
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

app.listen(PORT, () => {
  console.log(`👋 Started server on port ${PORT}`);
});

const mongoose = require("mongoose");
//127.0.0.1:27017
mongodb: mongoose.connect("mongodb://127.0.0.1:27017/successtracker");

mongoose
  .connect("mongodb://127.0.0.1:27017/successtracker")
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
    });
    await success.save();
    response.redirect("");
    //response.redirect(`/success/${id}`);
  } catch (error) {
    console.error(error);
    response.send("Error: The success could not be created.");
  }
});

app.get('/', async (request, response) => {
  const successes = await Success.find({}).exec()

  response.render('/', { 
    successes: successes,
  })
})

app.get("/success/:id", (request, response) => {
  const successSubmission = successSubmissions[request.params.id];
  console.log(successSubmissions);
  response.render("successSubmission", successSubmission);
});

// app.post("/success", (request, response) => {
//   const id = uuidv4();
//   const name = request.body.name;
//   const type = request.body.type;
//   const media = request.body.media;
//   const description = request.body.description;
//   const articleLink = request.body.articleLink;
//   const imageLink = request.body.imageLink;

//   successSubmissions[id] = {
//     name,
//     type,
//     media,
//     articleLink,
//     imageLink,
//     description,
//   };
// });
