'use client'

import { Button } from '@/components/retroui/Button'
import { Camera } from 'lucide-react'

export default function Examples() {
  return (
    <Button onClick={console.info} disabled>
      Examples
      <Camera />
    </Button>
  )
}
