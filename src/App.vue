<template>
  <div id="app">
    <CalcBody msg="Calculator"/>
  </div>
</template>

<script>
import CalcBody from './components/CalcBody.vue'

export default {
  name: 'App',
  components: {
    CalcBody
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
