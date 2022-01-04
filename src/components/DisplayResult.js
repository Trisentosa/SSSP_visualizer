import { ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";

const DisplayResult = ({ result }) => {
  const [distances, setDistances] = useState(result.D);
  const [paths, setPaths] = useState(result.P);
  const [solvable, setSolvable] = useState(result.solvable);

  useEffect(() => {
    setDistances(result.D);
    setPaths(result.P);
    setSolvable(result.solvable);
  }, [result]);

  return (
    <>
      <ListGroup className="me-3 text-center scroll-display">
        <ListGroup.Item className="edge-li">
          <strong>Paths:</strong>
        </ListGroup.Item>
        {solvable
          ? distances.map((value, index) => (
              <ListGroup.Item key={index} className="edge-li">
                node: {index} |Min.Distance: {distances[index]}| SP From:{" "}
                {paths[index]}
              </ListGroup.Item>
            ))
          : "The graph is not solvable! see the '?' button next to algo option to see why graph is not solvable"}
      </ListGroup>
    </>
  );
};

export default DisplayResult;
