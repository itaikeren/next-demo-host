import { useEffect, useRef, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import EmployeeName from "./employee-name";
import Controls from "./controls";

function shuffleArray(array: string[]) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default function RandomPicker({ items, duration }: { items: string[]; duration: number }) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentChoice, setCurrentChoice] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isReset, setIsReset] = useState(true);
  const interval = useRef(0);
  const intervalDuration = 10;

  useEffect(() => {
    shuffleArray(items);
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  const start = () => {
    setIsReset(false);
    clearInterval(interval.current);
    setIsRunning(true);
    interval.current = setInterval(() => {
      setCurrentChoice(pickChoice());
    }, intervalDuration);
    setTimeout(() => {
      stop();
      setShowConfetti(true);
    }, duration);
  };

  const stop = () => {
    clearInterval(interval.current);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(interval.current);
    setIsRunning(false);
    setCurrentChoice("");
    setShowConfetti(false);
    setIsReset(true);
    shuffleArray(items);
  };

  const pickChoice = () => {
    const choice = items[Math.floor(Math.random() * items.length)];
    return choice;
  };

  return (
    <>
      {showConfetti && (
        <ConfettiExplosion
          force={0.8}
          duration={3000}
          particleCount={250}
          width={1600}
          className="absolute left-1/2 w-screen h-screen pointer-events-none"
        />
      )}
      <div className="h-screen">
        <div className="my-auto h-full flex flex-col items-center justify-center gap-5">
          <div className="text-8xl font-serif font-bold pb-10">Find our next host!</div>
          <EmployeeName choice={currentChoice} />
          <Controls
            isRunning={isRunning}
            isReset={isReset}
            hasChoice={currentChoice.trim().length > 0}
            start={start}
            stop={stop}
            reset={reset}
          />
        </div>
      </div>
    </>
  );
}
