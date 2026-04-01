<template>
  <div id="app">
    <nav>
      <div class="nav-left">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/leaderboard">Leaderboard</RouterLink>
      </div>
      <div class="nav-right">
        <template v-if="store.token">
          <span class="nav-email">{{ store.userEmail }}</span>
          <button class="nav-btn" @click="handleLogout">Log Out</button>
        </template>
        <template v-else>
          <RouterLink to="/login">Log In</RouterLink>
          <RouterLink to="/register">Register</RouterLink>
        </template>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<script>
import { useGameStore } from './stores/gameStore.js'

export default {
  name: 'App',

  setup() {
    return { store: useGameStore() }
  },

  methods: {
    handleLogout() {
      this.store.logout()
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
}

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: #0a0a0f;
  color: #e5e7eb;
  min-height: 100vh;
  overflow-x: hidden;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(245, 158, 11, 0.06) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(239, 68, 68, 0.05) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 80%, rgba(99, 102, 241, 0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: #1a1a2e;
}

.nav-left,
.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

nav a {
  color: #e0e0e0;
  text-decoration: none;
}

nav a.router-link-active {
  color: #f5c518;
  font-weight: bold;
}

.nav-email {
  font-size: 0.85rem;
  color: #aaa;
}

.nav-btn {
  background: none;
  border: 1px solid #444;
  color: #e0e0e0;
  padding: 0.3rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: border-color 0.15s, color 0.15s;
}

.nav-btn:hover {
  border-color: #f5c518;
  color: #f5c518;
}
</style>