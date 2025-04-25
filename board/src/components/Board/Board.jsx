import styles from './Board.module.css'

const Board = ({ board }) => {
  return (
    <div className={styles.board}>
      {board.content}
    </div>
  )
}

export default Board