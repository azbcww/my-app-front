<script setup lang="ts">
import { computed } from 'vue';
import { useUserInfoStore } from '@/store/userInfo';

const userInfoStore = useUserInfoStore()
const userName = computed(
  (): string => {
    return userInfoStore.userName
  }
)
</script>

<template>
  <main>
    <div :class="$style.container">
      <header>
        <div  :class="$style.header">
          <router-link to="/calendar">Calendar</router-link>
          |
          <router-link to="/login">Login</router-link>
          |
          <router-link to="/signup">SignUp</router-link>
        </div>
        <nobr :class="$style.header" v-if="userName!=''">&nbsp; User:<b>{{ userName }}</b></nobr>
      </header>
      
      <router-view />
    </div>
  </main>
</template>

<style module>
.container {
  max-width: fit-content;
  margin: auto;
}
.header {
  display: flex;
  justify-content: center;
}
</style>