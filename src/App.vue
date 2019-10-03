<template>
  <div id="app">
   <router-view/>    
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/views/Login.vue'

export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style lang="scss">
@import './assets/all.scss';
</style>
