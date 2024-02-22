import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react";
import loader from "../assets/1481.gif";
import { PiSpeakerSimpleHigh, PiSpeakerSimpleHighFill } from "react-icons/pi";
import SearchBar from "../components/SearchBar";


const Home = () => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState(false);
  const [data, setData] = useState([]);
  const [showRecent, setShowRecent] = useState(true);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (search) {
      setLoading(true);
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
        .then((res) => {
          setData(res.data);
          setShowRecent(false);
          console.log(res.data);
          setSearch(false);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setSearch(false);
        });
    }
  }, [search]);

  const handleChange = (e) => {
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

  function refreshWindow() {
    window.location.reload();
  }
  return (
    <div className="flex flex-col h-full  gap-5">
      <div className="flex flex-col gap-3 ">
        <h1 onClick={refreshWindow} className="text-3xl cursor-pointer font-semibold">
          Dictionary
        </h1>
        <SearchBar
          handleChange={handleChange}
          onEnter={onEnter}
          setSearch={setSearch}
        />
      </div>
      {loading ? (
        <div className="my-5 flex items-center justify-center">
          <img src={loader} alt="" />
        </div>
      ) : (
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
                    {words.phonetic ||
                      words.phonetics[1].text ||
                      words.phonetics[2].text}{" "}
                    - {words.meanings[0].partOfSpeech}
                  </span>
                  <audio
                    ref={audioRef}
                    src={words.phonetics[0].audio ?? words.phonetics[1].audio}
                  ></audio>
                  <button onClick={togglePlay}>
                    <PiSpeakerSimpleHighFill />
                  </button>
                </span>
                {words.meanings[0].definitions[0].definition ??
                  words.meanings[0].definitions[1].definition ??
                  words.meanings[0].definitions[2].definition}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showRecent && (
        <div>
          <h3 className="text-xl font-bold mb-2">Recents</h3>
          <ul className="">
            <li>Bear</li>
            <li>Transportation</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;