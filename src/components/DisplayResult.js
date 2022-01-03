import { ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";

const DisplayResult = ({ result }) => {
  const [distances, setDistances] = useState(result.D);
  const [paths, setPaths] = useState(result.P);

  useEffect(() => {
    setDistances(result.D);
    setPaths(result.P);
  }, [result]);

  return (
    <>
      {console.log(distances)}
      <ListGroup className="me-3 text-center scroll-display">
        <ListGroup.Item className="edge-li">
          <strong>Paths:</strong>
        </ListGroup.Item>
        {distances.map((value, index) => (
          <ListGroup.Item key={index} className="edge-li">
            node: {index} |Distance: {distances[index]}| Path: {paths[index]}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default DisplayResult;
