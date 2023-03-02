import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import Userbar from "./components/Userbar";
import { AuthContext } from "./context/authContext";
import Homepage from "./pages/Homepage";
import LikePage from "./pages/LikePage";
import LoginPage from "./pages/LoginPage";
import Searchpage from "./pages/Searchpage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <BrowserRouter>
      <div className="App">
        <div className={`sm:flex ${user ? "sm:h-[90%]" : "sm:h-full"} h-full`}>
          <Navbar />
          <div className="sm:w-[90%] sm:h-full h-full">
            <Userbar />
            <div className="w-full h-[94%] bg-slate-900 overflow-scroll">
              <Routes>
                <Route
                  path="/signup"
                  element={user ? <Homepage /> : <SignUpPage />}
                />
                <Route
                  path="/login"
                  element={user ? <Homepage /> : <LoginPage />}
                />
                <Route path="/" element={<Homepage />} />
                <Route path="/search" element={<Searchpage />} />
                <Route
                  path="/liked"
                  element={user ? <LikePage /> : <Homepage />}
                />
              </Routes>
            </div>
          </div>
        </div>
        {user && <Player />}
      </div>
    </BrowserRouter>
  );
}

export default App;
