export default function Controls({
  isRunning,
  isReset,
  hasChoice,
  start,
  stop,
  reset,
}: {
  isRunning: boolean;
  isReset: boolean;
  hasChoice: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
        disabled:bg-gray-500 disabled:cursor-not-allowed"
        onClick={isRunning ? stop : start}
        disabled={isRunning || !isReset}
      >
        {isRunning ? "stop" : "start"}
      </button>
      <button
        type="button"
        className="rounded-md bg-white py-2.5 px-3.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:hover:bg-gray-100"
        disabled={isRunning || !hasChoice}
        onClick={reset}
      >
        reset
      </button>
    </div>
  );
}
