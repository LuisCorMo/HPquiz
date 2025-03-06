import React from "react";

function AnswerOptions({
  answers,
  onAnswerSelected,
  selectedAnswer,
  isCorrect,
}) {
  return (
    <div className="flex flex-col space-y-4 w-72 h-40">
      {" "}
      {/* Ajusta la altura según sea necesario */}
      {answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => onAnswerSelected(answer)}
          className={`text-gray-300 border-2 border-white bg-slate-900 text-lg font-medium rounded-lg py-2 px-4 mx-8 cursor-pointer ${
            selectedAnswer === answer
              ? isCorrect
                ? "bg-emerald-600"
                : "bg-red-600"
              : ""
          }`}
        >
          {answer}
        </button>
      ))}
    </div>
  );
}

export default AnswerOptions;
