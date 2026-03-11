import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayView from '../views/PlayView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'
import { useGameStore } from '../stores/gameStore.js'


const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/play', name: 'play', component: PlayView },
  { path: '/leaderboard', name: 'leaderboard', component: LeaderboardView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// TODO Week 7: replace sessionStorage check with store.gameStarted

router.beforeEach((to) => {
  const store = useGameStore()
  if (to.name === 'play' && store.gameState !== 'playing') {
    return { name: 'home' }
  }
})
  
export default router
  