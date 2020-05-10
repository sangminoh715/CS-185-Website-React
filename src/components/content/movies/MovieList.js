import React, {Component} from "react";

import PageHeader from "../PageHeader";

import "./MovieList.css";

export class MovieList extends Component {
  render() {
    const title = "Movie List";
    const description = "This page features some of my favorite movies.";

    return (
      <div>
        <PageHeader tabTitle={title} tabDescription={description}/>

      </div>
    );
  }
}

export default MovieList;