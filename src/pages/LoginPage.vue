<script setup lang="ts">
import { ref } from 'vue'
import { useUserInfoStore } from '@/store/userInfo'
import router from '@/router'

const username = ref<string>('')
const password = ref<string>('')

const notSatisfy = ref()

const userInfoStore = useUserInfoStore()

const login = () =>
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username.value, password: password.value })
  })
  .then( res => {
    if (res.ok) {
        userInfoStore.setUserName(username.value)
        router.push('/calendar')
    }else {
        notSatisfy.value = true
    }
  })
  .catch ( e => {
    console.log(e)
  })
</script>

<template>
  <div class="login">
    <h1 style="text-align: center">Login</h1>
    <div>
      <input type="text" v-model="username" placeholder="username"/>
      <input type="password" v-model="password" placeholder="password"/>
    </div>
    <div>
      <button @click="login">login</button>
    </div>
    <div v-if="notSatisfy">未登録のユーザーかパスワードが異なります</div>
  </div>
</template>