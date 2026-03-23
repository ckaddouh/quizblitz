# Quiz 2 Answers
**Name:** Christina Kaddouh
**Date:** 23 March 2026


## Q1
D

## Q2
Updated code:
```js
state: () => ({
  // previous code ...
  lastAnswerCorrect: null
}),

actions: {
  submitAnswer(index) {
    if (this.selectedAnswer !== null) return
    this._stopTimer()
    this.selectedAnswer = index
    const isCorrect = index === this.currentQuestion.correct
    this.lastAnswerCorrect = isCorrect
    if (isCorrect) this.score++
    setTimeout(() => this.nextQuestion(), 1000)
  }
}
```
QuestionCard should read lastAnswerCorrect from the store directly rather than receive it as a prop from PlayView because if PlayView passed it as a prop, then it would have to read it from the store and thread it down through the component tree. Like I learned from the reflection sectoin, this is called prop drilling and leads to the unncessary passing of props to components that do not need them. Since lastAnswerCorrect is already shared game state owned by the store, any component that needs it can access it directly. 


## Q3
C

## Q4
- Part A: The mistake here is that App.vue has no <router-view> in its template. We know that the Vue Router works by injecting the matched route component into a <router-view> outlet, so without it, the router does not know where to render GameView, causing the screen to remain blank. In addition, by hardcoding ```vue <GameView v-if="gameState === 'playing'" />```, you also bypass the router entirely and instead render based on local state rather than the URL.
- Part B: Corrected code:
```vue
<template>
  <div>
    <h1>QuizBlitz</h1>
    <RouterView/>
  </div>
</template>
```
All we have to do to correct it is to add a <router-view> block instead of the hard-coded v-if. Now, when the URL is '/play', it will know to render GameView. 



## Q5
B

## Q6
The error here occurs because when nextQuestion() sets currentIndex to state.questions.length, that index becomes out of bounds. As a result, `state.questions[state.questions.length]` returns undefined, so when the template reads currentQuestion.text, it wile throw an error. 
To fix this, we can update the getter as:
```js
getters: {
  currentQuestion: (state) =>
    state.questions[state.currentIndex] ?? null
}
```
Then, any component reading currentQuestion can use v-if="store.currentQuestion" before accessing its properties to avoid receiving this type error. It is better to fix the error in the getter because it will correct this issue for all "currentQuestion" cards. If we were instead to put the guard in nextQuestion(), then the action would need to know what the getter does with the index, which means you could still receive an out-of-bounds/null index if it is called from elsewhere.  


## Q7
B

## Q8
**Local file approach**
- Advantage: The game works immediately with no network dependency, as startGame() is synchronous so gameState flips to 'playing' instantly and _startTimer() can fire without waiting for a response.
- Disadvantage: Questions are fixed at build time, and updating the question bank requires editing the source file and redeploying the app. This makes it not so flexible. 
**Remote API approach**
- Advantage: The question bank can be updated, expanded, or randomised server-side without any frontend code change, which scales naturally as the game grows. This is better flexibility. 
- Disadvantage: startGame() becomes async, which means _startTimer() must not fire until the fetch resolves. A failed or slow request leaves this.questions empty, causing currentQuestion to be undefined and breaking the game. This would require loading and error state handling that does not currently exist.
**My choice**: I would choose local file for the current stage. The store's startGame() immediately calls this._startTimer() after setting questions. Introducing async fetch would require adding a loading state, guarding _startTimer() behind the resolved promise, and handling network errors, which we do not have in the code yet. 

## Q9
B

## Q10
useGameStore.js changes:
```js
state: () => ({
  timeLeft: 15,
  _timerInterval: null
}),

actions: {
  _startTimer() {
    this._stopTimer()
    this._timerInterval = setInterval(() => this.tick(), 1000)
  },

  _stopTimer() {
    if (this._timerInterval) {
      clearInterval(this._timerInterval)
      this._timerInterval = null
    }
  },

  tick() {
    if (this.timeLeft > 0) {
      this.timeLeft--
    } else {
      this.nextQuestion()
    }
  },

  startGame() {
    this.questions = [...questionBank]
    this.currentIndex = 0
    this.score = 0
    this.gameState = 'playing'
    this.selectedAnswer = null
    this.timeLeft = 15
    this._startTimer()
  },

  submitAnswer(index) {
    if (this.selectedAnswer !== null) return
    this._stopTimer()
    this.selectedAnswer = index
    const isCorrect = index === this.currentQuestion.correct
    if (isCorrect) this.score++
    setTimeout(() => this.nextQuestion(), 1000)
  },

  nextQuestion() {
    this.selectedAnswer = null
    this.timeLeft = 15
    if (this.isLastQuestion) {
      this._stopTimer()
      this.gameState = 'end'
    } else {
      this.currentIndex++
      this._startTimer()
    }
  }
}
```

QuestionCard.vue changes:
```vue
<p>{{ store.timeLeft }}</p>```

Why the timer logic belongs in the store, not the component:
The timer logic belongs in the store because it is not just a display, but an event trigger. When it reaches zero it must call nextQuestion(), which updates currentIndex, resets selectedAnswer, and restarts the interval. All of those are store state and store actions. If the timer lived inside QuestionCard, the component would need to reach into the store to trigger nextQuestion() anyway, and the interval would be destroyed and recreated with every question change because v-if unmounts the component.
