import { isArray } from 'lodash-es'

export type DisposeBagInstance = {
  disposed: (_: () => void) => void
  dispose: () => void
}

export type Disposable = (() => void) | { dispose: () => void }

export function DisposeBag(): DisposeBagInstance {
  const disposeBag = new Set<Disposable>()

  const dispose = () => {
    disposeBag.forEach(disposable => {
      if (typeof disposable === 'function') {
        disposable()
      } else {
        disposable.dispose()
      }
    })
    disposeBag.clear()
  }

  return {
    dispose,
    disposed: (disposables: Disposable | Disposable[]) => {
      if (isArray(disposables)) {
        disposables.forEach(disposeBag.add)
      } else {
        disposeBag.add(disposables)
      }
    },
  }
}
