import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function QuizInfo({ round, score, onTimeUp }) {
  const [percentage, setPercentage] = useState(100);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    setPercentage(100);
    const id = setInterval(() => {
      setPercentage((prevPercentage) => {
        const newPercentage = prevPercentage - (100 / 15);
        if (newPercentage <= 0) {
          clearInterval(id);
          if (typeof onTimeUp === 'function') {
            onTimeUp();
          }
          return 0;
        }
        return newPercentage;
      });
    }, 1000); // Reducir cada segundo

    setIntervalId(id); // Guarda el intervalo actual

    return () => clearInterval(id); // Limpiar el intervalo al desmontar el componente
  }, [round, onTimeUp]);

  return (
    <section className="grid grid-cols-3 gap-8 items-center text-center mt-2">
      <div className="text-gray-300 font-medium">
        <h3>Round</h3>
        <span>{round}/12</span>
      </div>
      <div className="text-gray-300 font-medium flex flex-col items-center">
        <div className='w-16'>
          <CircularProgressbar
            value={percentage}
            text={`${Math.ceil((percentage * 15) / 100)}`}
            counterClockwise
            styles={buildStyles({
              textColor: '#ffff',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
            })}
          />
        </div>
      </div>
      <div className="text-gray-300 font-medium">
        <h3>Score</h3>
        <span>{score} pts</span>
      </div>
    </section>
  );
}

export default QuizInfo;
