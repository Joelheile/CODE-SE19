const express = require("express");
const path = require("path");

const app = express();
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
app.post("/add", (request, response) => {
  console.log("New Success Submition: ", request.body);
  response.sendFile(path.join(__dirname, "public/pages/formSubmit.html"));
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
