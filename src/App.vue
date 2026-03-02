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
          question: "What does CSS stand for?",
          answers: ["Cascading Style Sheets", "Creative Style System", "Computer Style Syntax", "Coloured Screen Sheets"],
          correct: 0
        },
        {
          question: "Which HTML tag is used for JavaScript?",
          answers: ["<js>", "<javascript>", "<script>", "<code>"],
          correct: 2
        },
        {
          question: "What does HTML stand for?",
          answers: ["Hyper Text Markup Language", "Hyper Transfer Markup Level", "High Text Markup Language", "Hyper Text Making Language"],
          correct: 0
        },
        {
          question: "Which symbol is used for comments in JavaScript?",
          answers: ["<!-- -->", "** **", "// or /* */", "## ##"],
          correct: 2
        },
        {
          question: "How do you declare a variable in JavaScript?",
          answers: ["variable x", "v x", "let x", "dim x"],
          correct: 2
        },
        {
          question: "Which Vue directive conditionally renders an element?",
          answers: ["v-show-if", "v-render", "v-if", "v-condition"],
          correct: 2
        },
        {
          question: "What does 'v-bind' do in Vue?",
          answers: ["Handles click events", "Binds data to an attribute", "Creates a loop", "Imports a component"],
          correct: 1
        },
        {
          question: "How do you write an array in JavaScript?",
          answers: ["var x = (1, 2, 3)", "var x = {1, 2, 3}", "var x = [1, 2, 3]", "var x = <1, 2, 3>"],
          correct: 2
        },
        {
          question: "What is the correct way to show a Vue component?",
          answers: ["<import Component />", "<use Component />", "<render Component />", "<Component />"],
          correct: 3
        },
        {
          question: "Which method is called when a Vue component is first added to the DOM?",
          answers: ["created()", "mounted()", "started()", "init()"],
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