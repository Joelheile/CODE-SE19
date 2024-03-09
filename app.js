const express = require("express");

const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'public/pages'));
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
app.post("/add-success", (request, response) => {
  const name = request.body.name;
  const type = request.body.type;
  const media = request.body.media;
  const description = request.body.description;
  const articleLink = request.body.articleLink;
  const imageLink = request.body.imageLink;
  console.log("req body", request.body)
  console.log("New Success Submission: ", name, type, media, articleLink, imageLink);

  response.render('successSubmission', {name, type, media, articleLink, imageLink, description})
});

app.get("/search", (request, response) => {
  const query = request.query.query;
  response.send(`You searched for: ${query}`);
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
