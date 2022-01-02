import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
const RunButton = ({ nodes, edges }) => {
  const [matrix, setMatrix] = useState([]);

  const runAlgo = () => {
    let n = nodes.length;
    let matrixTmp = new Array(n).fill(0).map(() => new Array(n).fill(0));
    for (let edge of edges) {
      matrixTmp[edge.index1][edge.index2] = Number(edge.weight);
    }
    setMatrix(matrixTmp);
  };

  return (
    <>
      <Button
        variant="outline-success"
        className="shadow-none"
        onClick={runAlgo}
      >
        Run
      </Button>{" "}
      {console.log(matrix)}
    </>
  );
};

export default RunButton;
