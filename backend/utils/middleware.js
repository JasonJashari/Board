const logger = require('./logger')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// error handler middleware
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  // CastError: invalid object id for Mongo
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'invalid id' })
  }
  // ValidationError: object validation
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  // else, pass error to default express error handler
  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}