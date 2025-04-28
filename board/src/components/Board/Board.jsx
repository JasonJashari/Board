import { useParams } from 'react-router'
import styles from './Board.module.css'

const Board = ({ board }) => {

  return (
    <div>
      <h2>{board.content}</h2>
    </div>
  )
}

export default Board