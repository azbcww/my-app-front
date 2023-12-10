<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import DataSend from '../components/DataSend.vue'

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    DataSend
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth'
      }
    }
  }
}
</script>

<template>
  <FullCalendar :options="calendarOptions" />
  <DataSend />
</template>