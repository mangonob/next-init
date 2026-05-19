import { Button as _Button, type ButtonProps } from 'antd'

import cc from '../../utils/classname'

import styles from './index.module.scss'

export default function Button({ className, ...restProps }: ButtonProps) {
  return (
    <_Button
      className={cc([styles.button, className])}
      {...restProps}
    ></_Button>
  )
}
