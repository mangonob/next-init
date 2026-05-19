import { Input as _Input, InputProps } from 'antd'

import cc from '../../utils/classname'

import styles from './index.module.scss'

export default function Input({ className, ...restProps }: InputProps) {
  return <_Input className={cc([styles.input, className])} {...restProps} />
}
