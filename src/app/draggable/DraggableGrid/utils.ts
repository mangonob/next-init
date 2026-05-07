import { minBy } from 'lodash-es'
import { nanoid } from 'nanoid'

import { DraggableGridRow } from '.'

export function getNearestItem(
  grid: Element,
  x: number,
  y: number,
): HTMLElement | undefined {
  const items = grid.querySelectorAll(
    '.draggable-grid__item:not([data-dnd-dragging="true"])',
  )
  const relativeDistances = Array.from(items).map(e => {
    const rel = getRelativePosition(e, x, y)
    const { dx, dy } = rel
    const distance = Math.sqrt(dx * dx + dy * dy)
    return {
      element: e,
      distance,
    }
  })
  return minBy(relativeDistances, 'distance')?.element as HTMLElement
}

export type Vector = {
  dx: number
  dy: number
}

export function getRelativePosition(
  element: Element,
  x: number,
  y: number,
): Vector {
  const { x: ex, y: ey, width, height } = element.getBoundingClientRect()
  const centerX = ex + width / 2
  const centerY = ey + height / 2
  const dx = ((x - centerX) / width) * 2
  const dy = ((y - centerY) / height) * 2
  return { dx, dy }
}

type Action =
  | {
      type: 'insert' | 'append' | 'insertRow' | 'appendRow' | 'swap'
      target: string
      source: string
    }
  | { type: 'nop' }

function normalized(v: Vector): Vector {
  return {
    dx: (v.dx + 1) / 2,
    dy: (v.dy + 1) / 2,
  }
}

export function getAction(
  element: Element,
  dragging: Element,
  x: number,
  y: number,
): Action {
  const elementKey = (element as HTMLElement).dataset.itemKey
  const draggingKey = (dragging as HTMLElement).dataset.itemKey

  const elementRowKey = (element as HTMLElement).dataset.rowKey
  const draggingRowKey = (dragging as HTMLElement).dataset.rowKey
  const isSameRow =
    elementRowKey && draggingRowKey && elementRowKey === draggingRowKey

  if (elementKey && draggingKey) {
    const { dx, dy } = normalized(getRelativePosition(element, x, y))
    const rowRate = 0
    const insertRate = 0.25

    if (dy < rowRate) {
      return {
        type: 'insertRow',
        target: elementKey,
        source: draggingKey,
      }
    } else if (dy > 1 - rowRate) {
      return {
        type: 'appendRow',
        target: elementKey,
        source: draggingKey,
      }
    } else if (
      (dx < insertRate && elementKey !== draggingKey) ||
      (!isSameRow && dx < 0.5)
    ) {
      return {
        type: 'insert',
        target: elementKey,
        source: draggingKey,
      }
    } else if (
      (dx > 1 - insertRate && elementKey !== draggingKey) ||
      (!isSameRow && dx > 0.5)
    ) {
      return {
        type: 'append',
        target: elementKey,
        source: draggingKey,
      }
    } else if (elementKey !== draggingKey) {
      return {
        type: 'swap',
        target: elementKey,
        source: draggingKey,
      }
    } else {
      return { type: 'nop' }
    }
  } else {
    return { type: 'nop' }
  }
}

export function removeEmptyRows(rows: DraggableGridRow[]): DraggableGridRow[] {
  return rows.filter(row => row.children.length > 0)
}

export function applyRows(
  rows: DraggableGridRow[],
  action: Action,
): DraggableGridRow[] | undefined {
  const getItem = (source: string) => {
    return rows
      .flatMap(row => row.children ?? [])
      .filter(e => e.key === source)[0]
  }

  switch (action.type) {
    case 'nop':
      return
    case 'append':
    case 'insert': {
      try {
        const sourceItem = getItem(action.source)
        const _newRows = rows.map(row => {
          const { children } = row
          const sourceIndex = children.findIndex(e => e.key === action.source)
          const targetIndex = children.findIndex(e => e.key === action.target)
          const foundSource = sourceIndex >= 0
          const foundTarget = targetIndex >= 0

          if (foundSource && foundTarget) {
            if (action.type === 'append' && targetIndex + 1 === sourceIndex) {
              throw Error('unused move')
            } else if (
              action.type === 'insert' &&
              targetIndex - 1 === sourceIndex
            ) {
              throw Error('unused move')
            }
          }

          const newChildren = children.filter(e => e.key !== action.source)
          const _targetIndex = newChildren.findIndex(
            e => e.key === action.target,
          )

          if (_targetIndex >= 0) {
            if (action.type === 'insert') {
              newChildren.splice(_targetIndex, 0, sourceItem)
            } else {
              newChildren.splice(_targetIndex + 1, 0, sourceItem)
            }
          }

          return { ...row, children: newChildren }
        })
        return _newRows
      } catch {}

      break
    }
    case 'appendRow':
    case 'insertRow': {
      try {
        const sourceItem = getItem(action.source)
        const targetRowIndex = rows.findIndex(row =>
          row.children.some(e => e.key === action.target),
        )
        if (targetRowIndex >= 0) {
          const newRows = rows.map(row => {
            const { children } = row
            const sourceIndex = children.findIndex(e => e.key === action.source)
            if (sourceIndex >= 0) {
              const newChildren = children.filter(e => e.key !== action.source)
              return { ...row, children: newChildren }
            } else {
              return row
            }
          })
          newRows.splice(
            targetRowIndex + (action.type === 'appendRow' ? 1 : 0),
            0,
            {
              key: nanoid(),
              children: [sourceItem],
            },
          )
          return newRows
        }
      } catch {}

      break
    }
    case 'swap': {
      try {
        const { source, target } = action

        if (source === target) {
          throw Error('unused move')
        } else {
          const sourceRowIndex = rows.findIndex(row =>
            row.children.some(e => e.key === source),
          )
          const targetRowIndex = rows.findIndex(row =>
            row.children.some(e => e.key === target),
          )
          if (sourceRowIndex !== targetRowIndex) {
            throw Error('cannot swap different rows')
          } else {
            const sourceItem = getItem(source)
            const targetItem = getItem(target)
            const newRows = rows.map(row => {
              const { children, ...rest } = row
              const newChildren = children.map(e => {
                if (e.key === source) {
                  return targetItem
                } else if (e.key === target) {
                  return sourceItem
                } else {
                  return e
                }
              })
              return { children: newChildren, ...rest }
            })
            return newRows
          }
        }
      } catch {}
      break
    }
    default:
      break
  }
}

/**
 * maxSpan(n) = max{ x | lcm(1, 2, ..., x) == n }
 */
export function maxSpan(n: number): number {
  if (n <= 0) {
    throw Error('n must be positive')
  } else {
    let total = 1
    let x = 1
    while (true) {
      total = lcm(total, x + 1)
      if (n % total !== 0) {
        break
      }
      x += 1
    }
    return x
  }
}

function gcd(a: number, b: number): number {
  while (b !== 0) {
    ;[a, b] = [b, a % b]
  }

  return a
}

function lcm(a: number, b: number): number {
  return (a / gcd(a, b)) * b
}
