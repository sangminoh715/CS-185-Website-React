import React, {Component} from "react";

import "./AdditionInterface.css";

export class AdditionInterface extends Component {
  constructor() {
    super();

    this.state = {
      text: ""
    }
  }

  onChangeText = (event) => {
    this.setState({
      text: event.target.value
    });
  }

  render() {
    return (
      <div className="additionInterfaceContainer" onClick={(event) => {
        if(event.target === event.currentTarget) {
          this.props.exitModal();
        }
      }}>

        <div className="additionInterface">
          <h1>{this.props.prompt}</h1>
          <br/>

          <p align="left">{this.props.detailedPrompt}</p>

          <input className="additionInputField" type="text" id="message" value={this.state.text} onChange={this.onChangeText}/>
          <div className="additionSubmitButton" onClick={this.props.submit.bind(this, this.state.text)}>
            {this.props.buttonText}
          </div>
        </div>

      </div>
    );
  }
}

export default AdditionInterface;