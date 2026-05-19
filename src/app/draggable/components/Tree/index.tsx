import { Tree as _Tree, TreeProps } from 'antd'

import cc from '../../utils/classname'

import styles from './index.module.scss'

export default function Tree({ className, ...restProps }: TreeProps) {
  return (
    <_Tree className={cc([styles.tree, className])} blockNode {...restProps} />
  )
}
