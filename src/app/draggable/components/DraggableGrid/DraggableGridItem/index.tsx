import { useDraggable } from '@dnd-kit/react'
import { HTMLAttributes, useEffect, useRef } from 'react'

import { DraggableGridItemValue } from '..'
import { useDraggableGridStore } from '../store'

export type DraggableGridItemProps = {
  value: DraggableGridItemValue
  handleSelector?: string
} & HTMLAttributes<HTMLDivElement>

export default function DraggableGridItem({
  value,
  handleSelector = '.draggable-grid__item-handle',
  ...restProps
}: DraggableGridItemProps) {
  const { key, children } = value
  const components = useDraggableGridStore(s => s.components)

  const renderChildren = () => {
    if (typeof children === 'string') {
      const Component = components[children]
      if (Component) {
        return <Component />
      }
    } else {
      return children
    }
  }

  const { ref, handleRef } = useDraggable({
    id: key,
  })
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (handleSelector) {
      const handle = contentRef.current?.querySelector(handleSelector)

      if (handle) {
        handleRef(handle)

        return () => {
          handleRef(null)
        }
      }
    }
  }, [handleRef, handleSelector])

  return (
    <div
      ref={ref}
      className="draggable-grid__item"
      data-item-key={key}
      {...restProps}
    >
      <div
        data-flip-id={key}
        className="draggable-grid__item-content"
        ref={contentRef}
      >
        {renderChildren()}
      </div>
    </div>
  )
}
