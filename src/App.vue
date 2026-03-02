<!-- <template>
  <div id="app">
    <h1>QuizBlitz</h1>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script> -->

<template>
  <div id="app">
    <StartScreen @start="() => {}" />
  </div>
</template>

<script>
import StartScreen from './components/StartScreen.vue'
export default {
  components: { StartScreen }
}
</script>