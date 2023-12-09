<template>
  <main>
    <div :class="$style.container">
      <header :class="$style.header">
        <router-link to="/calendar">Calendar</router-link>
        |
        <router-link to="/login">Login</router-link>
        |
        <router-link to="/signup">SignUp</router-link>
        
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