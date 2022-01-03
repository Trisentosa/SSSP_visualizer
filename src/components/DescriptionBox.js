import { Badge } from "react-bootstrap";

const DescriptionBox = () => {
  return (
    <div className="desc-box">
      <h4>Instruction: </h4>
      <span className="mb-2">
        1. <Badge bg="dark">Ctrl</Badge> + Click on canvas to create a node
      </span>
      <span className="mb-2">
        2. <Badge bg="dark">Ctrl</Badge> + Click on a node to delete them and
        related edges
      </span>
      <span className="mb-2">
        3a. To create a new edge, start by <strong>Right clicking</strong> on 2
        different nodes
      </span>
      <span className="mb-2">
        3b. Red hightlight will be the <Badge bg="danger">Source</Badge> and
        blue hightlight will be the <Badge bg="primary">Destination</Badge>
      </span>
      <span className="mb-2">
        4. Fill in the <strong>Weight</strong> of the edge and connect them by
        clicking the <strong>Link Button</strong>
      </span>
      <span className="mb-2">
        5. Once graph is done, choose an <strong>algorithm</strong> to run and
        click the <strong>Run</strong> button
      </span>
    </div>
  );
};

export default DescriptionBox;
