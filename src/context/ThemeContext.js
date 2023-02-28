import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [textColor, setTextColor] = useState("white");
  const [theme, setTheme] = useState("dark");
  const [playlists, setPlaylists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [song, setSong] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState([]);
  const [lastPlayed, setLastPlayed] = useState([]);
  const [userdata, setUserdata] = useState(null);
  const [docId, setDocId] = useState(null);

  // Ids from spotify!
  const artistsIdArr = [
    "63kndWSdNb6eLYN4OdaJRb",
    "2qXe9nDyQBHyMLduqEwQZb",
    "6eXZu6O7nAUA5z6vLV8NKI",
    "2HvyR5FsU37QMqVzIbGwl7",
    "7fw0E8WHdG3r9SuPBcGmWk",
    "6qqNVTkY8uBg9cP3Jd7",
    "5pKCCKE2ajJHZ9KAiaK11H",
  ];
  // Ids from Deezer
  const playlistsArr = [
    9948372002, 10396807962, 4191304002, 967445201, 3110421322, 935381445,
    8482790282, 7615944102,
  ];
  const albumIdArr = [
    340077257, 352669977, 384131297, 6019334, 362299477, 230638702, 95185612,
    150710522, 15559256, 221439032, 80486,
  ];

  return (
    <ThemeContext.Provider
      value={{
        textColor,
        setTextColor,
        theme,
        setTheme,
        artistsIdArr,
        playlistsArr,
        artists,
        setArtists,
        playlists,
        setPlaylists,
        albumIdArr,
        song,
        setSong,
        playing,
        setPlaying,
        userdata,
        setUserdata,
        lastPlayed,
        setLastPlayed,
        liked,
        setLiked,
        docId,
        setDocId,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
