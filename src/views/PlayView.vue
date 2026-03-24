<template>
  <div class="play-view">

    <!-- Timer bar -->
    <div class="timer-bar">
      <div
        class="timer-fill"
        :style="{ width: timerPercent + '%' }"
        :class="{ urgent: store.timeLeft <= 5 }"
      ></div>
    </div>

    <!-- Progress indicator -->
    <p class="progress">
      Question {{ store.progress.current }} of {{ store.progress.total }}
    </p>

    <p v-if="store.streak >= 3" class="streak">
      🔥 {{ store.streak }} in a row!
    </p>

    <!-- Question -->
    <QuestionCard
      v-if="store.gameState === 'playing' && store.currentQuestion"
      :question="store.currentQuestion"
      :selectedAnswer="store.selectedAnswer"
      @answer="store.submitAnswer"
    />

    <!-- Score screen -->
    <div v-else-if="store.gameState === 'end'">
      <ScoreBoard
        :score="store.score"
        :total="store.questions.length"
        @restart="handleRestart"
      />

      <div class="submit-score">
        <div v-if="!store.scoreSubmitted">
          <input
            v-model="store.playerName"
            placeholder="Enter your name"
            class="name-input"
          />
          <button @click="store.submitScore()" class="submit-btn">
            Submit Score
          </button>
        </div>
        <p v-else class="submitted-msg">Score submitted! ✓</p>
      </div>

      <button class="restart-btn" @click="handleRestart">Play Again</button>
    </div>

    <!-- Not started yet — redirect to home -->
    <div v-else>
      <p>No game in progress.</p>
      <button @click="$router.push({ name: 'home' })">Go Home</button>
    </div>

  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'
import QuestionCard from '../components/QuestionCard.vue'
import ScoreBoard from '../components/ScoreBoard.vue'

export default {
  name: 'PlayView',
  components: { QuestionCard, ScoreBoard },

  setup() {
    const store = useGameStore()
    return { store }
  },

  mounted() {
    if (this.store.gameState !== 'playing') {
      this.$router.push({ name: 'home' })
    }
  },

  computed: {
    timerPercent() {
      return (this.store.timeLeft / 15) * 100
    }
  },

  methods: {
    handleRestart() {
      this.store.resetGame()
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.timer-bar {
  width: 100%;
  height: 8px;
  background: #333;
  border-radius: 4px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.timer-fill {
  height: 100%;
  background: #4caf50;
  transition: width 0.9s linear;
}

.timer-fill.urgent {
  background: #e53935;
}

.progress {
  text-align: center;
  color: #aaa;
  margin-bottom: 1rem;
}

.submit-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.name-input {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #555;
  background: #1e1e1e;
  color: #fff;
  font-size: 1rem;
  width: 220px;
  text-align: center;
}

.name-input::placeholder {
  color: #888;
}

.submit-btn {
  padding: 0.5rem 1.5rem;
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

.submit-btn:hover {
  background: #43a047;
}

.submitted-msg {
  color: #4caf50;
  font-weight: bold;
}

.restart-btn {
  display: block;
  margin: 1rem auto 0;
  padding: 0.5rem 1.5rem;
  background: #1565c0;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

.restart-btn:hover {
  background: #1976d2;
}
</style>