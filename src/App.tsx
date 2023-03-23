import RandomPicker from "./components/random-picker";

export default function App() {
  const namesList = [
    "Yuval Shoshan",
    "Matan Tessler",
    "Victor Isarov",
    "Ron Ben-Haim",
    "Itai Keren",
    "Noam Baron",
    "Eldad Tzadok",
    "Guy Bercovich",
    "Tal Bar-On",
    "David Sellam",
    "Jonathan Levi",
    "Sapir Rahmani",
    "Adi Moshe",
    "Shira Attias",
    "Adi Yaacobi",
    "Sahar Nahaisi",
    "Artyom Ivanov",
    "Lior Baraban",
    "Omer Furman",
    "Nir Elbaz",
    "Yuval Glizerin",
    "Laure Montuelle",
    "Loren Goldstein",
    "Ran Jarufi",
  ];

  return (
    <div className="flex flex-col h-screen w-screen m-auto">
      <RandomPicker items={namesList} duration={1000} />
    </div>
  );
}
