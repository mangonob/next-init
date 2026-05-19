import { HTMLAttributes, useState } from 'react'
import Marquee from 'react-fast-marquee'

import cc from '../../../../utils/classname'

import AlertIcon from './icons/AlertIcon'
import CloseIcon from './icons/CloseIcon'
import styles from './index.module.scss'
import MarqueeItem from './MarqueeItem'
import { Tag } from './Tag'

export type WarningMarqueeProps = HTMLAttributes<HTMLDivElement>

export default function WarningMarquee({
  className,
  ...rest
}: WarningMarqueeProps) {
  const [isExpanded, setExpanded] = useState(true)

  const renderLine = (type: 'warning' | 'error') => {
    return (
      <div className={cc([styles.row, styles[type]])}>
        <Tag type={type} className={styles.tag} />
        <Marquee
          speed={type === 'error' ? 80 : void 0}
          className={styles.marquee}
        >
          <div className={styles.line}>
            <MarqueeItem type={type}>AA-持仓占比 28% 接近上限30%</MarqueeItem>
            <MarqueeItem type={type}>AA-持仓占比 28% 接近上限30%</MarqueeItem>
            <MarqueeItem type={type}>AA-持仓占比 28% 接近上限30%</MarqueeItem>
            <MarqueeItem type={type}>AA-持仓占比 28% 接近上限30%</MarqueeItem>
            <MarqueeItem type={type}>AA-持仓占比 28% 接近上限30%</MarqueeItem>
            <MarqueeItem type={type}>AA-持仓占比 28% 接近上限30%</MarqueeItem>
          </div>
        </Marquee>
      </div>
    )
  }

  const renderContent = () => {
    if (isExpanded) {
      return (
        <>
          <div className={styles.rows}>
            {renderLine('error')}
            {renderLine('warning')}
          </div>
          <div className={styles.close} onClick={() => setExpanded(false)}>
            <CloseIcon />
          </div>
        </>
      )
    } else {
      return (
        <div className={styles['expand-btn']} onClick={() => setExpanded(true)}>
          <AlertIcon className={styles.icon} />
          展开告警(8)
        </div>
      )
    }
  }

  return (
    <div
      className={cc([
        styles['warning-marquee'],
        className,
        isExpanded && styles.expanded,
      ])}
      {...rest}
    >
      {renderContent()}
    </div>
  )
}
