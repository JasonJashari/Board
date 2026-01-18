const config = require("./utils/config");
const express = require("express");
const app = express();
const middleware = require("./utils/middleware");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    config.DB_NAME,
    config.DB_USERNAME,
    config.DB_PASSWORD,
    {
        host: config.DB_HOST,
        port: config.DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    }
)

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
