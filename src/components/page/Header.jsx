import styles from './header.module.css'
export const Header = () => {
  return (
    <div className={styles.Header}>
      <h1>Your Logo Here!</h1>
      <input placeholder="Enter Search" />
    </div>
  )
}
