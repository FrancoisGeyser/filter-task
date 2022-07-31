import { useSelector } from 'react-redux'
import { filteredUsers } from '../../store/reducers/userSlice'
import { UserCard } from './userCard'
import styles from './users.module.css'

export const DisplayUsers = () => {
  const users = useSelector(filteredUsers)

  const Users = () =>
    users.map((user, index) => <UserCard key={index} user={user} />)

  return (
    <div className={styles.usersDisplay}>
      <Users />
    </div>
  )
}
