import "./App.scss";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import Userbar from "./components/Userbar";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="App">
      <div className="flex h-[90%]">
        <Navbar />
        <div className="w-full h-full">
          <Userbar />
          <div className="w-full h-[94%] bg-slate-400 overflow-scroll">
            <Homepage />
          </div>
        </div>
      </div>
      <Player />
    </div>
  );
}

export default App;
