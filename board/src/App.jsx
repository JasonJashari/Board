import boardService from './services/boards'
import { useEffect, useState } from 'react'
import Board from './components/Board/Board'
import styles from './App.module.css'

const App = () => {

  const [boards, setBoards] = useState([])
  const [newBoard, setNewBoard] = useState('')

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
      <h2>Existing Boards</h2>
      
      <ul className={styles.boardList}>
        {boards.map(board => {
          return (
            <li key={board.id}>
              <Board board={board} />
            </li>
          )
        })}
      </ul>

      <h2>Create a new board</h2>

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
