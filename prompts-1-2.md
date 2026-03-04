**\[Claude Opus 4.1]** I have a Vue 3 app with Vue Router 4. Write a HomeView.vue that imports my StartScreen component and displays it. 
The StartScreen's 'Play' button should navigate to the route named 'play' using useRouter().push() — but since I'm using the Options 
API, use this.$router.push({ name: 'play' }) instead of useRouter. Show me the full single-file component.


**\[Claude Opus 4.1]** Create the folder src/views/. Then create three view files.
src/views/HomeView.vue
Move your StartScreen component here and add a <RouterLink> to navigate to /play. The button no longer emits — it navigates.
Suggested vibe-coding prompt:
"I have a Vue 3 app with Vue Router 4. Write a HomeView.vue that imports my StartScreen component and displays it. The StartScreen's 'Play' button should navigate to the route named 'play' using useRouter().push() — but since I'm using the Options API, use this.$router.push({ name: 'play' }) instead of useRouter. Show me the full single-file component."
src/views/PlayView.vue
This view contains your QuestionCard and the game state that was previously in App.vue (questions, currentIndex, score, gameState). When the game ends, use this.$router.push({ name: 'home' }) to return to the start screen (the leaderboard redirect will come once scores are real in Week 9).
Move your startGame(), handleAnswer(), and resetGame() methods here. Call this.startGame() in the mounted() lifecycle hook so the game begins automatically when the player navigates to /play.
Suggested vibe-coding prompt:
"I have a Vue 3 quiz game using the Options API. Write a PlayView.vue that contains the game logic. It should have a questions array (I'll fill in the data), a currentIndex, a score, and a gameState of 'playing' or 'end'. In mounted(), call startGame(). When the game ends, use this.$router.push({ name: 'home' }) to return to the home screen. The template shows a QuestionCard component while playing, and a ScoreBoard component when done. Show me the full single-file component."
src/views/LeaderboardView.vue
This is a placeholder for now. It just displays a heading and a message saying the leaderboard is coming soon.


**\[Claude Opus 4.1]** Add a simple navigation bar to App.vue that appears on every screen. Use <RouterLink> — not <a href>. Router links update the URL without a full page reload and automatically receive an router-link-active CSS class when their route is active.
Notice that /play is not in the nav bar — you do not want the player to be able to click away from the game mid-question. Navigating to /play happens only through the Play button.
Please make the necessary changes. 