import { HTMLAttributes } from 'react'

import cc from '../../utils/classname'

import DashboardItem from './children/DashboardItem'
import WarnningMarquee from './children/WarningMarquee'
import styles from './index.module.scss'

export type MonitorContentProps = HTMLAttributes<HTMLDivElement>

export default function MonitorContent({
  className,
  ...restProps
}: MonitorContentProps) {
  return (
    <div className={cc([styles['monitor-content'], className])} {...restProps}>
      <WarnningMarquee />
      <div className={styles.dashboard}>
        <div>
          <DashboardItem />
        </div>
        <div></div>
        <DashboardItem />
      </div>
    </div>
  )
}
