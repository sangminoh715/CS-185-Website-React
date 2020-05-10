import Axios from "axios";
import React, {Component} from "react";

import Movie from "./Movie";
import PageHeader from "../PageHeader";

import "./MovieList.css";

import Movies from "./movies.json";

export class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movieInformation: []
    };

    this.omdbAPIKey = "7bfe31b4";
  }

  render() {
    const title = "Movie List";
    const description = "This page features some of my favorite movies.";

    return (
      <div>
        <PageHeader tabTitle={title} tabDescription={description}/>
        <div className="posterGallery">
          {
            this.state.movieInformation.map((information) => {
              return (
                <Movie 
                  poster={information.poster}
                  title={information.title}
                  director={information.director}
                  rating={information.rating}
                  />
              );  
            })
          }
        </div>
      </div>
    );
  }

  componentDidMount() {
    Movies.map((movie) => (
      Axios.get("http://www.omdbapi.com/?apikey=" + this.omdbAPIKey + "&i=" + movie.id)
        .then((response) => {
          const newMovieInformation = {
            poster: response.data.Poster, 
            title: response.data.Title,
            director: response.data.Director, 
            rating: response.data.imdbRating
          };

          this.setState({
            movieInformation: [...this.state.movieInformation, newMovieInformation]
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {})
    ));
  }
}

export default MovieList;