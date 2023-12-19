<script setup lang="ts">
import { computed } from 'vue'
import { useUserInfoStore } from '@/store/userInfo'

const userInfoStore = useUserInfoStore()
const userName = computed(
  (): string => {
    return userInfoStore.userName
  }
)

const help = () => {
  alert("予定登録方法\nタイトルと開始日と終了日の年，月，日(時)を指定してください．\n例:\n昭和の日本画と洋画　松岡翁(1894-1989) 晩年の眼力\n2023年10月24日～2024年02月11日\n\n予定削除方法\n予定をクリックして削除できます．")
}
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
          |
          <a href="#" @click="help">Help</a>
        </div>
        <div :class="$style.header" v-if="userName!=''">User:&nbsp<b>{{ userName }}</b></div>
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