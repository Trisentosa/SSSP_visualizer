import "./App.css";
import Dijkstra from "./sssp/Dijkstra";
import BellmanFord from "./sssp/BellmanFord";
import { useState, useEffect, useRef } from "react";
import Graph from "./components/Graph";

let inf = Infinity;
let W = [
  [0, 50, 45, 10, inf, inf],
  [inf, 0, 10, 15, inf, inf],
  [inf, inf, 0, inf, 35, inf],
  [10, inf, inf, 0, 15, inf],
  [inf, 20, 30, inf, 0, inf],
  [inf, inf, inf, inf, 3, 0],
];

// inital values

const App = () => {
  const [dijkstra, setDijkstra] = useState("");
  const [bellman, setBellman] = useState("");
  return (
    <div>
      <Graph />
    </div>
  );
};

export default App;
