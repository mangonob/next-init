import { HTMLAttributes } from 'react'

import cc from '../../../../../utils/classname'

import styles from './index.module.scss'
import WarningIcon from './WarningIcon'

export type WarningMarqueeTagProps = {
  type: 'warning' | 'error'
  variant?: 'tag' | 'breating' | 'dot'
} & HTMLAttributes<HTMLDivElement>

export function Tag({
  className,
  type,
  variant = 'dot',
  ...restProps
}: WarningMarqueeTagProps) {
  const showDot = variant === 'dot' || variant === 'breating'
  return (
    <div
      className={cc([
        styles['tag-root'],
        className,
        styles[type],
        styles[variant],
      ])}
      {...restProps}
    >
      {variant === 'tag' && <WarningIcon />}
      {showDot && <div className={styles['dot-el']} />}
      <span>{type === 'warning' ? '预警' : '超限'}</span>
    </div>
  )
}
