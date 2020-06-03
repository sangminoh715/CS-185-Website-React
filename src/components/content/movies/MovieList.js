import Axios from "axios";
import Firebase from "firebase";
import React, {Component} from "react";

import AddMovieModal from "./AddMovieModal";
import AddMovieListModal from "./AddMovieListModal";
import FirebaseConfig from "../../config/FirebaseConfig";
import GraphVisualization from "./GraphVisualization";
import Movie from "./Movie";
import MovieLightBox from "./MovieLightBox";
import PageHeader from "../PageHeader";

import "./MovieList.css";

export class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],

      currentList: "All",
      dropdownVisible: false,
      lists: [],

      searchField: "",
      filterOn: false,

      usingAddMovieModal: false,
      usingAddMovieListModal: false,
      usingMovieLightBox: false,
      lightBoxContent: {},

      showingGraphVisualization: false,

      numberLoaded: 8
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

  displayLoadMoreButton = () => {
    const listToUse = this.filterMovies();

    if(listToUse.length > this.state.numberLoaded) {
      return (
        <div className="loadMoreButtonContainer">
          <div className="loadMoreButton" onClick={this.onLoadMoreButtonClick}>
            Load More
          </div>
        </div>
      );
    }
    return;
  }

  displayMovies = () => {
    const listToUse = this.filterMovies();

    return (
      <div className="posterGallery">
        {
          listToUse.slice(0, this.state.numberLoaded).map((movie) => {
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

  exitGraphVisualization = () => {
    document.body.classList.remove("fixedView");
    this.setState({
      showingGraphVisualization: false
    });
  }

  filterMovies = () => {
    var listToUse;
    if(this.state.currentList === "All") {
      listToUse = this.state.movies;
    } else {
      for(var i=0; i<this.state.lists.length; i+=1) {
        if(this.state.lists[i].name === this.state.currentList) {
          if(typeof this.state.lists[i].movies === "undefined") {
            listToUse = []
          } else {
            listToUse = this.state.lists[i].movies;
          }
          break;
        }
      }
    }

    var filteredListToUse;
    if(this.state.filterOn) {
      filteredListToUse = listToUse.filter((movie) => {
        const title = movie.title.toLowerCase();
        const search = this.state.searchField.toLowerCase();
        return title.length >= search.length && title.slice(0, search.length) === search;
      });
    } else {
      filteredListToUse = listToUse;
    }

    return filteredListToUse;
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

  getGraphVisualization = () => {
    if(this.state.showingGraphVisualization) {
      var graphIndex = -1;
      for(var i=0; i<this.state.lists.length; i+=1) {
        if(this.state.lists[i].name === "Graph") {
          graphIndex = i;
          break;
        }
      }

      if(graphIndex > -1) {
        return <GraphVisualization movies={this.state.lists[graphIndex].movies} exitGraphVisualization={this.exitGraphVisualization}/>;
      }
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
        if(response.data.Response === "True") {

          const movieActors = response.data.Actors.split(",").map(actor => actor.trim());

          const retrievedMovieInformation = {
            id: movieID,
            poster: response.data.Poster, 
            title: response.data.Title,
            director: response.data.Director, 
            rating: response.data.imdbRating,
            plot: response.data.Plot,
            year: response.data.Year,
            runtime: response.data.Runtime,
            genre: response.data.Genre,
            actors: movieActors
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
      searchField: event.target.value,
      filterOn: (event.target.value.length > 0)
    });
  }

  onDeleteMovie = (movieID) => {
    Firebase.database().ref("movies").child(movieID).remove();

    for(var i=0; i<this.state.lists.length; i+=1) {
      if(typeof this.state.lists[i].movies !== "undefined") {
        var listUpdate = {};
        listUpdate.name = this.state.lists[i].name;
        listUpdate.movies = [];

        for(var j=0; j<this.state.lists[i].movies.length; j+=1) {
          if(this.state.lists[i].movies[j].id !== movieID) {
            listUpdate.movies.push(this.state.lists[i].movies[j]);
          }
        }

        Firebase.database().ref("lists").child(listUpdate.name).remove();
        Firebase.database().ref("lists").child(listUpdate.name).set(listUpdate);
      }
    }

    this.exitMovieLightBox();
    alert("[Success] The movie has been deleted");
  }

  onDropdownToggle = () => {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    });
  }

  onListClicked = (listName) => {
    this.setState({
      currentList: listName,
      dropdownVisible: false
    });
  }

  onLoadMoreButtonClick = () => {
    this.setState({
      numberLoaded: this.state.numberLoaded + 8,
    });
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

  showGraphVisualization = () => {
    document.body.classList.add("fixedView");
    this.setState({
      showingGraphVisualization: true
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
    const description = "This page features some movies that I have watched or want to watch.";

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

          <div className="option" onClick={this.showGraphVisualization}>
            Show Graph
          </div>

          <input className="searchField" type="text" id="message" value={this.state.searchField} placeholder="Search Movie By Title" onChange={this.onChangeSearchField}/>
        </div>

        {this.displayMovies()}

        {this.displayLoadMoreButton()}

        {this.getAddMovieModal()}
        {this.getAddMovieListModal()}
        {this.getMovieLightBox()}
        {this.getGraphVisualization()}
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