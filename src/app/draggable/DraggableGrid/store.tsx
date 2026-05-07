import { createContext, use } from 'react'
import { createStore, ExtractState, useStore } from 'zustand'

export type DraggableGridState = {
  gridId: string | number
  components: Record<string, React.ComponentType>
}

export type DraggableGridStore = DraggableGridState

export function createDraggableGridStore(initialState: DraggableGridState) {
  return createStore<DraggableGridStore>(() => {
    return {
      ...initialState,
    }
  })
}

export type DraggableGridStoreAPI = ReturnType<typeof createDraggableGridStore>

export const DraggableGridContext = createContext<
  ReturnType<typeof createDraggableGridStore>
>(null as unknown as ReturnType<typeof createDraggableGridStore>)

export function useDraggableGridStore(): ExtractState<DraggableGridStoreAPI>
export function useDraggableGridStore<U>(
  selector: (state: ExtractState<DraggableGridStoreAPI>) => U,
): U
export function useDraggableGridStore<U>(
  selector?: (state: ExtractState<DraggableGridStoreAPI>) => U,
): U | ExtractState<DraggableGridStoreAPI> {
  const store = use(DraggableGridContext)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return useStore(store, selector)
}
