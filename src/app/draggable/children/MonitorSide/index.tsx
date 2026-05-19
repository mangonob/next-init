import { HTMLAttributes } from 'react'

import Button from '../../components/Button'
import Input from '../../components/Input'
import Tree from '../../components/Tree'
import cc from '../../utils/classname'

import useTreeData from './hooks'
import styles from './index.module.scss'

export type MonitorSideProps = {} & HTMLAttributes<HTMLElement>

export default function MonitorSide({ className }: MonitorSideProps) {
  const treeData = useTreeData()

  return (
    <aside className={cc([styles['monitor-side'], className])}>
      <header>
        <span className={styles.title}>账户树</span>
        <span className={styles.subtitle}>勾选节点进行筛选</span>
        <div className={styles.operator}>
          <Input
            className={styles.searcher}
            placeholder="搜索账簿..."
            allowClear
          />
          <Button>查询</Button>
        </div>
      </header>
      <Tree checkable treeData={treeData} defaultExpandAll />
    </aside>
  )
}
