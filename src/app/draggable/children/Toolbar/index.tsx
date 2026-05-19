import { useShallow } from 'zustand/shallow'

import Button from '../../components/Button'
import { useMonitorStore } from '../../store'
import cc from '../../utils/classname'

import styles from './index.module.scss'
import SettingIcon from './SettingIcon'

export type ToolbarProps = {
  className?: string
}

export default function Toolbar({ className }: ToolbarProps) {
  const [isSideOpen, setSideOpen] = useMonitorStore(
    useShallow(s => [s.isSideOpen, s.setSideOpen]),
  )

  return (
    <div className={cc([styles.toolbar, className])}>
      <Button onClick={() => setSideOpen(!isSideOpen)}>
        {isSideOpen ? '◀ 收起' : '▶ 账户树'}
      </Button>
      <Button>
        <SettingIcon />
        自定义视图
      </Button>
    </div>
  )
}
