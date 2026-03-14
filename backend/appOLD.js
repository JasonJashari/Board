const express = require("express");
const app = express();
const middleware = require("./utils/middleware");

// middleware to serve static files from frontend distributable
app.use(express.static("dist"));

// json-parser middleware to transform JSON data
// from POST request into a Javascript object
app.use(express.json());

// board router
//app.use("/api/boards", boardsRouter);

// middleware to catch requests made to non-existing routes
app.use(middleware.unknownEndpoint);

// last loaded middlware
// invoked when error is thrown
app.use(middleware.errorHandler);

module.exports = app;
