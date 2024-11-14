import { create } from 'zustand'

interface SettingsStore {
  settings: {
    defaultView: string
    showWeekends: boolean
    showWeekNumbers: boolean
    showBusinessHours: boolean
    defaultTimeSlot: number
  }
  updateSettings: (settings: any) => void
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: {
    defaultView: 'dayGrid',
    showWeekends: true,
    showWeekNumbers: false,
    showBusinessHours: true,
    defaultTimeSlot: 30
  },
  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings }
  }))
})) 