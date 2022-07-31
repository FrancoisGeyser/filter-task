import styles from './pagelayout.module.css'

export const PageLayout = ({ children }) => {
  return (
    <div className={styles.page}>
      <div className={styles.sideBar} />
      {children}
    </div>
  )
}
