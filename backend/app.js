const express = require("express");
const dbConfig = require("./utils/db");
const logger = require("./utils/logger");
const boardsRouter = require("./controllers/boards");

const app = express();

logger.info("Connecting to DB");

dbConfig
  .connectToDatabase()
  .then(() => logger.info("Connected to DB"))
  .catch((error) => logger.error("Error connecting to DB:", error));

app.use(express.json());
app.use("/api/boards", boardsRouter);

module.exports = app;
