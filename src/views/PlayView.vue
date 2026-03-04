<template>
    <div class="play-view">
  
      <template v-if="gameState === 'playing'">
        <div class="progress">Question {{ currentIndex + 1 }} / {{ questions.length }}</div>
        <QuestionCard
          :key="currentIndex"
          :question="currentQuestion"
          @answer="handleAnswer"
        />
      </template>
  
      <ScoreBoard
        v-else-if="gameState === 'end'"
        :score="score"
        @restart="resetGame"
      />
  
    </div>
  </template>
  
  <script>
  import QuestionCard from '../components/QuestionCard.vue'
  import ScoreBoard from '../components/ScoreBoard.vue'
  
  export default {
    name: 'PlayView',
    components: { QuestionCard, ScoreBoard },
    data() {
      return {
        currentIndex: 0,
        score: 0,
        gameState: 'playing',
        questions: [
          {
            question: 'What is the capital of France?',
            answers: ['Berlin', 'Madrid', 'Paris', 'Rome'],
            correct: 2
          },
          {
            question: 'Which planet is closest to the Sun?',
            answers: ['Venus', 'Mercury', 'Earth', 'Mars'],
            correct: 1
          },
          {
            question: 'What is 12 × 12?',
            answers: ['132', '144', '156', '124'],
            correct: 1
          },
          {
            question: 'Who wrote Romeo and Juliet?',
            answers: ['Charles Dickens', 'Jane Austen', 'William Shakespeare', 'Mark Twain'],
            correct: 2
          },
          {
            question: 'What is the chemical symbol for water?',
            answers: ['O2', 'CO2', 'H2O', 'HO'],
            correct: 2
          },
          {
            question: 'How many sides does a hexagon have?',
            answers: ['5', '6', '7', '8'],
            correct: 1
          },
          {
            question: 'What is the largest ocean on Earth?',
            answers: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
            correct: 3
          },
          {
            question: 'Which country invented pizza?',
            answers: ['France', 'Greece', 'Italy', 'Spain'],
            correct: 2
          },
          {
            question: 'What gas do plants absorb from the atmosphere?',
            answers: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
            correct: 2
          },
          {
            question: 'How many bones are in the adult human body?',
            answers: ['196', '206', '216', '226'],
            correct: 1
          }
        ]
      }
    },
    computed: {
      currentQuestion() {
        return this.questions[this.currentIndex]
      }
    },
    mounted() {
      this.startGame()
    },
    methods: {
      startGame() {
        this.currentIndex = 0
        this.score = 0
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
        this.$router.push({ name: 'home' })
      }
    }
  }
  </script>
  
  <style scoped>
  .play-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem;
  }
  
  .progress {
    font-size: 0.9rem;
    color: #888;
  }
  </style>