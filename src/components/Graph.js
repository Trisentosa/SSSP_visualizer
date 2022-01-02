import { useState, useEffect, useRef } from "react";
import { select } from "d3";

//svg dimensions and inital value
let edge = {};
let index = -1;
let isTargetting = false;
let isLinking = true;

const Graph = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // D3 stuff
  const svgRef = useRef();
  const svg = select(svgRef.current);

  let linkNodes = () => {
    console.log("linked");
    console.log(edge);
    setEdges([...edges, edge]);
    edge = {};
    isLinking = true;
  };

  useEffect(() => {
    svg
      .selectAll("line")
      .data(edges)
      .join("line")
      .style("stroke", "black")
      .style("stroke-width", 3)
      .attr("x1", (value) => value.x1)
      .attr("y1", (value) => value.y1)
      .attr("x2", (value) => value.x2)
      .attr("y2", (value) => value.y2);

    let g = svg
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("transform", function (d) {
        return `translate(${d.x} ${d.y})`;
      })
      .attr("fill", "white")
      .attr("stroke", "black");

    g.append("circle")
      .attr("r", (value) => value.radius)
      .attr("fill", "white")
      .attr("stroke-width", "3");

    g.append("text")
      .text((value) => value.index)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "central")
      .attr("fill", "black")
      .attr("class", "text-unselectable")
      .style("font-size", "15px");

    g.on("contextmenu", function (e, d) {
      e.preventDefault();

      if (isTargetting && isLinking) {
        select(this).join("circle").attr("stroke", "green");
        isTargetting = false;
        let angle = Math.atan2(d.y - edge.y1, d.x - edge.x1);
        edge.x2 = d.x - Math.cos(angle) * d.radius;
        edge.y2 = d.y - Math.sin(angle) * d.radius;
        edge.x1 = edge.x1 + Math.cos(angle) * d.radius;
        edge.y1 = edge.y1 + Math.sin(angle) * d.radius;
        isLinking = false;
      } else if (isLinking) {
        select(this).join("circle").attr("stroke", "red");
        isTargetting = true;
        edge = { x1: d.x, y1: d.y, x2: d.x, y2: d.y };
      }
    });
  }, [nodes, edges]);

  return (
    <>
      <svg
        onClick={(e) => {
          if (e.ctrlKey) {
            let box = e.target.getBoundingClientRect();
            setNodes([
              ...nodes,
              {
                radius: 20,
                x: e.clientX - box.left,
                y: e.clientY - box.top,
                index: (index += 1),
              },
            ]);
          }
        }}
        ref={svgRef}
      ></svg>

      <div className="flex-center">
        <button className="link-button" onClick={linkNodes}>
          Link two nodes
        </button>
      </div>
    </>
  );
};

export default Graph;
