import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { spotifyAuth } from "../firebase/config";

export default function LoginPage() {
  const [uMail, setUmail] = useState("");
  const [uPw, setUpw] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useContext(AuthContext);

  const inputStyle = "p-1 text-black rounded-md";
  const flex = "flex flex-col justify-center items-center gap-3";

  /** handles login, checks with firebase if user exists */
  const submitHandler = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(spotifyAuth, uMail, uPw)
      .then((userCredentials) => {
        const user = userCredentials.user;
        dispatch({ type: "LOGIN", payload: user });
        if (!userCredentials) {
          alert("Password or e-mail do not exist");
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className={`${flex} w-full h-full`}>
      <h1 className={`text-2xl font-bold`}>Log in with your Credentials</h1>
      <form onSubmit={(e) => submitHandler(e)} className={`${flex}`}>
        <input
          type="email"
          placeholder="Your e-mail"
          value={uMail}
          onChange={(e) => {
            setUmail(e.target.value);
          }}
          className={`${inputStyle}`}
        />
        <input
          type="password"
          placeholder="Your password"
          value={uPw}
          onChange={(e) => setUpw(e.target.value)}
          className={`${inputStyle}`}
        />
        <button
          type="submit"
          className="border rounded-lg w-full p-2 hover:border-blue-400 hover:text-blue-400"
        >
          Log in
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}
