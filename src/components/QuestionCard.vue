<template>
  <div class="question-card">
    <h2 class="question-text">{{ question.question }}</h2>
    <div class="answers">
      <button
        v-for="(answer, index) in question.answers"
        :key="index"
        class="answer-btn"
        :class="buttonClass(index)"
        :disabled="selectedAnswer !== null"
        @click="handleClick(index)"
      >
        <span class="answer-letter">{{ letters[index] }}</span>
        <span class="answer-text">{{ answer }}</span>
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
    },
    selectedAnswer: {
      type: Number,
      default: null
    }
  },
  emits: ['answer'],
  data() {
    return {
      letters: ['A', 'B', 'C', 'D']
    }
  },
  methods: {
    handleClick(index) {
      if (this.selectedAnswer !== null) return
      this.$emit('answer', index)
    },
    buttonClass(index) {
      if (this.selectedAnswer === null) return ''
      if (index === this.question.correct) return 'correct'
      if (index === this.selectedAnswer) return 'wrong'
      return 'dimmed'
    }
  }
}
</script>

<style scoped>
.question-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.question-text {
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  font-weight: 600;
  text-align: center;
  color: #f9fafb;
  line-height: 1.5;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
}

.answers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.answer-btn {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem 1.1rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #e5e7eb;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, transform 0.1s;
  font-family: inherit;
  line-height: 1.4;
}

.answer-btn:not(:disabled):hover {
  background: rgba(245, 197, 24, 0.12);
  border-color: rgba(245, 197, 24, 0.4);
  color: #fff;
  transform: translateY(-1px);
}

.answer-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.9rem;
  color: #9ca3af;
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s;
}

.answer-btn:not(:disabled):hover .answer-letter {
  background: rgba(245, 197, 24, 0.25);
  color: #f5c518;
}

.answer-btn.correct {
  background: rgba(34, 197, 94, 0.18);
  border-color: #22c55e;
  color: #fff;
}

.answer-btn.correct .answer-letter {
  background: #22c55e;
  color: #fff;
}

.answer-btn.wrong {
  background: rgba(239, 68, 68, 0.18);
  border-color: #ef4444;
  color: #fff;
}

.answer-btn.wrong .answer-letter {
  background: #ef4444;
  color: #fff;
}

.answer-btn.dimmed {
  opacity: 0.35;
}

.answer-btn:disabled {
  cursor: default;
}

@media (max-width: 480px) {
  .answers {
    grid-template-columns: 1fr;
  }
}
</style>