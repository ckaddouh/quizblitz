✅ Q1 — Props
QuestionCard.vue receives the current question as a prop.

Explain what a prop is and why we pass data down from the store via the parent rather than importing useGameStore directly inside QuestionCard.

Your answer must mention: what a prop is, the direction data flows, and one reason to prefer props for presentational components.

✅ Q2 — $emit
When the user clicks an answer button, QuestionCard emits an event.

Explain what $emit does, how the parent listens for it, and what would happen if you forgot to handle the emitted event in the parent.

✅ Q3 — Pinia store
Before Pinia, currentIndex, score, and gameState all lived in App.vue.

Explain what problem this causes as the component tree grows, and how moving state into a Pinia store solves it.

Your answer must mention: prop drilling, and what it means for a component to "own" state.

✅ Q4 — Vue Router
Explain the difference between a traditional multi-page website and a Single-Page Application. What does <router-view> do, and why does navigating between routes not reload the page?

✅ Q5 — v-if vs v-show
The game uses v-if to switch between screens.

Explain the difference between v-if and v-show. Why is v-if the better choice here rather than v-show?