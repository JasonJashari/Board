require('dotenv').config() // Already in index.js
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const boardSchema = new mongoose.Schema({
  content: String
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