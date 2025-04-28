import boardService from './services/boards'
import { useEffect, useState } from 'react'
import Board from './components/Board/Board'
import styles from './App.module.css'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import BoardPage from './components/BoardPage/BoardPage'
import Home from './components/Home/Home'

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

  const match = useMatch('/boards/:id')
  const board = match ? boards.find(b => b.id === match.params.id) : null

  return (
    <div>
        <div className={styles.navbar}>
          <Link to="/">Home</Link>
          <Link to="/boards">Boards</Link>
        </div>

        <Routes>
          <Route path="/boards/:id" element={<Board board={board} />} />
          <Route path="/boards" element={<BoardPage boards={boards} />} />
          <Route path="/" element={<Home />} />
        </Routes>

      <footer className={styles.footer}>
        <br />
        <em>Board App, Jason</em>
      </footer>
    </div>
  )
}

export default App
