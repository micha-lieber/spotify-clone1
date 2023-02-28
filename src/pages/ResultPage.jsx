import React from "react";
import { useFetch } from "../hooks/useFetch";
import CardContent from "../components/CardContent";

export default function ResultPage({ keyword }) {
  const { data } = useFetch(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=${keyword}`
  );

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {data && data.data[0] && (
        <div className="p-4 w-96 h-76 flex gap-4 justify-start">
          <div className="w-2/6 h-2/6 rounded-full overflow-hidden">
            <img
              src={data.data[0].artist.picture_medium}
              alt={data.data[0].artist.name}
              className="w-full"
            />
          </div>
          <h2 className="">{data.data[0].artist.name}</h2>
          <p>{data.data[0].artist.type}</p>
        </div>
      )}
      {data &&
        data.data.map((track) => (
          <CardContent data={track} key={Math.random() * 1000000} />
        ))}
    </div>
  );
}
