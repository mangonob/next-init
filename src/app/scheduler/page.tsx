'use client'

import { Button, Input } from '@mui/material'
import { useCallback } from 'react'

export default function SchedulerPage() {
  const onClick = useCallback(async () => {
    const taskNumber = 1000000000
    for (let i = 0; i < taskNumber; i++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.s = i
      if (i % 1000000 === 0) {
        console.log('Task will yield ...', i)
        await scheduler.yield()
        console.log('Task yielded ...', i)
      }
    }
  }, [])

  return (
    <div className="flex flex-col gap-4 items-start">
      <Input placeholder="Something..."></Input>
      <Button onClick={onClick}>Execute Long Task</Button>
      <Button
        onClick={() => {
          debugger
        }}
      >
        Debug
      </Button>
    </div>
  )
}
