import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Player() {
  const {
    textColor,
    song,
    playing,
    setPlaying,
    setLiked,
    liked,
    heartColor,
    setHeartColor,
  } = useContext(ThemeContext);
  const [time, setTime] = useState("0:00");
  const [progVal, setProgVal] = useState(0);
  const [volume, setVolume] = useState(60);
  const [repeating, setRepeating] = useState(false);
  const audplayer = useRef(0);
  const progressBar = useRef(0);
  const playAnimationRef = useRef();

  /* adds zeroes to the Time*/
  const timerZeros = () => {
    let timer;
    if (Math.ceil(audplayer.current.currentTime) < 10) {
      timer = "0:0" + Math.ceil(audplayer.current.currentTime);
    } else {
      timer = "0:" + Math.ceil(audplayer.current.currentTime);
    }
    return timer;
  };

  /*updates ProgressBar in Player*/
  const repeat = useCallback(() => {
    setProgVal(Math.ceil(audplayer.current.currentTime));
    setTime(timerZeros());
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, []);

  // Plays or pauses song
  useEffect(() => {
    if (!playing) {
      audplayer.current.play();
    } else {
      audplayer.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [playing, audplayer, repeat, song]);

  // resets color of heart on songchange
  useEffect(() => {
    setHeartColor(null);
  }, [song]);

  /*adds liked Songs to Favourites and turns hearts color red*/
  const likeHandler = (e) => {
    if (heartColor) {
      setHeartColor(null);
    } else if (liked.filter((track) => track.id === song.id).length < 1) {
      setHeartColor("red");
      setLiked((prevLiked) => [...prevLiked, song]);
      console.log("song liked");
    }
  };
  // changes Volume according to input by user
  useEffect(() => {
    audplayer.current.volume = volume / 100;
  }, [volume, audplayer]);

  /** sets the player to loop */
  const handleRepeat = (e) => {
    setRepeating(!repeating);
    audplayer.current.loop = !audplayer.current.loop;
    console.log("handlerepeat fired");
  };

  return (
    <div className="h-[10%] w-full bg-slate-800 flex justify-between fixed bottom-0 sm:p-10 sm:static">
      {/* audio element */}
      <audio
        src={song?.preview}
        ref={audplayer}
        onEnded={() => {
          console.log("song ended");
          setPlaying(!playing);
        }}
      ></audio>

      {/* player left elements */}
      <div className="playerLeft flex justify-center w-1/4 items-center gap-2 md:gap-5">
        {/* album cover */}
        <div className={`hidden sm:inline`}>
          <img src={song?.album.cover_small} alt={song?.title} />
        </div>
        {/* title and artistname */}
        <div className="titleAndArtist">
          <h5 className="text-base font-bold">{song?.title}</h5>
          <p className="text-sm">{song?.artist.name}</p>
        </div>
        {/* Heart for likes */}
        <button
          onClick={(e) => {
            likeHandler(e);
          }}
        >
          <svg
            role="img"
            height="16"
            width="16"
            aria-hidden="true"
            viewBox="0 0 16 16"
          >
            <path
              fill={heartColor ? heartColor : textColor}
              d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="playermiddle flex flex-col justify-center gap-2 w-[40%]">
        {/* Controls */}
        <div className="controls flex justify-center items-center gap-3">
          {/* Shuffle button */}
          <div>
            <svg
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              viewBox="0 0 16 16"
              data-encore-id="icon"
            >
              <path
                fill={textColor}
                d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"
              ></path>
              <path
                fill={textColor}
                d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"
              ></path>
            </svg>
          </div>
          {/* backwards button */}
          <div>
            <svg
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              viewBox="0 0 16 16"
              data-encore-id="icon"
            >
              <path
                fill={textColor}
                d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"
              ></path>
            </svg>
          </div>
          {/* Play / Pause Button */}
          <div
            className="rounded-full bg-white p-3"
            onClick={() => {
              setPlaying(!playing);
            }}
          >
            {playing && (
              <svg
                role="img"
                height="16"
                width="16"
                aria-hidden="true"
                viewBox="0 0 16 16"
                data-encore-id="icon"
              >
                <path
                  fill="black"
                  d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"
                ></path>
              </svg>
            )}
            {!playing && (
              <svg
                role="img"
                height="16"
                width="16"
                aria-hidden="true"
                viewBox="0 0 16 16"
                data-encore-id="icon"
              >
                <path
                  fill="black"
                  d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"
                ></path>
              </svg>
            )}
          </div>
          {/* forward button */}
          <div>
            <svg
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              viewBox="0 0 16 16"
              data-encore-id="icon"
            >
              <path
                fill={textColor}
                d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"
              ></path>
            </svg>
          </div>
          {/* repeat button */}
          <div
            onClick={(e) => {
              handleRepeat(e);
            }}
          >
            <svg
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              viewBox="0 0 16 16"
              data-encore-id="icon"
            >
              <path
                fill={repeating ? "red" : textColor}
                d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"
              ></path>
            </svg>
          </div>
        </div>
        {/* ProgressBar */}
        <div className="progressbar flex justify-center items-center gap-4">
          <p>{time}</p>

          <input
            type="range"
            name="progressbar"
            min="0"
            max="30"
            className="bg-slate-100 w-full h-1 rounded-md relative "
            value={progVal}
            ref={progressBar}
          />

          <p>0:30</p>
        </div>
      </div>
      <div className="playerRight flex justify-end items-center gap-1 w-[15%] lg:gap-3 lg:w-[8%]">
        <div>
          <svg
            height="16"
            width="16"
            aria-hidden="true"
            aria-label="Mittlere Lautstärke"
            id="volume-icon"
            viewBox="0 0 16 16"
          >
            <path
              fill={textColor}
              d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"
            ></path>
          </svg>
        </div>

        {/* Volume setting */}
        <input
          type="range"
          name="volume"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
}
