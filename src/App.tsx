import { useEffect, useState } from "react";
import { RefreshCcw, Trophy } from "lucide-react";
import { AnimatePresence, motion, useSpring } from "framer-motion";

import AnimatedCharacter from "@/components/animated-character";
import Button from "@/components/button";
import Confetti from "@/components/confetti";
import { participants } from "@/participants";

import Background from "@/assets/background.svg?react";

const longestName = participants.reduce((acc, curr) => (curr.length > acc ? curr.length : acc), 0);
const randomize = () => participants[Math.floor(Math.random() * participants.length)].split("");

export default function App() {
  const [start, setStart] = useState(false);
  const [finished, setFinished] = useState(false);
  const [finishedCount, setFinishedCount] = useState(0);
  const [reset, setReset] = useState(false);
  const [randomName, setRandomName] = useState(randomize());
  // translateX animation for the reset button
  const tx = useSpring(0, { bounce: 1, velocity: 600, damping: 8, restDelta: 0.5 });

  const handleStart = () => {
    setStart(true);
  };
  const handleFinish = () => {
    setFinishedCount((prevCount) => prevCount + 1);
  };

  const handleReset = () => {
    setReset(true);
    setStart(false);
    setFinished(false);
    setFinishedCount(0);
    setRandomName(randomize());

    setTimeout(() => {
      setReset(false);
    }, 100);
  };

  useEffect(() => {
    if (finished) {
      tx.set(200);
    } else {
      tx.set(50);
    }
  }, [finished, tx]);

  useEffect(() => {
    if (finishedCount === longestName) {
      setFinished(true);
    }
  }, [finishedCount]);

  return (
    <div className="relative mx-auto flex h-screen flex-col items-center justify-start gap-5 overflow-hidden pt-20">
      <Background className="absolute -top-1/3 -z-20" />
      <div className="flex flex-col items-center justify-center gap-5 md:pt-2">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow outline outline-2 outline-slate-200/50 transition-shadow hover:shadow-2xl ${
            finished ? "shadow-2xl shadow-indigo-300" : ""
          }`}
        >
          <Trophy
            className={`transition-colors ${finished ? "text-indigo-600" : "text-slate-700"}`}
            size={32}
            strokeWidth={2}
            color="currentColor"
          />
        </div>
        <h1 className="text-center font-serif text-8xl font-bold text-slate-900">Who is next!?</h1>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {[...Array(longestName)].map((_, i) => {
          const char = i < randomName.length ? randomName[i] : "";
          return <AnimatedCharacter key={i} target={char} start={start} reset={reset} onFinish={handleFinish} />;
        })}
      </div>

      <div className="relative flex items-center">
        <Button className="z-10" isDisabled={start} onClick={handleStart}>
          Find who is next
        </Button>
        <motion.button
          onClick={handleReset}
          style={{ y: "-50%", x: tx }}
          animate={{ opacity: finished ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute top-1/2 -translate-y-1/2 rounded-md bg-white p-1.5 transition-all ease-linear hover:bg-slate-100 active:scale-95
          `}
        >
          <RefreshCcw className="text-slate-500" size={18} strokeWidth={2.5} color="currentColor" />
        </motion.button>
      </div>
      <AnimatePresence>{finished && <Confetti />}</AnimatePresence>
    </div>
  );
}
