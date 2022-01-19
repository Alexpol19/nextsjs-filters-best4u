import styles from './CloseButton.module.css'

const CloseButton = ({ handleClose }) => (
  <div
    className={styles.btn}
    onClick={handleClose}
  >
    <img src="static/images/close.svg" alt="close btn" />
  </div>
)

export default CloseButton