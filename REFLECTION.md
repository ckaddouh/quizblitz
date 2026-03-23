✅ Q1 — Props
QuestionCard.vue receives the current question as a prop.

Explain what a prop is and why we pass data down from the store via the parent rather than importing useGameStore directly inside QuestionCard.
- A prop is how we can pass data down from a parent component to a child component in one direction (parent to child). We can pass the data to the child for the child to use, but they cannot directly modify it. 
- In the project, `PlayView.vue` passes the current question and selected answer to `QuestionCard` like this:
```vue
<QuestionCard
    v-if="store.gameState === 'playing' && store.currentQuestion"
    :question="store.currentQuestion"
    :selectedAnswer="store.selectedAnswer"
    @answer="store.submitAnswer"
/>
```
- Even though the data originally comes from `useGameStore`, `QuestionCard` does not
import the store itself, but rather receives everything it needs as props. The reason to
prefer props for a presentational component like `QuestionCard` is that it makes the component reusable. 
Instead of having to define each component with the corresponding data that it uses, we can just use these
components which use props and have no knowledge of where its data comes from. If we had `QuestionCard`
call `useGameStore()` directly, then it would be very specific to Quizblitz and this particular store, 
making it impossible to reuse it anywhere else. Props are preferrable for presentational components because they are what make presentational components portable. 


Your answer must mention: what a prop is, the direction data flows, and one reason to prefer props for presentational components.

✅ Q2 — $emit
When the user clicks an answer button, QuestionCard emits an event.

Explain what $emit does, how the parent listens for it, and what would happen if you forgot to handle the emitted event in the parent.

- $emit is how a child component sends a signal up to its parent. This time we are going in the opposite direction of a prop. When the user clicks an answer button in `QuestionCard`, it calls `this.$emit('answer', index)`, where `index` corresponds to the index of the answer button that the user clicked.
- Then, `PlayView` listens for this event using `@answer="store.submitAnswer"`. When the user clicks a button, the event fires, and `store.submitAnswer` runs automatically with the emitted index as its argument. Inside `submitAnswer`, the store checks if the index matches the correct index which is sotred in `currentQuestion.correct`. If so, it updates the score and streak, highlights the appropriate button, and sets a `setTimeout` to call `nextQuestion` after 1 second.
- If you forgot to handle the emitted event in the parent, the event would fire and nothing would happen. There wouldn't be an error necessarily, but the game would just freeze as the store would never receive the answer. `selectedAnswer` would stay as `null`, the highlight would never appear, and `nextQuestion` would never be called.


✅ Q3 — Pinia store
Before Pinia, currentIndex, score, and gameState all lived in App.vue.

Explain what problem this causes as the component tree grows, and how moving state into a Pinia store solves it.

Your answer must mention: prop drilling, and what it means for a component to "own" state.

- This causes a problem as the component tree grows called prop drilling. Prop drilling is when you pass a state down through multiple layers of components that do not actually need it, just so it can eventually reach the component that does. This causes a waste of time and resources, as if a deeply nested component needed `score` for example, then you would have to thread it as a prop through every component in between, even if those components don't use `score`. 
- For a component to "own" state, it means that component is responsible for storing it and deciding when it changes. In Phase 1, `App.vue` owned everything, which mean that every other component depended on `App.vue` to function. 
- Moving state into a Pinia store solves this, as we use `useGameStore` instead so that the store lives
outside the component tree. Then, any component can access `currentIndex`, `score`, `gameState`, or `selectedAnswer` directly, and call various desired actions without anything needing to be passed down as props.


✅ Q4 — Vue Router
Explain the difference between a traditional multi-page website and a Single-Page Application. What does <router-view> do, and why does navigating between routes not reload the page?
- A traditional multi-page website loads a brand new HTML file from the server every time that you navigate (ie every time
that the browser makes a request,t he enitre page reloads).
- A Single-Page Application loads one HTML file once, and from then on, swaps out the components displayed on the page (using JS) without every making a new page request.
- <router-view> is the placeholder in `App.vue` where the Vue Router renders whichever component matches the current URL. For example, when the URL is `/`, the page renders `HomeView`. The rest of `App.vue` remains the same. 
- Navigating between different routes does not reload the page because the Vue Router intercepts the navigation and swaps the component inside <router-view> as I explained above. 

✅ Q5 — v-if vs v-show
The game uses v-if to switch between screens.

Explain the difference between v-if and v-show. Why is v-if the better choice here rather than v-show?
- v-if removes an element from the DOM whenever the condition inside the statement is false, and then recreates that component and adds it back when the condition is true. 
- On the other hand, v-show just hides an element by setting `display: none` in CSS. The element is still present in the DOM, but just not visible to the user. 
- In this project, v-if is the better choice for the `PlayView` page when switching between the `QuestionCards` because it does not make sense for previous question cards to linger on the page while we have already moved onto the next question. In addition, if previous question cards were present but simply invisible, it could cause bugs, such as a previous question card 
rendering a user's click rather than the current one, potentially causing incorrect highlights and score counts. 