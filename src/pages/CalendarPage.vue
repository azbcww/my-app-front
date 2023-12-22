<script setup lang="ts">
import { initCustomFormatter, ref} from 'vue'
import {container as ModalContainer, openModal} from 'jenesius-vue-modal'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import DataSend from '@/components/DataSend.vue'
import { useEventStore } from '@/store/event'
import { useUserInfoStore } from '@/store/userInfo'
import type { IsRemoved } from '@/interfaces'

const eventStore = useEventStore()
const userInfoStore = useUserInfoStore()

eventStore.$reset()
fetch('/api/events')
  .then( res => {
    if (res.ok) {
        const events = res.json()
        return events
    }else {
        return Promise.reject(new Error('error'))
    }
  })
  .then( events => {
    for (const event of events){
      const ID = eventStore.getEvents.length + 1
      eventStore.setEvent({
          id: String(ID),
          title: event.title,
          start: event.startdate,
          end: event.enddate,
      })
    }
  })

const calendarOptions = ref({
  plugins: [ dayGridPlugin, interactionPlugin ],
  initialView: 'dayGridMonth',
  displayEventTime: false,
  events: eventStore.getEvents,
  eventClick: function(info) {
    if (confirm('次の予定を削除しますか？\n' + info.event.title)) {
      fetch('/api/remove', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: userInfoStore.userName, data: info.event.title})
      })
      .then( res => {
          if (res.ok) {
              const event = res.json()
              return event
          }else {
              return Promise.reject(new Error('error'))
          }
      })
      .then(event => {
          const isRemoved = event as IsRemoved
          if (isRemoved.error != "") {
              console.log(isRemoved.error)
              return
          }
          info.event.remove()
      })
      .catch ( e => {
          console.log(e)
      })
    }
  }
})
</script>

<template>
  <FullCalendar :options="calendarOptions" />
  <DataSend />
  <modal-container/>
</template>
