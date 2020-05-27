<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import login from './pages/login/login.vue'

export default {
  name: 'app',
  components: {
    login
  }
}
</script>

<style>
html,body,#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  overflow: hidden;
}

</style>
