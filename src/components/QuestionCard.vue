<template>
    <div class="question-card">
      <h2>{{ question.question }}</h2>
      <div class="answers">
        <button
          v-for="(answer, index) in question.answers"
          :key="index"
          :class="getAnswerClass(index)"
          :disabled="answered"
          @click="selectAnswer(index)"
        >
          {{ answer }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'QuestionCard',
    props: {
      question: {
        type: Object,
        required: true
      }
    },
    emits: ['answer'],
    data() {
      return {
        selected: null,
        answered: false
      }
    },
    methods: {
      selectAnswer(index) {
        if (this.answered) return
        this.answered = true
        this.selected = index
  
        const isCorrect = index === this.question.correct
  
        setTimeout(() => {
          this.$emit('answer', isCorrect)
          this.selected = null
          this.answered = false
        }, 1000)
      },
      getAnswerClass(index) {
        if (!this.answered) return ''
        if (index === this.question.correct) return 'correct'
        if (index === this.selected) return 'wrong'
        return ''
      }
    }
  }
  </script>


<style scoped>
button.correct {
  background-color: green;
  color: white;
}

button.wrong {
  background-color: red;
  color: white;
}
</style>