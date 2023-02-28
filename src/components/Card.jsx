import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useFetch } from "../hooks/useFetch";
import CardContent from "./CardContent";

export default function Card({ endpoint, id }) {
  let { data } = useFetch(
    `https://deezerdevs-deezer.p.rapidapi.com/${endpoint}/${id}`
  );

  return (
    <>
      <CardContent data={data} />
    </>
  );
}
