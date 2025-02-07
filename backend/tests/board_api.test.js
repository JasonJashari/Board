const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Board = require('../models/board')

// superagent object
// tests can use for making HTTP requests to the backend
const api = supertest(app)

// Initialise the database before every test
const initialBoards = [
  {
    content: 'HTML is easy',
  },
  {
    content: 'Browser can execute only JavaScript'
  }
]

beforeEach(async () => {
  await Board.deleteMany({})
  let boardObject = new Board(initialBoards[0])
  await boardObject.save()
  boardObject = new Board(initialBoards[1])
  await boardObject.save()
})

// HTTP GET 'api/boards'
// verifies that 
// - response is status code 200
// - content type header contains "application/json"
test('boards are returned as json', async () => {
  await api
    .get('/api/boards')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two boards', async () => {
  const response = await api.get('/api/boards')
  assert.strictEqual(response.body.length, initialBoards.length)
})

test('the first board is about HTTP methods', async () => {
  const response = await api.get('/api/boards')
  const contents = response.body.map(e => e.content)
  assert(contents.includes('HTML is easy'))
})

after(async () => {
  await mongoose.connection.close()
})