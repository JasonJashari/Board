const config = require("./config");
const logger = require("./logger");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(config.DB_URI);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Connected to the database");
  } catch (error) {
    logger.error("Failed to connect to the database:", error);
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
