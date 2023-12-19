<script setup lang="ts">
import { initCustomFormatter, ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import DataSend from '../components/DataSend.vue'
import { useEventStore } from '@/store/event'
import { useUserInfoStore } from '@/store/userInfo'
import type { IsRemoved } from '../interfaces'
import {container as ModalContainer, openModal} from 'jenesius-vue-modal'
import ModalMulti from "../components/modal-multi.vue";

const eventStore = useEventStore()
const userInfoStore = useUserInfoStore()

const calendarOptions = ref({
  plugins: [ dayGridPlugin, interactionPlugin ],
  initialView: 'dayGridMonth',
  displayEventTime: false,
  events: eventStore.getEvents,
  eventClick: function(info) {
    if (confirm(info.event.title + '\n削除しますか？')) {
      //TODO:apiで削除要求
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
              return Promise.reject(new Error('error'));
          }
      })
      .then(res => {
          console.log()
          const isRemoved = res as IsRemoved
          if (isRemoved.error != "") {
              console.log(event.error)
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