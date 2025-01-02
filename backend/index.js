const http = require('http')

let notes = [
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

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)