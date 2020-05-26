import Axios from "axios";
import Firebase from "firebase";
import React, {Component} from "react";

import AddMovieModal from "./AddMovieModal";
import AddMovieListModal from "./AddMovieListModal";
import FirebaseConfig from "../../config/FirebaseConfig";
import Movie from "./Movie";
import MovieLightBox from "./MovieLightBox";
import PageHeader from "../PageHeader";

import "./MovieList.css";

export class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      numberVisible: 8,

      currentList: "All",
      dropdownVisible: false,
      lists: [],

      searchField: "",

      usingAddMovieModal: false,
      usingAddMovieListModal: false,
      usingMovieLightBox: false,
      lightBoxContent: {}
    };

    this.omdbAPIKey = "7bfe31b4";
  }

  displayDropdown = () => {
    if(this.state.dropdownVisible) {
      return (
        <div id="dropdownContent" className="dropdownContent">
          <div className="listElement" onClick={this.onListClicked.bind(this, "All")}>All</div>
          {
            this.state.lists.map((list) => {
              return <div className="listElement" onClick={this.onListClicked.bind(this, list.name)}>{list.name}</div>;
            })
          }
          <hr/>
          <div className="listElement" onClick={this.showAddMovieListModal}>Create List</div>
        </div>
      );
    }
    return;
  }

  displayMovies = () => {
    return (
      <div className="posterGallery">
        {
          this.state.movies.map((movie) => {
            return <Movie movieInformation={movie} useMovieLightBox={this.showMovieLightBox} />;
          })
        }
      </div>
    );
  }

  exitAddMovieModal = () => {
    document.body.classList.remove("fixedView");
    this.setState({
      usingAddMovieModal: false
    });
  }

  exitAddMovieListModal = () => {
    document.body.classList.remove("fixedView");
    this.setState({
      usingAddMovieListModal: false
    });
  }

  exitMovieLightBox = () => {
    document.body.classList.remove("fixedView");
    this.setState({
      usingMovieLightBox: false,
      lightBoxContent: {}
    });
  }

  getAddMovieModal = () => {
    if(this.state.usingAddMovieModal) {
      return <AddMovieModal submit={this.onAddNewMovie} exitModal={this.exitAddMovieModal}/>;
    }
    return;
  }

  getAddMovieListModal = () => {
    if(this.state.usingAddMovieListModal) {
      return <AddMovieListModal submit={this.onAddNewList} exitModal={this.exitAddMovieListModal}/>;
    }
    return;
  }

  getMovieLightBox = () => {
    if(this.state.usingMovieLightBox) {
      return <MovieLightBox movieInformation={this.state.lightBoxContent} exitLightBox={this.exitMovieLightBox} deleteMovie={this.onDeleteMovie} lists={this.state.lists} addToList={this.onAddToList} />;
    }
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

  onAddNewList = (listName) => {
    for(var i=0; i<this.state.lists.length; i+=1) {
      if(this.state.lists[i].name === listName) {
        alert("[Warning] A list with this name already exists");
        return;
      }
    }

    const newList = {
      name: listName,
      movies: []
    };
    Firebase.database().ref("lists").child(listName).set(newList);

    this.exitAddMovieListModal();
    alert("[Success] A new list has been created");
  }

  onAddNewMovie = (movieID) => {
    for(var i=0; i<this.state.movies.length; i+=1) {
      if(this.state.movies[i].id === movieID) {
        alert("[Warning] The movie with this ID already exists");
        return;
      }
    }

    Axios.get("https://www.omdbapi.com/?apikey=" + this.omdbAPIKey + "&i=" + movieID)
      .then((response) => {
        console.log(response);

        if(response.data.Response === "True") {

          const retrievedMovieInformation = {
            id: movieID,
            poster: response.data.Poster, 
            title: response.data.Title,
            director: response.data.Director, 
            rating: response.data.imdbRating,
            plot: response.data.Plot,
            year: response.data.Year,
            runtime: response.data.Runtime,
            genre: response.data.Genre
          };

          Firebase.database().ref("movies").child(movieID).set(retrievedMovieInformation);

          this.exitAddMovieModal();
          alert("[Success] The movie has been added");

        } else {
          alert("[Error] Invalid movie ID");
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {});
  }

  onAddToList = (listName, movieInformation) => {
    var listUpdate = {};

    for(var i=0; i<this.state.lists.length; i+=1) {
      if(this.state.lists[i].name === listName) {
        listUpdate.name = listName;
        if(typeof this.state.lists[i].movies === "undefined") {
          listUpdate.movies = [movieInformation];
        } else {
          listUpdate.movies = [...this.state.lists[i].movies, movieInformation];
        }
      }
    }

    Firebase.database().ref("lists").child(listName).update(listUpdate);

    this.exitMovieLightBox();
    alert("[Success] The movie has been added to the list");
  }
  
  onChangeSearchField = (event) => {
    this.setState({
      searchField: event.target.value
    });
  }

  onDeleteMovie = (movieID) => {
    Firebase.database().ref("movies").child(movieID).remove();

    this.exitMovieLightBox();
    alert("[Success] The movie has been deleted");
  }

  onDropdownToggle = () => {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    });
  }

  onListClicked = (listName) => {
    // [TODO]
    console.log(listName);
  }

  showAddMovieModal = () => {
    document.body.classList.add("fixedView");
    this.setState({
      usingAddMovieModal: true
    });
  }

  showAddMovieListModal = () => {
    document.body.classList.add("fixedView");
    this.setState({
      dropdownVisible: false,
      usingAddMovieListModal: true
    });
  }

  showMovieLightBox = (clickedMovieInformation) => {
    document.body.classList.add("fixedView");
    this.setState({
      usingMovieLightBox: true,
      lightBoxContent: clickedMovieInformation
    });
  }

  render() {
    const title = "Movie List";
    const description = "This page features some of my favorite movies.";

    return (
      <div>
        <PageHeader tabTitle={title} tabDescription={description}/>

        <div className="movieOptions">
          <div className="option" onClick={this.showAddMovieModal}>
            Add Movie
          </div>

          <div className="dropdownContainer">
            <div className="option dropdown-toggle" onClick={this.onDropdownToggle}>
              {this.state.currentList}
            </div>
            {this.displayDropdown()}
          </div>

          <input className="searchField" type="text" id="message" value={this.state.searchField} onChange={this.onChangeSearchField}/>
          <div className="option searchButton">
            Search
          </div>
        </div>

        {this.displayMovies()}

        {this.getAddMovieModal()}
        {this.getAddMovieListModal()}
        {this.getMovieLightBox()}
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

    Firebase.database().ref("lists").on("value", (snapshot) => {
      const receivedValue = snapshot.val();
      this.setState({
        lists: Object.values(receivedValue)
      });
    });

    document.addEventListener("click", this.handleClickOutsideDropdown);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutsideDropdown);
  }
}

export default MovieList;