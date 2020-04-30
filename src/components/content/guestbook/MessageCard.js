import React, {Component} from "react";

import "./MessageCard.css";

export class MessageCard extends Component {
  render() {
    return (
      <div className="card">
        <p><b>{this.props.message.name}</b> &mdash; <i><span style={{color: "#eb4c34"}}>{this.props.message.date}</span></i></p>
        <p><i><span style={{color: "gray"}}>{this.props.message.bio}</span></i></p>
        <p style={{marginTop: "5px"}}>{this.props.message.message}</p>
      </div>
    );
  }
}

export default MessageCard;