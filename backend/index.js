const express = require('express')
const config = require('./utils/config')
const dbConfig = require('./utils/db')
const boardsRouter = require('./controllers/boards')

const app = express()
app.use(express.json())
app.use('/api/boards', boardsRouter)

const start = async () => {
  await dbConfig.connectToDatabase()
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
  })
}

start()