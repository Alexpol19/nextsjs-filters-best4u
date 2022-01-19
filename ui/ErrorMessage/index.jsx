import styles from './ErrorMessage.module.css'

const ErrorMessage = () => (
  <div className={styles.container}>
    <div className={styles.error}>
      <p>Not found card Data</p>
    </div>
  </div>
)

export default ErrorMessage