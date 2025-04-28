import { Link } from 'react-router'
import styles from './BoardPage.module.css'

const BoardPage = ({ boards }) => {

  return (
    <div>

      <h2>Boards</h2>

      <ul>
        {
          boards.map(board => {
            return (
              <li key={board.id}>
                <Link to={`/boards/${board.id}`}>{board.content}</Link>
              </li>
            )
          })
        }
      </ul>

    </div>
  )
}

export default BoardPage