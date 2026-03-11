<template>
    <div class="scoreboard">
      <h2>Game Over</h2>
      <p>You scored {{ score }} out of {{ total }}</p>
      <button @click="$emit('restart')">Play Again</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ScoreBoard',
    props: {
      score: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        default: 10
      }
    },
    emits: ['restart']
  }
  </script>