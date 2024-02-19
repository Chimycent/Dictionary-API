import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { PiSpeakerSimpleHigh, PiSpeakerSimpleHighFill } from "react-icons/pi";

const Home = () => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState(false);
  const [data, setData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
      .then((res) => {
        setData(res.data);
        setSearch(false);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [search]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  };

  const togglePlay = () => {
    audioRef.current.play();
    console.log(audioRef.current.play);
  };

  const onEnter = (e) => {
    if (e.keyCode === 13 && e.key === "Enter") {
      setSearch(true);
    }
  };

  return (
    <div className="flex flex-col h-full  gap-5">
      <div className="flex flex-col gap-3 ">
        <h1 className="text-3xl font-semibold">Dictionary</h1>
        <div className="flex flex-col ">
          <input
            className="bg-gray-200 rounded-md h-9 pb-1 pl-3 mb-3"
            onChange={handleChange}
            onKeyDown={(e) => {
              onEnter(e);
            }}
            type="text"
            placeholder="search here"
          />
          <button
            onClick={() => setSearch(true)}
            className="bg-blue-500 w-fit text-white rounded-md px-3 py-1.5"
          >
            Search
          </button>
          <i className="text-gray-600 text-sm">
            such as: sun, nature, programme
          </i>
        </div>
      </div>
      <div className={`${data ? "" : "hidden"}`}>
        <ul className="flex flex-col gap-3 ">
          {data?.map((words, index) => (
            <li
              className="flex flex-col p-2 bg-slate-50 text-slate-700 text-xs"
              key={index}
            >
              <span className="text-base gap-2  flex  items-center capitalize">
                {words.word} -
                <span className="text-sm flex items-center font-semibold">
                  {words.phonetic || words.phonetics[2].text} -{" "}
                  {words.meanings[0].partOfSpeech}
                </span>
                <audio
                  ref={audioRef}
                  src={words.phonetics[0].audio ?? words.phonetics[1].audio}
                ></audio>
                <PiSpeakerSimpleHighFill onClick={togglePlay} />
              </span>
              {words.meanings[0].definitions[0].definition ??
                words.meanings[0].definitions[1].definition ??
                words.meanings[0].definitions[2].definition}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Recents</h3>
        <ul className="">
          <li>Bear</li>
          <li>Transportat ion</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;