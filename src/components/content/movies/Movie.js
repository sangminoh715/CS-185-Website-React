import React, {Component} from "react";

export class Movie extends Component {
  render() {
    return (
      <img 
        className="moviePoster"
        alt={this.props.movieInformation.title}
        src={this.props.movieInformation.poster}
        onClick={this.props.useMovieLightBox.bind(this, this.props.movieInformation)} />
    );
  }
}

export default Movie;