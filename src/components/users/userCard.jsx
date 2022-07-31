import styles from './users.module.css'
import Loader from '../page/Loader'

export const UserCard = ({ user }) => {
  const {
    email,
    phone,
    avatar,
    firstName,
    lastName,
    jobType,
    jobTitle,
    history,
    countries,
    states,
    cities,
    universities,
  } = user

  const WorkHistory = history.map((e, i) => <p key={i}>{e}</p>)

  if (!user) {
    return <Loader />
  }

  return (
    <div className={styles.userCard}>
      <img src={avatar} alt="" className={styles.avatar} />
      <div className={styles.infoBlock}>
        <h2>
          {firstName} {lastName}
        </h2>
        <h4>{jobType}</h4>
        <h4>{jobTitle}</h4>
        <div className={styles.workHistory}>
          <h3>Work History</h3>
          {WorkHistory}
        </div>
        <h3>University</h3>
        <p>{universities}</p>
        <p>email: {email}</p>
        <p>phone :{phone}</p>
        <p>
          Location : {countries}, {states}, {cities}
        </p>
      </div>
    </div>
  )
}
