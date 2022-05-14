import "./App.css";
import Slide from "@mui/material/Slide";
import Graph from "../Components/Graph/Graph";
import { Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Slide in direction="down" timeout={700}>
        <h1 className="PageTitle">
          Site <span style={{ color: "#6e6e73" }}>Map Visualizer</span>
        </h1>
      </Slide>
      <Graph />
    </div>
  );
}

export default App;
