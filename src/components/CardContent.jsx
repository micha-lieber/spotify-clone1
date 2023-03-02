import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function CardContent({ data }) {
  const { song, setSong, setPlaying, setLastPlayed } = useContext(ThemeContext);

  /**updates song to the one clicked, adds song to lastPlayed array */
  const cardClickHandler = () => {
    if (data.type === "track") {
      console.log("its a track");
      setPlaying(false);
      setSong(data);
    } else if (data.tracks.data) {
      setPlaying(false);
      setSong(data.tracks.data[0]);
      setLastPlayed((prevLastPlayed) => [
        ...prevLastPlayed.slice(prevLastPlayed.length > 10 ? 1 : null),
        song,
      ]);
    }
  };
  return (
    <div>
      {data && !data.error && (
        <div
          className="w-52 rounded-md overflow-hidden shadow-slate-800 shadow-lg hover:text-white"
          onClick={() => cardClickHandler()}
        >
          <img
            className="w-full"
            src={
              data.cover_medium
                ? data.cover_medium
                : data.picture_medium
                ? data.picture_medium
                : data.album.cover_medium
            }
            alt={data.title}
          />
          <div className="px-6 py-4">
            <p className="font-bold text-xl mb-2">{data.title}</p>
            <p>{data.artist?.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}
