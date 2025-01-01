import boardService from './services/boards'
import './index.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [boards, setBoards] = useState([])
  const [newBoard, setNewBoard] = useState('a new board...')

  const addBoard = (event) => {
    event.preventDefault()
    console.log('button clicked', newBoard)
  }

  const handleBoardChange = (event) => {
    setNewBoard(event.target.value)
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/boards')
      .then(response => {
        console.log(response.data)
        setBoards(response.data)
      })
  }, [])

  return (
    <div>
      <h1 className='title'>Boards</h1>
      
      <ul>
        {boards.map(board => <li key={board.id}>{board.content}</li>)}
      </ul>

      <form onSubmit={addBoard}>
        <input
          value={newBoard}
          onChange={handleBoardChange}
        />
        <button type="submit">save</button>
      </form>

    </div>
  )
}

export default App
