import { PropsWithChildren, ReactNode } from 'react'

import Card from '../../../../components/Card'

export type DashboardItemProps = {
  draggable?: boolean
  title?: ReactNode
  subtitle?: ReactNode
  surffix?: ReactNode
  progress?: number
} & PropsWithChildren

export default function DashboardItem({
  progress,
  children,
  draggable = false,
  title,
  subtitle,
  surffix,
  ...restProps
}: DashboardItemProps) {
  return (
    <Card progress={progress} {...restProps}>
      <div className="">
        <div></div>
        {children}
      </div>
    </Card>
  )
}
