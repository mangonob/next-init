import { DragDropProvider } from '@dnd-kit/react'
import { CSSProperties, HTMLAttributes, useId, useMemo } from 'react'

import './index.scss'

import cc from '../../utils/classname'

import DraggableGridItem from './DraggableGridItem'
import useDragEvents from './hooks'
import { createDraggableGridStore, DraggableGridContext } from './store'
import { maxSpan } from './utils'

export type DraggableGridItemValue = {
  key: string
  children: string | React.ReactNode
}

export type DraggableGridRow = {
  key: string
  children: DraggableGridItemValue[]
}

export type DraggableGridProps = {
  gridId?: string | number
  columnCount?: number
  gap?: number
  columnGap?: number
  rows: DraggableGridRow[]
  onRowsChanged?: (rows: DraggableGridRow[]) => void
  onRowsConfirm?: (rows: DraggableGridRow[]) => void
  components?: Record<string, React.ComponentType>
} & HTMLAttributes<HTMLDivElement>

export default function DraggableGrid({
  rows,
  components,
  gridId: _gridId,
  className,
  onRowsChanged,
  onRowsConfirm,
  gap = 8,
  columnGap = 8,
  columnCount = 12,
  style,
  ...restProps
}: DraggableGridProps) {
  const _id = useId()
  const gridId = _gridId || 'grid_' + _id

  const store = useMemo(
    () => createDraggableGridStore({ gridId, components: components || {} }),
    [gridId, components],
  )

  const listeners = useDragEvents(rows, onRowsChanged, onRowsConfirm)

  return (
    <DraggableGridContext value={store}>
      <DragDropProvider {...listeners}>
        <div
          className={cc([className, 'draggable-grid'])}
          style={
            {
              ...style,
              overflow: 'hidden',
              '--draggable-grid-gap': gap + 'px',
              '--draggable-grid-column-gap': columnGap + 'px',
              '--draggable-grid-column-count': columnCount,
            } as CSSProperties
          }
          {...restProps}
          data-grid-id={gridId}
        >
          {rows.flatMap(row => {
            const { children, key } = row
            return (
              children?.map(item => (
                <DraggableGridItem
                  key={item.key}
                  data-row-key={key}
                  value={item}
                  style={{
                    gridColumn: `span ${Math.floor(columnCount / Math.min(children.length, maxSpan(columnCount)))}`,
                  }}
                />
              )) ?? []
            )
          })}
        </div>
      </DragDropProvider>
    </DraggableGridContext>
  )
}
