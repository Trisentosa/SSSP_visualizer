import { useState, useEffect, useRef } from "react";
import { select, line } from "d3";
import DisplayInfo from "./DisplayInfo";
import { Button, Container, Row, Col } from "react-bootstrap";
import { BsLink45Deg } from "react-icons/bs";
import "../App.css";
import AlgoOptions from "./AlgoOptions";
import RunButton from "./RunButton";
import DescriptionBox from "./DescriptionBox";
import DisplayResult from "./DisplayResult";

//svg dimensions and inital value
let edge = {};
let index = -1;
let isTargetting = false;
let isLinking = true;

const Graph = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [algo, setAlgo] = useState("Dijkstra");
  const [result, setResult] = useState({ D: [], P: [] });

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

  const handleNodesEdges = (e) => {
    if (e.ctrlKey && e.target.tagName === "svg") {
      let box = e.target.getBoundingClientRect();
      //add a node
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
  };

  useEffect(() => {
    //edges
    let pathLine = svg
      .selectAll(".edge")
      .data(edges)
      .join((enter) => {
        let e = enter.append("g").attr("class", "edge");
        e.append("path")
          .attr("d", (value) => {
            return line()([
              [value.x1, value.y1],
              [value.x2, value.y2],
            ]);
          })
          .attr("fill", "none")
          .attr("stroke", "black")
          .attr("stroke-width", 3);
        e.append("circle")
          .attr("r", 5)
          .attr("fill", "red")
          .attr("stroke-width", 3)
          .attr("cy", (value) => value.y2)
          .attr("cx", (value) => value.x2);
      });

    pathLine
      .selectAll("circle")
      .attr("r", 5)
      .attr("fill", "red")
      .attr("stroke-width", 3)
      .attr("cy", (value) => value.y2)
      .attr("cx", (value) => value.x2);

    pathLine
      .selectAll("path")
      .attr("d", (value) => {
        return line()([
          [value.x1, value.y1],
          [value.x2, value.y2],
        ]);
      })
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 3);

    //nodes
    let g = svg
      .selectAll(".node")
      .data(nodes)
      .join((enter) => {
        let e = enter.append("g").attr("class", "node");
        e.attr("transform", function (d) {
          return `translate(${d.x} ${d.y})`;
        })
          .attr("fill", "white")
          .attr("stroke", "black");
        e.append("circle")
          .attr("r", (value) => value.radius)
          .attr("fill", "white")
          .attr("stroke-width", "3");
        e.append("text")
          .text((value) => value.index)
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "central")
          .attr("fill", "black")
          .attr("class", "text-unselectable")
          .style("font-size", "15px");
      })
      .attr("transform", function (d) {
        return `translate(${d.x} ${d.y})`;
      })
      .attr("fill", "white")
      .attr("stroke", "black");

    g.selectAll("circle")
      .attr("r", (value) => value.radius)
      .attr("fill", "white")
      .attr("stroke-width", "3");

    g.selectAll("text")
      .text((value) => value.index)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "central")
      .attr("fill", "black")
      .attr("class", "text-unselectable")
      .style("font-size", "15px");

    // right click event
    svg.selectAll("g").on("contextmenu", function (e, d) {
      e.preventDefault();

      if (isTargetting && isLinking && edge.index1 !== d.index) {
        select(this).join("circle").attr("stroke", "blue");
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
      <div className="flex-center my-3 ">
        <DescriptionBox />
      </div>
      <div className="flex-center"></div>
      <div className="menu-bar">
        <Button
          className="link-button shadow-none small-btn"
          onClick={linkNodes}
        >
          <span className="centered-label">
            {"Link"} <BsLink45Deg />
          </span>
        </Button>
        <input
          type="number"
          className="form-control weight-input"
          placeholder="W"
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
        <AlgoOptions algo={algo} setAlgo={setAlgo} />
        <RunButton
          nodes={nodes}
          edges={edges}
          algo={algo}
          setResult={setResult}
        />
      </div>
      <Row>
        <Col>
          <DisplayInfo nodes={nodes} edges={edges} />
        </Col>
        <Col>
          <svg onClick={handleNodesEdges} className="canvas" ref={svgRef}></svg>
        </Col>
        <Col>
          {console.log(result)}
          <DisplayResult result={result} />
        </Col>
      </Row>
    </Container>
  );
};

export default Graph;
