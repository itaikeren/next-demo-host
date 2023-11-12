import RandomPicker from "./components/random-picker";
import { participants } from './participants';

export default function App() {

  return (
    <div className="flex flex-col h-screen w-screen m-auto">
      <RandomPicker items={participants} duration={1000} />
    </div>
  );
}
