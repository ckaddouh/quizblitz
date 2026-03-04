<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/leaderboard">Leaderboard</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'App'
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

nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #1a1a2e;
}

nav a {
  color: #e0e0e0;
  text-decoration: none;
}

nav a.router-link-active {
  color: #f5c518;
  font-weight: bold;
}
</style>