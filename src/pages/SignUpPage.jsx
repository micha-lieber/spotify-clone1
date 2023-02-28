import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext.js";
import { spotifyAuth, spotifyFirestore } from "../firebase/config.js";

export default function SignUpPage() {
  const [uName, setUname] = useState("");
  const [uMail, setUmail] = useState("");
  const [uPw, setUpw] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useContext(AuthContext);

  const inputStyle = "p-1 text-black rounded-md";
  const flex = "flex flex-col justify-center items-center gap-3";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(spotifyAuth, uMail, uPw);
      if (!res) {
        throw new Error("could not create user");
      }
      await updateProfile(res.user, { displayName: uName });
      await addDoc(collection(spotifyFirestore, "users"), {
        userId: res.user.uid,
        liked: [],
        lastPlayed: [],
      });
      dispatch({ type: "LOGIN", payload: res.user });
    } catch (err) {
      setError(err);
    }

    setUmail("");
    setUname("");
    setUpw("");
  };

  return (
    <div className={`${flex} w-full h-full`}>
      <h1 className={`text-2xl font-bold`}>
        Sign up now to listen to everything, all at once!
      </h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className={`${flex}`}
      >
        <input
          type="text"
          name="uName"
          id=""
          placeholder="Your user name"
          aria-label="Username Input"
          value={uName}
          onChange={(e) => setUname(e.target.value)}
          className={`${inputStyle}`}
        />
        <input
          type="email"
          name="uMail"
          placeholder="Your e-mail"
          value={uMail}
          onChange={(e) => setUmail(e.target.value)}
          className={`${inputStyle}`}
        />
        <input
          type="password"
          name="uPw"
          placeholder="Your password"
          value={uPw}
          onChange={(e) => setUpw(e.target.value)}
          className={`${inputStyle}`}
        />
        <button
          type="submit"
          className="border rounded-lg w-full p-2 hover:border-blue-400 hover:text-blue-400"
        >
          Sign up
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}
