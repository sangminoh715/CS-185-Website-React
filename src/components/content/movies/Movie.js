import React, {Component} from "react";

export class Movie extends Component {
  render() {
    return (
      <img 
        className="moviePoster"
        alt={this.props.title}
        src={this.props.poster} />
    );
  }
}

export default Movie;