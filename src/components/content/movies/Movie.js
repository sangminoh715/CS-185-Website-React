import React, {Component} from "react";

export class Movie extends Component {
  render() {
    return (
      <img 
        className="moviePoster"
        alt={this.props.title}
        src={this.props.poster}
        onClick={this.props.useMovieLightBox.bind(this, this.props.poster, this.props.title, this.props.director, this.props.rating)} />
    );
  }
}

export default Movie;