import React from "react";
import { Link } from "react-router-dom";

function Modal({ score, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-8">
      <div className="bg-slate-900 border-gray-200 border-2 p-6 rounded-lg text-center text-white">
        <h2 className="text-2xl font-semibold mb-4">¡Felicidades!</h2>
        <p className="text-lg mb-4">Tu puntaje fue de {score}</p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            onClick={onClose}
          >
            Menú
          </Link>
          <Link
            to="/score"
            className="bg-green-500 text-white py-2 px-4 rounded-lg"
            onClick={onClose}
          >
            Puntuaciones
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Modal;
