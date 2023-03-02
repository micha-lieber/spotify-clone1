import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { ThemeContext } from "../context/ThemeContext";
import { spotifyAuth, spotifyFirestore } from "../firebase/config";

export default function Userbar() {
  const { dispatch, user } = useContext(AuthContext);
  const { docId, liked, lastPlayed } = useContext(ThemeContext);
  const buttons =
    "border border-white rounded-md p-1 font-semibold flex justify-center items-center hover:border-blue-400 hover:text-blue-400";

  /**signs user out and updates database with liked and lastPlayed arrays */
  const signoutHandler = async (e) => {
    if (user) {
      try {
        await updateDoc(doc(spotifyFirestore, "users", docId), {
          lastPlayed: lastPlayed,
          liked: liked,
        });
        await signOut(spotifyAuth);

        dispatch({ type: "LOGOUT" });
      } catch (error) {
        console.log("error signing out. Code:", error.message, error.code);
      }
    }
  };

  return (
    <div className="w-full sm:h-[6%] bg-slate-800 flex justify-end sm:justify-start gap-4 p-2 lg:justify-end ">
      <NavLink
        to={`${user ? "/" : "/signup"}`}
        className={`${buttons}`}
        onClick={(e) => {
          console.log(docId);
        }}
      >
        {user ? `Hi ${user.displayName}` : "sign up"}
      </NavLink>
      {!user && (
        <NavLink to={`${user ? "/" : "/login"}`} className={`${buttons}`}>
          login
        </NavLink>
      )}
      <button
        className={`${buttons} lg:mr-[200px]`}
        onClick={(e) => {
          signoutHandler(e);
        }}
      >
        signout
      </button>
    </div>
  );
}
