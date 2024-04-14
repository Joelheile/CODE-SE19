const express = require("express");
const successRouter = require("./router/protectedRoutes");
const authRouter = require("./router/authenticationRoutes");

function createServer() {
  const app = express();

  app.use("/", successRouter);
  app.use("/auth/", authRouter);

  return app;
}

module.exports = createServer;
