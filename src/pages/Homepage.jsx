import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Card from "../components/Card";
import { AuthContext } from "../context/authContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { spotifyFirestore } from "../firebase/config";
import CardContent from "../components/CardContent";
export const headingStyle = "text-3xl my-5";

export default function Homepage() {
  const {
    playlistsArr,
    albumIdArr,
    userdata,
    setUserdata,
    lastPlayed,
    setLastPlayed,
    setLiked,
    song,
    setDocId,
  } = useContext(ThemeContext);

  const { user } = useContext(AuthContext);

  /** gets the userdata saved in firestore, like the liked or lastPlayed lists*/
  useEffect(() => {
    const getUserData = async () => {
      const q = query(
        collection(spotifyFirestore, "users"),
        where("userId", "==", `${user.uid}`)
      );
      console.log("useEffect fired");
      try {
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          setLiked(doc.data().liked);
          setLastPlayed(doc.data().lastPlayed);
          setUserdata(doc.data());
          setDocId(doc.id);
        });
      } catch (err) {
        console.log("error wile fetching userData:", err);
      }
    };
    if (!user) {
      console.log("Authcontext:No user Found");
      return;
    } else if (lastPlayed.length < 1) {
      console.log("lastplayed is not empty");
      getUserData();
    } else {
      console.log("something went very wrong");
      return;
    }
  }, [user]);

  return (
    <div>
      {user && lastPlayed && (
        <>
          <h2
            className={`${headingStyle}`}
            onClick={(e) => {
              console.log(
                "lastPlayed",
                lastPlayed,
                "user",
                user,
                "song",
                song,
                "data",
                userdata
              );
            }}
          >
            Zuletzt gehört
          </h2>
          <div className="flex justify-center gap-3 p-2 flex-wrap">
            {lastPlayed
              .slice(1)
              .reverse()
              .map((track) => (
                <CardContent data={track} key={Math.random() * 1000000} />
              ))}
          </div>
        </>
      )}
      <h2 className={`${headingStyle}`}>Recommended albums</h2>
      <div className="flex justify-center gap-3 p-2 flex-wrap">
        {albumIdArr.map((album) => (
          <Card endpoint="album" id={album} key={album} />
        ))}
      </div>
      <h2 className={`${headingStyle}`}>Recommended playlists</h2>
      <div className="flex justify-center gap-3 p-2">
        {playlistsArr.map((playlist) => (
          <Card endpoint="playlist" id={playlist} key={playlist} />
        ))}
      </div>
    </div>
  );
}
