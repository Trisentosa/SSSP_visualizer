import { useState, useEffect, useRef } from "react";
import { select } from "d3";
import DisplayInfo from "./DisplayInfo";
import { Button, Container, InputGroup, FormControl } from "react-bootstrap";
import "../App.css";
import AlgoOptions from "./AlgoOptions";
import RunButton from "./RunButton";
import DescriptionBox from "./DescriptionBox";

//svg dimensions and inital value
let edge = {};
let index = -1;
let isTargetting = false;
let isLinking = true;

const Graph = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [isWeightSelected, setIsWeightSelected] = useState(false);
  const [weight, setWeight] = useState(false);

  // D3 stuff
  const svgRef = useRef();
  const svg = select(svgRef.current);

  let linkNodes = () => {
    if (!isLinking && isWeightSelected) {
      edge.weight = weight;
      setEdges([...edges, edge]);
      edge = {};
      isLinking = true;
    }
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

    svg.selectAll("g").on("contextmenu", function (e, d) {
      e.preventDefault();

      if (isTargetting && isLinking && edge.index1 !== d.index) {
        select(this).join("circle").attr("stroke", "green");
        isTargetting = false;
        let angle = Math.atan2(d.y - edge.y1, d.x - edge.x1);
        edge.x2 = d.x - Math.cos(angle) * d.radius;
        edge.y2 = d.y - Math.sin(angle) * d.radius;
        edge.x1 = edge.x1 + Math.cos(angle) * d.radius;
        edge.y1 = edge.y1 + Math.sin(angle) * d.radius;
        edge.index2 = d.index;
        isLinking = false;
      } else if (isLinking) {
        select(this).join("circle").attr("stroke", "red");
        isTargetting = true;
        edge = { x1: d.x, y1: d.y, x2: d.x, y2: d.y, index1: d.index };
      }
    });
  }, [nodes, edges]);

  return (
    <Container>
      <div className="flex-center mb-3 top-bar">
        <DescriptionBox />
      </div>
      <div className="flex-center mb-3 ">
        <Button
          variant="outline-dark"
          className="link-button shadow-none"
          onClick={linkNodes}
        >
          Link nodes
        </Button>{" "}
        <input
          type="number"
          className="form-control weight-input mx-3"
          placeholder="Weight"
          value={weight}
          onChange={(e) => {
            if (e.target.value) {
              setIsWeightSelected(true);
              setWeight(e.target.value);
            } else {
              setIsWeightSelected(false);
            }
          }}
        />
        <AlgoOptions />
        <RunButton nodes={nodes} edges={edges} />
      </div>
      <div className="flex-center mb-3">
        <DisplayInfo nodes={nodes} edges={edges} />

        <svg
          onClick={(e) => {
            if (e.ctrlKey && e.target.tagName === "svg") {
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
            } else if (e.ctrlKey && e.target.tagName === "circle") {
              let circleInfo = e.target.__data__;

              //delete node selected and edge related to it
              //update index references in edge and nodes (-1 if its bigger than circleInfo.index)
              setNodes(
                nodes.reduce(function (filtered, node) {
                  if (node.index !== circleInfo.index) {
                    let newNode = { ...node };

                    if (node.index > circleInfo.index) {
                      newNode.index = node.index - 1;
                    }
                    filtered.push(newNode);
                  }
                  return filtered;
                }, [])
              );
              setEdges(
                edges.reduce(function (filtered, edge) {
                  let newEdge = { ...edge };
                  if (
                    edge.index1 !== circleInfo.index &&
                    edge.index2 !== circleInfo.index
                  ) {
                    if (edge.index1 > circleInfo.index) {
                      newEdge.index1 = edge.index1 - 1;
                    }
                    if (edge.index2 > circleInfo.index) {
                      newEdge.index2 = edge.index2 - 1;
                    }
                    filtered.push(newEdge);
                  }
                  return filtered;
                }, [])
              );
              index -= 1;
            }
          }}
          ref={svgRef}
        ></svg>
      </div>
    </Container>
  );
};

export default Graph;
