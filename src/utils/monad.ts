import { isNil } from 'lodash-es'

type FlatMap<U> = {
  run: () => U | undefined
} & (<N>(fn: (v: U) => N | undefined) => FlatMap<N>)

export function flatMap<T, U>(
  v: T | undefined | null,
  fn: (v: T) => U | undefined,
): FlatMap<U> {
  const run = () => (isNil(v) ? undefined : fn(v))
  const nextFn = <N>(fn: (v: U) => N | undefined) => flatMap(run(), fn)
  return Object.assign(nextFn, { run })
}
