import { create } from 'zustand'

export type MonitorState = {
  isSideOpen: boolean
}

export type MointorActions = {
  setSideOpen: (isOpen: boolean) => void
}

export type MonitorStore = MonitorState & MointorActions

export const useMonitorStore = create<MonitorStore>(set => {
  return {
    isSideOpen: true,
    setSideOpen: (isOpen: boolean) => set({ isSideOpen: isOpen }),
  }
})
