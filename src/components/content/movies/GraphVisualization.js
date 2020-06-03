import React, {Component} from "react";

import "./GraphVisualization.css";

var d3 = require("d3");

export class GraphVisualization extends Component {

  constructor() {
    super();

    this.data = {
      nodes: [],
      links: []
    };
  }

  getDrag = (simulation) => {
    const onDragStart = (data) => {
      if(!d3.event.active)
        simulation.alphaTarget(0.3).restart();

      data.fx = data.x;
      data.fy = data.y;
    }

    const onDrag = (data) => {
      data.fx = d3.event.x;
      data.fy = d3.event.y;
    }

    const onDragEnd = (data) => {
      if(!d3.event.active)
        simulation.alphaTarget(0);

      data.fx = null;
      data.fy = null;
    }

    return d3.drag()
      .on("start", onDragStart)
      .on("drag", onDrag)
      .on("end", onDragEnd);
  }

  getChart = (nodes, links) => {
    const width = 1920, height = 1080;

    const objectNodes = nodes.map(data => Object.create(data));
    const objectLinks = links.map(data => Object.create(data));

    const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("preserveAspectRatio", "xMinYMin meet");

    const svgLinks = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.8)
      .selectAll("line")
      .data(objectLinks)
      .join("line")
      .attr("stroke-width", data => Math.sqrt(data.value));

    const color = (node) => {
      switch(node.group) {
        case 1:
          return d3.color("pink");
        case 2:
        default:
          return d3.color("gray");
      }
    }

    const radius = (node) => {
      switch(node.group) {
        case 1:
          return 100;
        case 2:
        default:
          return 30;
      }
    }

    const simulation = d3.forceSimulation(objectNodes)
      .force("link", d3.forceLink().links(links).id(data => {return data.index}).distance(200))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width/2, height/2));

    const svgNodes = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(objectNodes)
      .join("circle")
      .attr("r", radius)
      .attr("fill", color)
      .call(this.getDrag(simulation));

    simulation.on("tick", () => {
      svgLinks
        .attr("x1", data => data.source.x)
        .attr("y1", data => data.source.y)
        .attr("x2", data => data.target.x)
        .attr("y2", data => data.target.y);

      svgNodes
        .attr("cx", data => data.x)
        .attr("cy", data => data.y);
    });

    return svg.node();
  }

  render() {
    return (
      <div className="graphVisualizationContainer" onClick={(event) => {
        if(event.target === event.currentTarget) {
          this.props.exitGraphVisualization();
        }
      }}>

        <div className="graphVisualization">
          <div id="graphSvg" className="graphSvg">

          </div>
        </div>

      </div>
    );
  }

  componentDidMount () {
    var movieNodes = [];
    var actorNodes = [];
    this.props.movies.forEach((movie) => {
      movieNodes.push({
        title: movie.title,
        poster: movie.poster,
        actors: movie.actors,
        group: 1
      });

      movie.actors.forEach((actor) => {
        const actorNode = {
          name: actor,
          group: 2
        };

        const existingNode = actorNodes.find((node) => node.name === actor);
        if(typeof existingNode === "undefined") {
          actorNodes.push(actorNode);
        }
      });
    });

    this.data.nodes.push(...movieNodes);
    this.data.nodes.push(...actorNodes);

    movieNodes.forEach((movie, index) => {
      movie.actors.forEach((actor) => {
        var actorIndex = -1;
        for(var i=0; i<actorNodes.length; i+=1) {
          if(actorNodes[i].name === actor) {
            actorIndex = i;
            break;
          }
        }

        this.data.links.push({
          source: index,
          target: movieNodes.length + actorIndex
        });
      });
    });

    const svgElement = document.getElementById("graphSvg");
    svgElement.appendChild(this.getChart(this.data.nodes, this.data.links));
  }
}

export default GraphVisualization;