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

  getActorName = () => {
    return (
      <div className="actorName" 
        style={{
          opacity: (this.state.isHoveringOverActor && this.state.targetActorNode.group === 2) ? 0.85 : 0,
          left: (d3.event.pageX + 15) + "px",
          top: d3.event.pageY + "px"
        }} >

        {this.state.targetActorNode.name}
      </div>
    );
  }

  getDrag = (simulation) => {
    const onDragStart = (data) => {
      if(!d3.event.active)
        simulation.alphaTarget(0.3).restart();

      data.fx = data.x;
      data.fy = data.y;

      this.isDragging = true;
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

      this.isDragging = false;
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

    var defs = svg.append("defs");
    nodes.forEach((node) => {
      if(node.group === 1) {
        defs.append("pattern")
          .attr("id", "poster" + node.id)
          .attr("width", 1)
          .attr("height", 1)
          .append("svg:image")
          .attr("xlink:href", node.poster)
          .attr("width", 300)
          .attr("height", 300)
          .attr("x", -50);  
      }
    });

    const svgLinks = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.8)
      .selectAll("line")
      .data(objectLinks)
      .join("line")
      .attr("stroke-width", data => Math.sqrt(data.value));

    const simulation = d3.forceSimulation(objectNodes)
      .force("link", d3.forceLink().links(links).id(data => {return data.index}).distance(200))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width/2, height/2));

    const svgNodes = svg.append("g")
      .selectAll("circle")
      .data(objectNodes)
      .enter()
      .append("g")
      .call(this.getDrag(simulation));

    const color = (node) => {
      switch(node.group) {
        case 1:
          return "url(#poster" + node.id + ")";
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

    svgNodes.append("circle")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .attr("r", radius)
      .style("fill", color)
      .on("mouseover", function(node) {
        if(node.group === 2) {
          d3.select(this.parentNode).selectAll(".actorName")
            .transition()
            .duration(100)
            .attr("fill-opacity", 0.85);
        }
      })
      .on("mouseout", function(node) {
        if(node.group === 2) {
          d3.select(this.parentNode).selectAll(".actorName")
            .transition()
            .duration(100)
            .attr("fill-opacity", 0);
        }
      });

    const name = (node) => {
      if(node.group === 2) {
        return node.name;
      }
      return;
    }

    svgNodes.append("text")
      .attr("class", "actorName")
      .attr("pointer-events", "none")
      .attr("font-size", "1.5rem")
      .attr("fill", "black")
      .attr("fill-opacity", 0)
      .text(name);

    simulation.on("tick", () => {
      svgLinks
        .attr("x1", data => data.source.x)
        .attr("y1", data => data.source.y)
        .attr("x2", data => data.target.x)
        .attr("y2", data => data.target.y);

      svgNodes.selectAll("circle")
        .attr("cx", data => data.x)
        .attr("cy", data => data.y);

      svgNodes.selectAll("text")
        .attr("x", data => data.x + 10)
        .attr("y", data => data.y - 40);
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
          <div id="graphSvg" className="graphSvg"></div>
        </div>

      </div>
    );
  }

  componentDidMount () {
    var movieNodes = [];
    var actorNodes = [];
    this.props.movies.forEach((movie, index) => {
      movieNodes.push({
        title: movie.title,
        poster: movie.poster,
        actors: movie.actors,
        id: index,
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