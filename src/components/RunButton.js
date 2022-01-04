import { Button } from "react-bootstrap";
import { BsFillPlayFill } from "react-icons/bs";
import BellmanFord from "../sssp/BellmanFord";
import Dijkstra from "../sssp/Dijkstra";

let inf = Infinity;

const RunButton = ({ nodes, edges, algo, setResult }) => {
  const runAlgo = () => {
    let n = nodes.length;
    //initialize matrix
    let matrixTmp = new Array(n).fill(inf).map(() => new Array(n).fill(inf));
    for (let i = 0; i < n; i++) {
      matrixTmp[i][i] = 0;
    }
    for (let edge of edges) {
      matrixTmp[edge.index1][edge.index2] = Number(edge.weight);
    }

    //get algo and result
    if (algo === "Bellman Ford") {
      let b = new BellmanFord(matrixTmp);
      setResult(b.run(0));
    } else if (algo === "Dijkstra") {
      let d = new Dijkstra(matrixTmp);
      setResult(d.run(0));
    }
  };

  return (
    <>
      <Button className="shadow-none small-btn" onClick={runAlgo}>
        <span className="centered-label">
          Run <BsFillPlayFill />
        </span>
      </Button>
    </>
  );
};

export default RunButton;
