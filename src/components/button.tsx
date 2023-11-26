import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

function Button({
  isDisabled,
  className = "",
  onClick,
  children
}: {
  isDisabled: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`group relative transition-transform active:translate-y-0.5 disabled:cursor-not-allowed disabled:active:translate-y-0 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              75px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.25),
              transparent 80%
            )
          `
        }}
      />
      <motion.div
        className="rounded-lg p-px"
        initial={{ "--degree": "0turn" } as never}
        animate={{ "--degree": "1turn" } as never}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{
          background: useMotionTemplate`
            conic-gradient(from var(--degree) at 50% 50%, rgba(0,0,0, 0.5) 0deg, rgba(0,0,0, 0.5) 60deg, rgba(0,0,0, 0) 310deg, rgba(0,0,0, 0.5) 360deg)
          `
        }}
      >
        <div
          aria-disabled={isDisabled}
          className="h-full w-full rounded-lg border border-indigo-700 bg-indigo-400 pt-px transition-colors aria-disabled:border-slate-600 aria-disabled:bg-slate-400"
        >
          <div
            aria-disabled={isDisabled}
            className="h-full w-full rounded-md bg-indigo-600 px-4 py-2 text-xl font-semibold text-white transition-colors aria-disabled:bg-slate-500"
          >
            {children || "Click me"}
          </div>
        </div>
      </motion.div>
    </button>
  );
}

export default Button;
