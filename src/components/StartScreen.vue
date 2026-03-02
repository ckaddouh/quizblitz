<template>
    <div class="start-screen">
      <h1>QuizBlitz</h1>
      <p>Test your knowledge. Beat the clock.</p>
      <button @click="$emit('start')">Play</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StartScreen',
    emits: ['start']
  }
  </script>