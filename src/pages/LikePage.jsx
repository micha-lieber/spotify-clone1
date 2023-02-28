import React, { useContext } from "react";
import CardContent from "../components/CardContent";
import { ThemeContext } from "../context/ThemeContext";
import { headingStyle } from "./Homepage";
export default function LikePage() {
  const { liked } = useContext(ThemeContext);

  return (
    <div>
      <h1
        className={`${headingStyle}`}
        onClick={() => {
          console.log(liked);
        }}
      >
        Songs you enjoyed, apparently.
      </h1>
      <div className="flex justify-center gap-3 p-2 flex-wrap">
        {liked.reverse().map((track) => (
          <CardContent data={track} key={Math.random() * 1000000} />
        ))}
      </div>
    </div>
  );
}
