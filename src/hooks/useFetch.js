import { useEffect, useState } from "react";

// export const useFetch = () => {
const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const gofetch = async () => {
      let json;
      const options = {
        method: method,
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_URL,
        },
      };
      try {
        do {
          let response = await fetch(url, options);
          if (!response.ok) {
            throw new Error("Unable to fetch");
          }
          json = await response.json();
        } while (!json || json.error);
        setData(json);
        setIsPending(false);
      } catch (err) {
        console.log(err);
        setIsPending(false);
      }
    };
    gofetch();
  }, [url]);
  return { data, isPending };
};
