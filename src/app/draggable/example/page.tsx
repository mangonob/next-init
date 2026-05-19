'use client'

import { DragIndicator } from '@mui/icons-material'
import { useEffect, useState } from 'react'

import DraggableGrid, { DraggableGridRow } from '../components/DraggableGrid'
import cc from '../utils/classname'

export default function DragablePage() {
  const [rows, setRows] = useState<DraggableGridRow[]>([
    {
      key: 'row-1',
      children: [
        {
          key: '1',
          children: <Block title="Item 1" className="bg-green-500" />,
        },
      ],
    },
    {
      key: 'row-2',
      children: [
        {
          key: '3',
          children: <Block title="Item 3" className="bg-red-400" />,
        },
        {
          key: '4',
          children: <Block title="Item 4" className="bg-orange-400" />,
        },
        {
          key: '5',
          children: <Block title="Item 5" className="bg-blue-500" />,
        },
      ],
    },
  ])

  return (
    <div className="p-4">
      <DraggableGrid
        rows={rows}
        onRowsChanged={setRows}
        gridId="myGrid"
        onRowsConfirm={e => console.info(e)}
      />
    </div>
  )
}

function Block({ title, className }: { title: string; className?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={cc([
        'p-2 min-h-80 flex flex-col items-center justify-center relative transform-none',
        'rounded-lg',
        className,
      ])}
    >
      <div className="draggable-grid__item-handle absolute top-1 left-1">
        <DragIndicator className="text-white" />
      </div>
      <span>{title}</span>
      <span>Count: {count}</span>
    </div>
  )
}
