import { HTMLAttributes, PropsWithChildren } from 'react'

import cc from '../../utils/classname'

import styles from './index.module.scss'

export type CardProps = {
  progress?: number
} & HTMLAttributes<HTMLDivElement> &
  PropsWithChildren

export default function Card({ className, children, ...restProps }: CardProps) {
  return (
    <div className={cc([styles.card, className])} {...restProps}>
      {children}
    </div>
  )
}
