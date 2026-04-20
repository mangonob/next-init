'use client'

import { useState } from 'react'

import { Button } from '@/components/retroui/Button'

export default function Examples() {
  const [count, setCount] = useState(0)

  if (count % 2 === 0) {
    setCount(count + 1)
  }

  return (
    <div className="p-4 flex flex-row gap-2 items-center">
      <Button onClick={() => setCount(count + 1)}>Examples</Button>
      {count}
      <Child />
    </div>
  )
}

function Child() {
  console.info('Child rendered')
  return <span>Child</span>
}
