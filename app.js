const dotenv = require("dotenv/config");
const express = require("express");

const path = require("path");

const createServer = require("./src/api/server");
const app = createServer();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.static(__dirname + "/src"));

app.listen(process.env.PORT, () => {
  console.log(`👋 Started server on port ${process.env.PORT}`);
});
