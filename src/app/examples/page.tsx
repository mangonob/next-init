'use client'

import { useMemoizedFn } from 'ahooks'
import { random } from 'lodash-es'
import { useState } from 'react'

import { Button } from '@/components/retroui/Button'
import { Input } from '@/components/retroui/Input'
import { useChanged } from '@/hooks/useChanged'

export default function Examples() {
  'use no memo'
  const [data, setData] = useState<number[]>([])
  const [value, setValue] = useState('')

  const onClick = useMemoizedFn(() => {
    fetchData().then(newData => setData(newData as number[]))
  })

  useChanged(data, newData => {
    if (newData.length) {
      setValue(newData.map(String).join(','))
    }
  })

  return (
    <div className="p-4 flex flex-col gap-2 items-start">
      <Button onClick={onClick}>Request</Button>
      <Input value={value} onChange={e => setValue(e.target.value)} />
    </div>
  )
}

function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Array.from({ length: random(7) + 3 }, () => random(100)))
    }, 200)
  })
}
