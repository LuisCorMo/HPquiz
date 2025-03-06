import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import undo from "../assets/images/undo-2.svg"

function Score() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('scores')) || [];
    setScores(storedScores);
  }, []);

  const navigate = useNavigate()

  return (
    <section className="h-screen flex flex-col items-center justify-center text-gray-300">
      <h1 className="text-3xl font-bold mb-8">Puntuaciones</h1>
      <div className="w-full max-w-md">
        <ul className="space-y-4">
          {scores.map((score, index) => (
            <li key={index} className="bg-gray-800 p-4 rounded-lg flex justify-between">
              <span>Jugador {index + 1}</span>
              <span>{score} pts</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-12 flex items-center space-x-4">
        <button className="bg-gray-800 text-gray-300 rounded-lg w-12 h-12 flex items-center justify-center" onClick={() => navigate("/")}>
          <img src={undo} alt="return"/>
        </button>
        <button className="px-2 py-3 rounded-lg text-gray-300 bg-gray-800" onClick={() => navigate("/quiz")}>Volver a Jugar</button>
      </div>
    </section>
  );
}

export default Score;
