<script setup lang="ts">
import { ref } from 'vue'
import { useUserInfoStore } from '@/store/userInfo'
import router from '@/router'

const username = ref<string>('')
const password = ref<string>('')

const notSatisfy = ref()

const userInfoStore = useUserInfoStore()

const signup = () =>
  fetch('/api/signup', {
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
  <div class="signup">
    <h1 style="text-align: center">SignUp</h1>
    <div>
      <div>
      <input type="text" v-model="username" placeholder="username"/>
      <input type="password" v-model="password" placeholder="password"/>
    </div>
    </div>
    <div>
      <button @click="signup">signup</button>
    </div>
    <div v-if="notSatisfy">登録済みのユーザーか不正な文字を使用しています</div>
  </div>
</template>