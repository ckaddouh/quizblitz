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

    <div class="play-content">

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

      <!-- End screen -->
      <div v-else-if="store.gameState === 'end'" class="end-screen">
        <ScoreBoard
          :score="store.score"
          :total="store.questions.length"
          @restart="handleRestart"
        />

        <div class="submit-score">
          <div v-if="store.token">
            <p class="playing-as">Playing as {{ store.userEmail }}</p>
            <button
              v-if="!store.scoreSubmitted"
              class="submit-btn"
              @click="store.submitScore()"
            >
              Submit Score
            </button>
            <p v-else class="submitted-msg">Score submitted ✓</p>
          </div>

          <div v-else>
            <p class="login-prompt">
              <RouterLink to="/login">Log in</RouterLink> to save your score to the leaderboard.
            </p>
          </div>
        </div>

        <button class="restart-btn" @click="handleRestart">Play Again</button>
      </div>

      <!-- Not started yet — redirect to home -->
      <div v-else>
        <p>No game in progress.</p>
        <button @click="$router.push({ name: 'home' })">Go Home</button>
      </div>

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
.play-view {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 57px);
}

.timer-bar {
  width: 100%;
  height: 8px;
  background: #333;
  overflow: hidden;
  flex-shrink: 0;
}

.timer-fill {
  height: 100%;
  background: #4caf50;
  transition: width 0.9s linear;
}

.timer-fill.urgent {
  background: #e53935;
}

.play-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
}

.progress {
  text-align: center;
  color: #aaa;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
}

.streak {
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #f5c518;
}

.end-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
}

.submit-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
}

.playing-as {
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.submit-btn {
  padding: 0.65rem 2rem;
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s;
}

.submit-btn:hover {
  background: #43a047;
}

.submitted-msg {
  color: #4caf50;
  font-weight: bold;
}

.login-prompt {
  color: #aaa;
  font-size: 0.95rem;
}

.login-prompt a {
  color: #f5c518;
  text-decoration: none;
}

.login-prompt a:hover {
  text-decoration: underline;
}

.restart-btn {
  padding: 0.65rem 2rem;
  background: #1565c0;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s;
}

.restart-btn:hover {
  background: #1976d2;
}
</style>