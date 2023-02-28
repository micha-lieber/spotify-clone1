import { onAuthStateChanged } from "firebase/auth";

import { createContext, useEffect } from "react";
import { useReducer } from "react";
import { spotifyAuth } from "../firebase/config";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    // User is Loging in
    case "LOGIN":
      return { ...state, user: action.payload };
    //User is logged out
    case "LOGOUT":
      return { ...state, user: null };
    // User is logged in
    case "AUTH_IS_READY":
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(spotifyAuth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
    });
    unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ ...user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
