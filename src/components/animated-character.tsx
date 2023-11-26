import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

const ALL_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-";

const shuffleArray = (finalItem: string) => {
  const seed = finalItem.charCodeAt(0) % 10;
  const charsArray = ALL_CHARS.split("").slice(0, 25);
  const random = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  for (let i = charsArray.length - 1; i > 0; i--) {
    const j = Math.floor(random(seed + i) * (i + 1));
    [charsArray[i], charsArray[j]] = [charsArray[j], charsArray[i]];
  }
  charsArray[0] = "?";
  charsArray.push(finalItem);

  return charsArray;
};

function AnimatedCharacter({
  target,
  start,
  reset,
  onFinish
}: {
  target: string;
  start: boolean;
  reset: boolean;
  onFinish: () => void;
}) {
  const [value, setValue] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const [finished, setFinished] = useState(false);

  // start the animation after 0.1-2 seconds (random)
  useEffect(() => {
    if (!start) return;
    const randomTimeout = Math.floor(Math.random() * 2000) + 100;
    const timeoutId = setTimeout(() => {
      setStartAnimation(true);
    }, randomTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [start]);

  // increment the value every 1 second until it reaches the length of the chars array
  useEffect(() => {
    if (!startAnimation) return;
    const intervalId = setInterval(() => {
      setValue((value) => {
        if (value === shuffleArray(target).length - 2) {
          clearInterval(intervalId);
          setFinished(true);
        }
        return value + 1;
      });
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [startAnimation, target]);

  useEffect(() => {
    if (!reset) return;
    setValue(0);
    setStartAnimation(false);
    setFinished(false);
  }, [reset]);

  useEffect(() => {
    if (!finished) return;
    onFinish();
  }, [finished]);

  return (
    <div
      style={{ fontSize }}
      className={`select-none overflow-hidden rounded border-2 border-slate-400 bg-white px-3 font-medium leading-none text-slate-600 ring-2 ring-slate-200 transition-opacity
      ${!startAnimation ? "opacity-30" : "opacity-100"}
      ${finished && !target.trim() ? "opacity-30" : "opacity-100"}
      ${finished ? "text-indigo-700" : ""}
        `}
    >
      <Wrapper value={value} target={target} />
    </div>
  );
}

function Wrapper({ value, target }: { value: number; target: string }) {
  const animatedValue = useSpring(value);
  const chars = useRef(shuffleArray(target));

  useEffect(() => {
    animatedValue.set(value);
  }, [animatedValue, value]);

  useEffect(() => {
    chars.current = shuffleArray(target);
  }, [target]);

  return (
    <div style={{ height }} className="relative w-[1ch]">
      {chars.current.map((char, pos) => (
        <Char key={`${char}${pos}`} mv={animatedValue} char={char} position={pos} />
      ))}
    </div>
  );
}

function Char({ mv, char, position }: { mv: MotionValue; char: string; position: number }) {
  const y = useTransform(mv, (latest) => {
    const offset = position - latest;
    return offset * height;
  });

  return (
    <motion.span style={{ y }} className="absolute inset-0 flex items-center justify-center font-mono">
      {char}
    </motion.span>
  );
}

export default AnimatedCharacter;
