import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react'

import cc from '../../../../../utils/classname'
import { Tag } from '../Tag'

import styles from './index.module.scss'

export type MarqueeItemProps = {
  type: 'warning' | 'error'
  title?: ReactNode
} & HTMLAttributes<HTMLDivElement> &
  PropsWithChildren

export default function MarqueeItem({
  type,
  title,
  children,
  className,
  ...restProps
}: MarqueeItemProps) {
  return (
    <div className={cc([styles['marquee-item'], className])} {...restProps}>
      <Tag variant="tag" type={type} />
      <div>{title}</div>
      <div>{children}</div>
    </div>
  )
}
