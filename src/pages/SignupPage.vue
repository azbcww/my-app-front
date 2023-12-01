<script setup lang="ts">
import { ref } from 'vue'

const username = ref<string>('')
const password = ref<string>('')
const signup = () =>
  fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username.value, password: password.value })
  })
</script>

<template>
  <div class="signup">
    <h1>This is an signup page</h1>
    <div>
      <input type="text" v-model="username" />
      <input type="password" v-model="password" />
    </div>
    <div>
      <button @click="signup">login</button>
    </div>
  </div>
</template>