import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuizHeader from "../components/QuizHeader";
import QuizInfo from "../components/QuizInfo";
import Question from "../components/Question";
import AnswerOptions from "../components/AnswerOptions";
import Modal from "../components/Modal";
import questionsData from "../SupportFiles/questions.json";
import undo from "../assets/images/undo-2.svg"


function Quiz({ onSaveScore }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const shuffledQuestions = shuffleArray([...questionsData.questions]);
    const selectedQuestions = shuffledQuestions.slice(0, 12);
    setQuestions(selectedQuestions);
    setAnswers(
      shuffleArray([
        ...selectedQuestions[0].wrong_answers,
        selectedQuestions[0].correct_answer,
      ])
    );
  }, []);

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      const timer = setTimeout(() => handleTimeUp(), 15000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, questions.length]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleAnswerSelected(answer) {
    const isCorrectAnswer =
      answer === questions[currentQuestionIndex].correct_answer;
    setSelectedAnswer(answer);
    setIsCorrect(isCorrectAnswer);
    if (isCorrectAnswer) {
      setScore(score + 50);
    }

    // Espera para mostrar el resultado antes de mezclar las respuestas y pasar a la siguiente pregunta
    setTimeout(() => {
      handleNextQuestion();
    }, 1000); // Mantener un tiempo suficiente para mostrar el cambio de color
  }

  function handleNextQuestion() {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setAnswers(
        shuffleArray([
          ...questions[nextQuestionIndex].wrong_answers,
          questions[nextQuestionIndex].correct_answer,
        ])
      );
    } else {
      setShowModal(true); // Mostrar el modal cuando el quiz termine
      saveScore(score); // Guardar la puntuación cuando el quiz termine
    }
    setSelectedAnswer(null); // Resetea la selección de respuesta
  }

  function handleCloseModal() {
    setShowModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    const shuffledQuestions = shuffleArray([...questionsData.questions]).slice(
      0,
      12
    );
    setQuestions(shuffledQuestions);
    setAnswers(
      shuffleArray([
        ...shuffledQuestions[0].wrong_answers,
        shuffledQuestions[0].correct_answer,
      ])
    ); // Reiniciar con nuevas preguntas
  }

  function handleTimeUp() {
    handleNextQuestion();
  }

  function saveScore(newScore) {
    const existingScores = JSON.parse(localStorage.getItem("scores")) || [];
    if (existingScores.length >= 6) {
      // Establecer el límite a 6
      existingScores.shift(); // Elimina el primer elemento para mantener el número de puntuaciones a 6
    }
    existingScores.push(newScore);
    localStorage.setItem("scores", JSON.stringify(existingScores));
  }

  const navigate = useNavigate()

  if (questions.length === 0) {
    return (
      <div className="h-screen text-center text-white text-3xl font-serif pt-52">
        Cargando preguntas...
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <section className="h-screen">
      <QuizHeader />
      <QuizInfo
        round={currentQuestionIndex + 1}
        score={score}
        onTimeUp={handleTimeUp}
      />
      {questions.length > 0 && (
        <div className="relative h-full flex flex-col items-center mt-8">
          <Question question={currentQuestion.question} />
          <AnswerOptions
            answers={answers}
            onAnswerSelected={handleAnswerSelected}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
          />
        </div>
      )}
      {showModal && <Modal score={score} onClose={handleCloseModal} />}
      <div className="absolute top-5 left-4 md:bottom-12 md:left-24">
        <button
          className="bg-gray-800 text-gray-300 rounded-lg w-12 h-12 flex items-center justify-center"
          onClick={() => navigate("/")}
        >
          <img src={undo} alt="return" />
        </button>
      </div>
    </section>
  );
}

export default Quiz;
