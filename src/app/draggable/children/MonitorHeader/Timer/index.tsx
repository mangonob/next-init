import styles from './index.module.scss'

export default function Timer() {
  return (
    <div className={styles.timer}>
      <div className={styles['breathing-light']}></div>
      <span>2026/05/19 22:31:30</span>
    </div>
  )
}
