import React, {Component} from 'react';

import "./ToTopButton.css";
import buttonImage from "../../images/common/toTopButton.png";

export class ToTopButton extends Component {
  render() {
    return (
      <img className="toTopButton" src={buttonImage} alt="To Top Button" onClick={this.props.scrollToTop.bind(this, true)}/>
    );
  }
}

export default ToTopButton;