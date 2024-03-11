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
const successSubmissions = {}; // object to store data before database is implemented

app.post("/success", (request, response) => {
  const id = uuidv4();
  const name = request.body.name;
  const type = request.body.type;
  const media = request.body.media;
  const description = request.body.description;
  const articleLink = request.body.articleLink;
  const imageLink = request.body.imageLink;

  successSubmissions[id] = {
    name,
    type,
    media,
    articleLink,
    imageLink,
    description,
  };

  response.redirect(`/success/${id}`);
});

app.get("/success/:id", (request, response) => {
  const successSubmission = successSubmissions[request.params.id];
  console.log(successSubmissions);
  response.render("successSubmission", successSubmission);
});

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

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "public/pages/index.html"));
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
