const StartingVertexSelect = ({ nodes, setStartVertex }) => {
  const handleChange = (e) => {
    setStartVertex(e.target.value);
  };

  return (
    <select className="menu-input" onChange={handleChange}>
      <option value="0">S</option>
      {nodes.map((node) => (
        <option key={node.index} value={node.index}>
          {node.index}
        </option>
      ))}
    </select>
  );
};

export default StartingVertexSelect;
