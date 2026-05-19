import { DragDropProvider } from '@dnd-kit/react'
import { useMemoizedFn } from 'ahooks'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ComponentProps, useRef } from 'react'

import { applyRows, getAction, getNearestItem, removeEmptyRows } from './utils'

import { DraggableGridRow } from '.'

type OnDragMove = NonNullable<
  ComponentProps<typeof DragDropProvider>['onDragMove']
>

type OnDragEnd = NonNullable<
  ComponentProps<typeof DragDropProvider>['onDragEnd']
>

gsap.registerPlugin(Flip)

export default function useDragEvents(
  rows: DraggableGridRow[],
  onRowsChanged?: (rows: DraggableGridRow[]) => void,
  onRowsConfirm?: (rows: DraggableGridRow[]) => void,
) {
  const raf = useRef<number>(null)

  const onDragMove = useMemoizedFn<OnDragMove>(e => {
    const draggingItem = e.operation.source?.element?.closest(
      '.draggable-grid__item',
    )
    const grid = draggingItem?.closest('.draggable-grid')
    const { x, y } = e.operation.position.current

    if (grid) {
      const itemElement = getNearestItem(grid, x, y)
      if (itemElement) {
        const action = getAction(itemElement, draggingItem!, x, y)
        const newRows = applyRows(rows, action)
        if (newRows) {
          const items = grid.querySelectorAll(
            '.draggable-grid__item-content:not([data-dnd-dragging="true"])',
          )
          const state = Flip.getState(items)
          onRowsChanged?.(removeEmptyRows(newRows))
          if (raf.current !== null) {
            cancelAnimationFrame(raf.current)
          }
          raf.current = requestAnimationFrame(() => {
            Flip.from(state, {
              duration: 0.25,
            })
          })
        }
      }
    }
  })

  const onDragEnd = useMemoizedFn<OnDragEnd>(() => {
    onRowsConfirm?.(rows)
  })

  return {
    onDragMove,
    onDragEnd,
  }
}
