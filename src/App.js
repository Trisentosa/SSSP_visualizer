import "./App.css";
import Dijkstra from "./sssp/Dijkstra";
import BellmanFord from "./sssp/BellmanFord";
import { useState, useEffect } from "react";

const App = () => {
  let inf = Infinity;
  let W = [
    [0, 50, 45, 10, inf, inf],
    [inf, 0, 10, 15, inf, inf],
    [inf, inf, 0, inf, 35, inf],
    [10, inf, inf, 0, 15, inf],
    [inf, 20, 30, inf, 0, inf],
    [inf, inf, inf, inf, 3, 0],
  ];

  const [dijkstra, setDijkstra] = useState([0, 0]);
  const [bellman, setBellman] = useState([0, 0]);

  useEffect(() => {
    let d = new Dijkstra(W);
    let b = new BellmanFord(W);
    setDijkstra(d.run(0));
    setBellman(b.run(0));
  }, []);

  return (
    <div>
      {console.log(dijkstra)}
      {console.log(bellman)}
    </div>
  );
};

export default App;
