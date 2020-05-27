import React, {Component} from "react";

import AdditionInterface from "./AdditionInterface";

export class AddMovieListModal extends Component {
  render() {
    const prompt = "Create New List";
    const detailedPrompt = "Please enter a title for the new list."

    return (
      <AdditionInterface 
        prompt={prompt}
        detailedPrompt={detailedPrompt}
        buttonText="Create"
        submit={this.props.submit}
        exitModal={this.props.exitModal}
        />
    );
  }
}

export default AddMovieListModal;