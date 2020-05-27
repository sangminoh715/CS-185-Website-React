import React, {Component} from "react";

import AdditionInterface from "./AdditionInterface";

export class AddMovieModal extends Component {
  render() {
    const prompt = "Add Movie";
    const detailedPrompt = "Please enter the IMDb movie ID of the movie that you want to add."

    return (
      <AdditionInterface 
        prompt={prompt}
        detailedPrompt={detailedPrompt}
        buttonText="Add"
        submit={this.props.submit}
        exitModal={this.props.exitModal}
        />
    );
  }
}

export default AddMovieModal;