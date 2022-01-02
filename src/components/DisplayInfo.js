import { ListGroup } from "react-bootstrap";

const DisplayInfo = ({ nodes, edges }) => {
  return (
    <>
      {/* {console.log(nodes)}
      {console.log(edges)} */}
      <ListGroup className="me-3 text-center scroll-display">
        <ListGroup.Item className="edge-li">
          Edges ({nodes.length} nodes, {edges.length} edges)
        </ListGroup.Item>
        {edges.map(({ index1, index2, weight }, index) => (
          <ListGroup.Item key={index} className="edge-li">
            Source: {index1} | Dest: {index2} | Weight: {weight}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default DisplayInfo;
