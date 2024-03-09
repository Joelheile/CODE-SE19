const express = require("express");
const path = require("path");

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use('/pages', express.static(path.join(__dirname, 'public/pages')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/index.html'));
});


app.get("/addsuccess", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/addSuccess.html'));
  });

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/about.html'));
});

app.get("/team", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/team.html'));
});

app.listen(PORT, () => {
  console.log(`👋 Started server on port ${PORT}`);
});
