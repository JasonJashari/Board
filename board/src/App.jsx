import boardService from './services/boards'
import { useEffect, useState } from 'react'

const App = () => {

  const [boards, setBoards] = useState([])
  const [newBoard, setNewBoard] = useState('a new board...')

  const addBoard = (event) => {
    event.preventDefault()
    const boardObject = {
      content: newBoard
    }
    
    boardService
      .create(boardObject)
      .then(response => {
        setBoards(boards.concat(response.data))
        setNewBoard('')
      })
  }

  const handleBoardChange = (event) => {
    setNewBoard(event.target.value)
  }

  useEffect(() => {
    boardService
      .getAll()
      .then(response => {
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
