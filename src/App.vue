<template>
  <div id="app">
    <StartScreen
      v-if="gameState === 'start'"
      @start="startGame"
    />
    <QuestionCard
      v-if="gameState === 'playing'"
      :key="currentIndex"
      :question="questions[currentIndex]"
      @answer="handleAnswer"
    />
    <ScoreBoard
      v-if="gameState === 'end'"
      :score="score"
      @restart="resetGame"
    />
  </div>
</template>

<script>
import StartScreen from './components/StartScreen.vue'
import QuestionCard from './components/QuestionCard.vue'
import ScoreBoard from './components/ScoreBoard.vue'

export default {
  name: 'App',
  components: { StartScreen, QuestionCard, ScoreBoard },
  data() {
    return {
      gameState: 'start',
      currentIndex: 0,
      score: 0,
      questions: [
        {
          question: "What is the capital of France?",
          answers: ["Berlin", "Madrid", "Paris", "Rome"],
          correct: 2
        },
        {
          question: "What is the capital of Germany?",
          answers: ["Munich", "Hamburg", "Frankfurt", "Berlin"],
          correct: 3
        },
        {
          question: "What is the capital of Spain?",
          answers: ["Barcelona", "Madrid", "Seville", "Valencia"],
          correct: 1
        },
        {
          question: "What is the capital of Italy?",
          answers: ["Milan", "Naples", "Rome", "Turin"],
          correct: 2
        },
        {
          question: "What is the capital of Portugal?",
          answers: ["Porto", "Lisbon", "Faro", "Braga"],
          correct: 1
        },
        {
          question: "What is the capital of the Netherlands?",
          answers: ["Rotterdam", "Utrecht", "Amsterdam", "The Hague"],
          correct: 2
        },
        {
          question: "What is the capital of Belgium?",
          answers: ["Antwerp", "Brussels", "Ghent", "Liege"],
          correct: 1
        },
        {
          question: "What is the capital of Switzerland?",
          answers: ["Zurich", "Geneva", "Basel", "Bern"],
          correct: 3
        },
        {
          question: "What is the capital of Austria?",
          answers: ["Salzburg", "Graz", "Vienna", "Innsbruck"],
          correct: 2
        },
        {
          question: "What is the capital of Poland?",
          answers: ["Krakow", "Warsaw", "Gdansk", "Wroclaw"],
          correct: 1
        }
      ]
    }
  },
  methods: {
    startGame() {
      this.gameState = 'playing'
    },
    handleAnswer(isCorrect) {
      if (isCorrect) this.score++
      if (this.currentIndex + 1 < this.questions.length) {
        this.currentIndex++
      } else {
        this.gameState = 'end'
      }
    },
    resetGame() {
      this.score = 0
      this.currentIndex = 0
      this.gameState = 'start'
    }
  }
}
</script>