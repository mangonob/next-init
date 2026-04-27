import { useState } from 'react'

export type UseUpdateOnChangedOptions<T> = {
  immediate?: boolean
  comparator?: (lhs: T, rhs: T | undefined) => boolean
}

export function useUpdateOnChanged<T>(
  value: T,
  onChanged: (_: T) => void,
  options?: UseUpdateOnChangedOptions<T>,
) {
  const { immediate = false, comparator = Object.is } = options || {}

  const [prev, setPrev] = useState(immediate ? void 0 : value)

  if (!comparator(value, prev)) {
    setPrev(value)
    onChanged(value)
  }
}
