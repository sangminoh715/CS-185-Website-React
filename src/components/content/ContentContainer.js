import React, {Component} from 'react';

import Home from "./Home";
import Pictures from "./Pictures";
import Projects from "./Projects";
import Videos from "./Videos";

import "./ContentContainer.css";

export class ContentContainer extends Component {
  displayContent = () => {
    switch(this.props.activeTab) {
      default:
      case 0:
        return <Home/>;
      case 1:
        return <Projects/>;
      case 2:
        return <Pictures/>;
      case 3:
        return <Videos/>;
    }
  };

  render() {
    return (this.displayContent());
  }
}

export default ContentContainer;