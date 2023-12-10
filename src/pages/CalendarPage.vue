<script setup lang="ts">
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import DataSend from '../components/DataSend.vue'
import { useEventStore } from '@/store/event'
import type { MyEvent } from '../interfaces'

const event1 = {
  id: 'a',
  title: 'test',
  start: '2023-12-24',
  end: '2023-12-25'
}

const event2 = {
  id: 'b',
  title: 'test2',
  start: '2023-12-24',
  end: '2023-12-26'
}

const eventStore = useEventStore()
eventStore.setEvent(event1)
eventStore.setEvent(event2)

const calendarOptions = ref({
                    plugins: [ dayGridPlugin, interactionPlugin ],
                    initialView: 'dayGridMonth',
                    events: eventStore.getEvents
                  })
</script>

<template>
  <FullCalendar :options="calendarOptions" />
  <DataSend />
</template>