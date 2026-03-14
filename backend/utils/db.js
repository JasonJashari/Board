const config = require("./config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(config.DB_URI);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database");
  } catch (error) {
    console.log("Failed to connect to the database");
    console.log(error);
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
