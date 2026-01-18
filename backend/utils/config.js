require('dotenv').config()

const PORT = process.env.PORT

const DB_HOST=process.env.DB_HOST
const DB_PORT=process.env.DB_PORT
const DB_NAME = process.env.DB_NAME
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD

module.exports = {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
}