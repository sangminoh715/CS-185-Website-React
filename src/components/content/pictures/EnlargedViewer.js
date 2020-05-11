import React, {Component} from 'react';

import {getPicture} from "../../../images/pictures/Pictures";

import "./EnlargedViewer.css";

export class EnlargedViewer extends Component {
  render() {
    return (
      <div className="enlargedImageViewContainer" onClick={(event) => {
        if(event.target === event.currentTarget) {
          this.props.exitLargeViewer();
        }
      }}>

        <img className="enlargedImage" src={getPicture(this.props.imageId)} alt=""/>

      </div>
    );
  }
}

export default EnlargedViewer;