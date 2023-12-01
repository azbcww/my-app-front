<script setup lang="ts">
import { onMounted, ref } from 'vue'

const pong = ref<string>('no data')

onMounted(async () => {
  const res = await fetch('/api/ping')
  if (res.ok) {
    pong.value = await res.text()
  }
})
</script>

<template>

  <div class="calendar">
    <h1 style="text-align: center">Calendar</h1>
    {{ pong }}
  </div>
</template>