import Axios from "axios";
import Firebase from "firebase";
import React, {Component} from "react";

import FirebaseConfig from "../../config/FirebaseConfig";
import Movie from "./Movie";
import PageHeader from "../PageHeader";

import "./MovieList.css";

export class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      lists: [],
      movies: [],
      numberVisible: 8,

      dropdownVisible: false,
      searchField: ""
    };

    this.omdbAPIKey = "7bfe31b4";
  }

  displayDropdown = () => {
    if(this.state.dropdownVisible) {
      return (
        <div id="dropdownContent" className="dropdownContent">
          <div className="listElement">All</div>
          <hr/>
          <div className="listElement">Create List</div>
        </div>
      );
    }
    return;
  }

  displayMovies = () => {
    return;
  }

  handleClickOutsideDropdown = (event) => {
    event.stopPropagation();
    if(event.target.className !== "listElement" && event.target.className !== "option dropdown-toggle") {
      this.setState({
        dropdownVisible: false
      });
    }
  }

  onChangeSearchField = (event) => {
    this.setState({
      searchField: event.target.value
    });
  }

  onDropdownToggle = () => {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    });
  }

  render() {
    const title = "Movie List";
    const description = "This page features some of my favorite movies.";

    return (
      <div>
        <PageHeader tabTitle={title} tabDescription={description}/>

        <div className="movieOptions">
          <div className="option">
            Add Movie
          </div>

          <div className="dropdownContainer">
            <div className="option dropdown-toggle" onClick={this.onDropdownToggle}>
              All
            </div>
            {this.displayDropdown()}
          </div>

          <input className="formField" type="text" id="message" value={this.state.searchField} onChange={this.onChangeSearchField}/>
          <div className="option searchButton">
            Search
          </div>
        </div>

        <div className="posterGallery">
          {this.displayMovies()}
        </div>
      </div>
    );
  }

  componentDidMount() {
    if(!Firebase.apps.length) {
      Firebase.initializeApp(FirebaseConfig);
    }

    Firebase.database().ref("movies").on("value", (snapshot) => {
      const receivedValue = snapshot.val();
      this.setState({
        movies: Object.values(receivedValue)
      });
    });

    Firebase.database().ref("movies").on("value", (snapshot) => {
      const receivedValue = snapshot.val();
      this.setState({
        lists: Object.values(receivedValue)
      });
    });

    /*movies.map((movie) => (
      Axios.get("https://www.omdbapi.com/?apikey=" + this.omdbAPIKey + "&i=" + movie.id)
        .then((response) => {
          const newMovieInformation = {
            poster: response.data.Poster, 
            title: response.data.Title,
            director: response.data.Director, 
            rating: response.data.imdbRating,
            plot: response.data.Plot,
            year: response.data.Year,
            runtime: response.data.Runtime,
            genre: response.data.Genre
          };

          this.setState({
            movieInformation: [...this.state.movieInformation, newMovieInformation]
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {})
    ));*/

    document.addEventListener("click", this.handleClickOutsideDropdown);
  }
}

export default MovieList;