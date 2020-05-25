import React, {Component} from "react";

import "./MovieLightBox.css";

export class MovieLightBox extends Component {
  render() {
    return (
      <div className="movieLightBoxContainer" onClick={(event) => {
        if(event.target === event.currentTarget) {
          this.props.exitLightBox();
        }
      }}>

        <div className="movieLightBox">
          <img className="posterLightBox" src={this.props.movieInformation.poster} alt={this.props.movieInformation.title}/>
          <div className="informationLightBox">
            <h1>{this.props.movieInformation.title} ({this.props.movieInformation.year})</h1>
            <br/>
          
            <p align="left">{this.props.movieInformation.genre} · {this.props.movieInformation.runtime}</p>
            <p align="left">IMDb Rating <b>{this.props.movieInformation.rating}</b></p>
            <br/>

            <p align="left">{this.props.movieInformation.plot}</p>
            <br/>

            <p align="left">Directed by <b>{this.props.movieInformation.director}</b></p>
            <br/>

            <div className="lightBoxButton lightBoxDeleteButton" onClick={this.props.deleteMovie.bind(this, this.props.movieInformation.id)}>
              Delete
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default MovieLightBox;