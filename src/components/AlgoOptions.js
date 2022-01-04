import { Popover, OverlayTrigger, Button, ButtonGroup } from "react-bootstrap";
const dijkstraText = (
  <>
    Dijkstra algorithm works by maintaining two sets, one with shortest path
    tree and one which hasn't been added to the tree.{" "}
    <strong>
      Dijkstra will fail if there is a negative edge on the graph!
    </strong>{" "}
  </>
);

const bellmanText = (
  <>
    {" "}
    Bellman Ford uses a dynamic programming approach, it takes all the edges in
    the graph and calculates the shortest path. This process is repeated |V|-1
    times.
    <strong>
      {" "}
      Bellman works with negative edge but fail on negative weight cycle!
    </strong>
  </>
);

const AlgoOptions = ({ algo, setAlgo }) => {
  const handleChange = (e) => {
    console.log(e.target.value);
    setAlgo(e.target.value);
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Brief Description</Popover.Header>
      <Popover.Body>
        {algo === "Dijkstra" ? dijkstraText : bellmanText}
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <ButtonGroup aria-label="Basic example">
        <select value={algo} onChange={handleChange}>
          <option value="Dijkstra">Dijkstra</option>
          <option value="Bellman Ford">Bellman Ford</option>
        </select>
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <Button
            variant="secondary"
            className="me-3 shadow-none"
            style={{ borderRadius: "0" }}
          >
            ?
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </>
  );
};

export default AlgoOptions;
