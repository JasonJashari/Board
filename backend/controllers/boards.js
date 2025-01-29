const boardsRouter = require('express').Router()
const Board = require('../models/board')

boardsRouter.get('/', (request, response) => {
  Board.find({}).then(boards => response.json(boards))
})

boardsRouter.get('/:id', (request, response, next) => {
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

boardsRouter.post('/', (request, response, next) => {
  const body = request.body

  const board = new Board({
    content: body.content
  })

  board.save()
    .then(savedBoard => response.json(savedBoard))
    .catch(error => next(error))
})

boardsRouter.delete('/:id', (request, response, next) => {
  Board.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

boardsRouter.put('/:id', (request, response, next) => {
  const { content } = request.body

  Board.findByIdAndUpdate(
    request.params.id,
    { content },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedBoard => response.json(updatedBoard))
    .catch(error => next(error))
})

module.exports = boardsRouter