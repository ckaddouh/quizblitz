<template>
  <div class="home-view">
    <div class="hero">
      <h1 class="title">⚡ QuizBlitz</h1>
      <p class="subtitle">Test your knowledge across 10 rapid-fire questions</p>

      <div class="stats">
        <div class="stat">
          <span class="stat-number">10</span>
          <span class="stat-label">Questions</span>
        </div>
        <div class="stat">
          <span class="stat-number">15s</span>
          <span class="stat-label">Per Question</span>
        </div>
        <div class="stat">
          <span class="stat-number">∞</span>
          <span class="stat-label">Replays</span>
        </div>
      </div>

      <button class="play-btn" @click="startGame">Play Now</button>
    </div>
  </div>
</template>

<!-- used wrong commit message previously -->
<script>
import { useGameStore } from '../stores/gameStore.js'

export default {
  name: 'HomeView',

  setup() {
    return { store: useGameStore() }
  },

  methods: {
    startGame() {
      this.store.startGame()
      this.$router.push({ name: 'play' })
    }
  }
}
</script>

<style scoped>
.home-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #f5c518, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.1rem;
  color: #aaa;
  margin: 0;
}

.stats {
  display: flex;
  gap: 2.5rem;
  margin: 1rem 0;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #f5c518;
}

.stat-label {
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.play-btn {
  margin-top: 0.5rem;
  padding: 0.9em 3em;
  font-size: 1.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #f5c518, #ff6b6b);
  color: #1a1a1a;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: 0 4px 20px rgba(245, 197, 24, 0.3);
}

.play-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(245, 197, 24, 0.45);
}

.play-btn:active {
  transform: translateY(0);
}
</style>