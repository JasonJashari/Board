require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Board = require('./models/board')

const app = express()

// middleware to serve static files from frontend distributable
app.use(express.static('dist'))

// cors middleware to allow requests from all origins
app.use(cors())

// json-parser middleware to transform JSON data
// from POST request into a Javascript object
app.use(express.json())

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// error handler middleware
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  // CastError: invalid object id for Mongo
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'invalid id' })
  }

  // else, pass error to default express error handler
  next(error)
}

app.get('/api/boards', (request, response) => {
  Board.find({}).then(boards => response.json(boards))
})

app.get('/api/boards/:id', (request, response, next) => {
  const id = request.params.id
  Board.findById(id)
    .then(board => {
      // if no matching object in db, board will be null
      if (board) {
        response.json(board)
      } else {
        response.status(404).end()
      }
    })
    // execution continues to the error handler middleware
    .catch(error => next(error))
})

app.delete('/api/boards/:id', (request, response) => {
  const id = request.params.id
  boards = boards.filter(board => board.id !== id)

  response.status(204).end()
})

app.post('/api/boards', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const board = new Board({
    content: body.content
  })

  board.save().then(savedBoard => response.json(savedBoard))
})

// middleware to catch requests made to non-existing routes
app.use(unknownEndpoint)

// last loaded middlware
// invoked when error is thrown
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})