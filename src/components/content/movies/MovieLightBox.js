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
          
        </div>

      </div>
    );
  }
}

export default MovieLightBox;