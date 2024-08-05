<template>
  <div class="questionnaire ">
   <div class="container">
    <div class="row">
      <div class="col-xl-12 pt-5">
        <div v-if="currentQuestionIndex === null">
          <h2 class="h1">Great, and how have you tried treating your condition?</h2>
          <p>
            Let's start with a 30 second pre-screening. Tell us about your condition and any
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
          <button @click="previousQuestion" v-show="currentQuestionIndex !== 0" class="vs-btn ">
            Back
          </button>
          <button v-if="!isLastQuestion" @click="nextQuestion" class="vs-btn mt-3" style="margin-left: 10px;">Next</button>
          <button v-else @click="submitAnswers" class="vs-btn">Submit</button>
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

export default {
  setup() {
    const questions = ref(questionsData)
    const currentQuestionIndex = ref(null)
    const selectedOptions = ref(Array(questionsData.length).fill(null))

    const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
    const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1)

    const nextQuestion = () => {
      if (currentQuestionIndex.value === null) {
        currentQuestionIndex.value = 0 // Move to the first question
      } else {
        if (currentQuestionIndex.value < questions.value.length - 1) {
          currentQuestionIndex.value++
        }
      }
    }

    const previousQuestion = () => {
      if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--
      }
    }

    const submitAnswers = () => {
      // Here, you can implement the logic to submit the answers
      // For demonstration, we're just logging the selected options
      console.log('Answers submitted:', selectedOptions.value)
      Swal.fire({
        icon: 'success',
        title: 'Thank you!',
        text: 'Your answers have been submitted successfully.'
      })
    }

    return {
      currentQuestionIndex,
      currentQuestion,
      selectedOptions,
      isLastQuestion,
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

.sound-good-btn,
.next-btn,
.submit-btn,
.back-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.sound-good-btn:hover,
.next-btn:hover,
.submit-btn:hover,
.back-btn:hover {
  background-color: #0056b3;
}

.back-btn {
  margin-right: 10px;
}
</style>
