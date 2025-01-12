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

app.get('/api/boards', (request, response) => {
  Board.find({}).then(boards => response.json(boards))
})

app.get('/api/boards/:id', (request, response) => {
  const id = request.params.id
  const board = boards.find(board => board.id === id)

  if (board) {
    response.json(board)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/boards/:id', (request, response) => {
  const id = request.params.id
  boards = boards.filter(board => board.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = boards.length > 0
    ? Math.max(...boards.map(b => Number(b.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/boards', (request, response) => {
  const body = request.body
  
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const board = {
    id: generateId(),
    content: body.content,
  }

  boards = boards.concat(board)

  response.json(board)
})

// Middleware to catch requests made to non-existing routes
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})