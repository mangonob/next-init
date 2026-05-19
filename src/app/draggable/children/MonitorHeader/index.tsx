import { Flex, Space } from 'antd'

import Button from '../../components/Button'
import cc from '../../utils/classname'

import styles from './index.module.scss'
import Timer from './Timer'

export type MonitorHeaderProps = {
  className?: string
}

export default function MonitorHeader({ className }: MonitorHeaderProps) {
  return (
    <Flex
      align="center"
      justify="space-between"
      className={cc([styles['monitor-header'], className])}
      gap={24}
    >
      <span className={styles.title}>风险监控屏</span>
      <Space size={0}>
        <Button type="primary" size="large">
          风险驾驶舱
        </Button>
        <Button type="text" size="large">
          持仓报表
        </Button>
      </Space>
      <span className={styles.spacer} />
      <Timer />
    </Flex>
  )
}
