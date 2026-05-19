'use client'

import GlobalStyles from './children/GlobalStyles'
import MonitorContent from './children/MonitorContent'
import MonitorHeader from './children/MonitorHeader'
import MonitorSide from './children/MonitorSide'
import Toolbar from './children/Toolbar'
import styles from './index.module.scss'
import { useMonitorStore } from './store'
import cc from './utils/classname'

export default function MonitorPage() {
  const isSideOpen = useMonitorStore(s => s.isSideOpen)

  return (
    <div className={styles['monitor-page']}>
      <GlobalStyles />
      <MonitorSide className={cc([styles.side, isSideOpen && styles.open])} />
      <div className={styles.main}>
        <MonitorHeader className={styles.header} />
        <Toolbar className={styles.toolbar} />
        <MonitorContent className={styles.content} />
      </div>
    </div>
  )
}
