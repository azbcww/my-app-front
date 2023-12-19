<script setup lang="ts">
import { initCustomFormatter, ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import DataSend from '../components/DataSend.vue'
import { useEventStore } from '@/store/event'
import type { MyEvent } from '../interfaces'
import {container as ModalContainer, openModal} from 'jenesius-vue-modal'
import ModalMulti from "../components/modal-multi.vue";

const eventStore = useEventStore()

const calendarOptions = ref({
  plugins: [ dayGridPlugin, interactionPlugin ],
  initialView: 'dayGridMonth',
  events: eventStore.getEvents,
  eventClick: function(info) {
    if (confirm(info.event.title + '\n削除しますか？')) {
      info.event.remove()
      //TODO:apiで削除要求
    }
  }
})
</script>

<template>
  <FullCalendar :options="calendarOptions" />
  <DataSend />
  <modal-container/>
</template>