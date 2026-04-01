<template>
    <div class="auth-view">
      <div class="auth-card">
        <h2>Register</h2>
  
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>
  
        <form @submit.prevent="handleSubmit">
          <div class="field">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
  
          <div class="field">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
  
          <button type="submit" :disabled="loading">
            {{ loading ? 'Creating account...' : 'Register' }}
          </button>
        </form>
  
        <p class="switch">
          Already have an account?
          <RouterLink to="/login">Log in</RouterLink>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import { useGameStore } from '../stores/gameStore.js'
  
  export default {
    name: 'RegisterView',
  
    setup() {
      return { store: useGameStore() }
    },
  
    data() {
      return {
        email: '',
        password: '',
        error: null,
        success: null,
        loading: false
      }
    },
  
    methods: {
      async handleSubmit() {
        this.error = null
        this.success = null
        this.loading = true
        try {
          await this.store.register(this.email, this.password)
          this.success = 'Account created! Logging you in...'
          await this.store.login(this.email, this.password)
          this.$router.push({ name: 'home' })
        } catch (err) {
          this.error = err.message
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .auth-view {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
  }
  
  .auth-card {
    background: #16213e;
    border: 1px solid #2a2a4a;
    border-radius: 12px;
    padding: 2.5rem 2rem;
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  h2 {
    margin: 0;
    font-size: 1.8rem;
    color: #f5c518;
  }
  
  .error {
    margin: 0;
    padding: 0.75rem 1rem;
    background: rgba(229, 57, 53, 0.15);
    border: 1px solid #e53935;
    border-radius: 8px;
    color: #ef9a9a;
    font-size: 0.9rem;
  }
  
  .success {
    margin: 0;
    padding: 0.75rem 1rem;
    background: rgba(76, 175, 80, 0.15);
    border: 1px solid #4caf50;
    border-radius: 8px;
    color: #a5d6a7;
    font-size: 0.9rem;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    text-align: left;
  }
  
  label {
    font-size: 0.85rem;
    color: #aaa;
  }
  
  input {
    padding: 0.65rem 0.9rem;
    background: #0f0f1a;
    border: 1px solid #2a2a4a;
    border-radius: 8px;
    color: #e0e0e0;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.15s;
  }
  
  input:focus {
    border-color: #f5c518;
  }
  
  button[type='submit'] {
    padding: 0.75rem;
    background: linear-gradient(135deg, #f5c518, #ff6b6b);
    color: #1a1a1a;
    font-weight: 700;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: opacity 0.15s;
  }
  
  button[type='submit']:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .switch {
    margin: 0;
    font-size: 0.9rem;
    color: #888;
  }
  
  .switch a {
    color: #f5c518;
    text-decoration: none;
  }
  
  .switch a:hover {
    text-decoration: underline;
  }
  </style>