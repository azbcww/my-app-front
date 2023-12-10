import { defineStore } from 'pinia'
import type { MyEvent } from '@/interfaces'

export const useEventStore = defineStore({
  id: 'event',
  state: () => ({
    events: [] as MyEvent[]
  }),
  getters: {
    getEvents: (state) => state.events
  },
  actions: {
    setEvent(event: MyEvent) {
      this.events.push(event)
    }
  }
})
