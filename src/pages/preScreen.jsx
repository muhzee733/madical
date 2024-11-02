// components/Questionnaire.js
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import questionsData from '../questions.json';
import { useRouter } from 'next/router';

const PreScreen = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(Array(questionsData.length).fill(null));
  const [isSubmitting, setIsSubmitting] = useState(false); // Spinner state

  const currentQuestion = questionsData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionsData.length - 1;

  const nextQuestion = () => {
    if (currentQuestionIndex === null) {
      setCurrentQuestionIndex(0); // Move to the first question
    } else if (selectedOptions[currentQuestionIndex] === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Answer',
        text: 'Please select an answer before proceeding.',
      });
    } else if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitAnswers = async () => {
    // Check if all questions have been answered
    if (selectedOptions.includes(null)) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Answers',
        text: 'Please answer all questions before submitting.',
      });
      return;
    }

    setIsSubmitting(true);

    // Prepare data with questions and answers
    const answersWithQuestions = questionsData.map((question, index) => ({
      question: question.question,
      answer: selectedOptions[index],
    }));

    // Store in localStorage
    localStorage.setItem('userAnswers', JSON.stringify(answersWithQuestions));

    // Simulate a loading delay for UX
    await new Promise((resolve) => setTimeout(resolve, 1000));

    Swal.fire({
      icon: 'success',
      title: 'Thank you!',
      text: 'Your answers have been submitted successfully.',
    }).then(() => {
      router.push('/login');
    }).finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="questionnaire">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 pt-5">
            {currentQuestionIndex === null ? (
              <>
                <h2 className="h1">Great, and how have you tried treating your condition?</h2>
                <p>
                  {`Let's start with a 30-second pre-screening. Tell us about your condition and any
                  previous treatment to determine if plant alternatives are right for you. All your
                  information is secure and confidential, so please be as open and honest as you can.`}
                </p>
                <button onClick={nextQuestion} className="vs-btn">Sound Good</button>
              </>
            ) : (
              <>
                <h2 className="mb-4">{currentQuestion.question}</h2>
                <div className="options">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        id={`option${index}`}
                        value={option}
                        checked={selectedOptions[currentQuestionIndex] === option}
                        onChange={() => {
                          const newSelectedOptions = [...selectedOptions];
                          newSelectedOptions[currentQuestionIndex] = option;
                          setSelectedOptions(newSelectedOptions);
                        }}
                      />
                      <label htmlFor={`option${index}`}>{option}</label>
                    </div>
                  ))}
                </div>
                <button onClick={previousQuestion} style={{ display: currentQuestionIndex !== 0 ? 'inline-block' : 'none' }} className="vs-btn">
                  Back
                </button>
                <button
                  onClick={isLastQuestion ? submitAnswers : nextQuestion}
                  className="vs-btn mt-3"
                  style={{ marginLeft: '10px' }}
                >
                  {isLastQuestion ? (
                    <span disabled={isSubmitting}>
                      {isSubmitting ? 'Loading...' : 'Submit'}
                    </span>
                  ) : (
                    'Next'
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default PreScreen;
