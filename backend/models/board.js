const mongoose = require('mongoose')
// Define mongoose schema for boards

const boardSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
})

// Format objects returned by Mongoose
// Return id and remove _id and __v
boardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Board = mongoose.model('Board', boardSchema)
module.exports = Board