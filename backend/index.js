const express = require('express')
const app = express()

let boards = [
  {
    id: "1",
    content: "Board One"
  },
  {
    id: "2",
    content: "Board Two"
  },
  {
    id: "3",
    content: "Board Three"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/boards', (request, response) => {
  response.json(boards)
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})