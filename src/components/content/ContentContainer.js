import React, {Component} from 'react';

import Home from "./home/Home";
import Guestbook from "./guestbook/Guestbook";
import MovieList from "./movies/MovieList";
import Pictures from "./pictures/Pictures";
import Projects from "./projects/Projects";
import Videos from "./videos/Videos";

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
        return <Pictures useLargeViewer={this.props.useLargeViewer}/>;
      case 3:
        return <Videos/>;
      case 4:
        return <Guestbook/>;
      case 5:
        return <MovieList/>;
    }
  };

  render() {
    return (this.displayContent());
  }
}

export default ContentContainer;