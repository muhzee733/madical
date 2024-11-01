<template>
  <div class="questionnaire">
    <div class="container">
      <div class="row">
        <div class="col-xl-12 pt-5">
          <div v-if="currentQuestionIndex === null">
            <h2 class="h1">Great, and how have you tried treating your condition?</h2>
            <p>
              Let's start with a 30-second pre-screening. Tell us about your condition and any
              previous treatment to determine if plant alternatives are right for you. All your
              information is secure and confidential, so please be as open and honest as you can.
            </p>
            <button @click="nextQuestion" class="vs-btn">Sound Good</button>
          </div>
          <div v-else>
            <h2 class="mb-4">{{ currentQuestion.question }}</h2>
            <div class="options" v-for="(option, index) in currentQuestion.options" :key="index">
              <input
                type="radio"
                :id="'option' + index"
                :value="option"
                v-model="selectedOptions[currentQuestionIndex]"
              />
              <label :for="'option' + index">{{ option }}</label>
            </div>
            <button @click="previousQuestion" v-show="currentQuestionIndex !== 0" class="vs-btn">
              Back
            </button>
            <button
              v-if="!isLastQuestion"
              @click="nextQuestion"
              class="vs-btn mt-3"
              style="margin-left: 10px"
            >
              Next
            </button>
            <button v-else @click="submitAnswers" class="vs-btn" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spin">Loading...</span>
              <span v-else>Submit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import questionsData from './questions.json'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const questions = ref(questionsData)
    const currentQuestionIndex = ref(null)
    const selectedOptions = ref(Array(questionsData.length).fill(null))
    const isSubmitting = ref(false) // Spinner state

    const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
    const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1)

    const nextQuestion = () => {
      if (currentQuestionIndex.value === null) {
        currentQuestionIndex.value = 0 // Move to the first question
      } else if (selectedOptions.value[currentQuestionIndex.value] === null) {
        Swal.fire({
          icon: 'warning',
          title: 'Incomplete Answer',
          text: 'Please select an answer before proceeding.'
        })
      } else if (currentQuestionIndex.value < questions.value.length - 1) {
        currentQuestionIndex.value++
      }
    }

    const previousQuestion = () => {
      if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--
      }
    }

    const submitAnswers = async () => {
      // Check if all questions have been answered
      if (selectedOptions.value.includes(null)) {
        Swal.fire({
          icon: 'warning',
          title: 'Incomplete Answers',
          text: 'Please answer all questions before submitting.'
        })
        return
      }

      isSubmitting.value = true

      // Prepare data with questions and answers
      const answersWithQuestions = questions.value.map((question, index) => ({
        question: question.question,
        answer: selectedOptions.value[index]
      }))

      // Store in localStorage
      localStorage.setItem('userAnswers', JSON.stringify(answersWithQuestions))
      
      // Simulate a loading delay for UX
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      Swal.fire({
        icon: 'success',
        title: 'Thank you!',
        text: 'Your answers have been submitted successfully.'
      }).then(() => {
        router.push('/login')
      }).finally(() => {
        isSubmitting.value = false
      })
    }

    return {
      currentQuestionIndex,
      currentQuestion,
      selectedOptions,
      isLastQuestion,
      isSubmitting,
      nextQuestion,
      previousQuestion,
      submitAnswers
    }
  }
}
</script>

<style scoped>
.questionnaire {
  max-width: 60%;
  margin: 0 auto;
  height: 100vh;
}

h2 {
  margin-top: 0;
}

.options {
  margin-bottom: 10px;
}

input[type='radio'] {
  margin-right: 5px;
}

.vs-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.vs-btn:hover {
  background-color: #0056b3;
}

.vs-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
