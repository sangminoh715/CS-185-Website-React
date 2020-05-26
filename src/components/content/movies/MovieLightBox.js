import React, {Component} from "react";

import "./MovieLightBox.css";

export class MovieLightBox extends Component {
  constructor() {
    super();

    this.state = {
      dropdownVisible: false
    };
  }

  displayDropdown = () => {
    var listsNotContainingMovie = [];
    this.props.lists.map((list) => {
      if(typeof list.movies === "undefined") {
        listsNotContainingMovie.push(list.name);
        return true;
      }

      for(var i=0; i<list.movies.length; i+=1) {
        if(list.movies[i].id === this.props.movieInformation.id) {
          return false;
        }
      }
      listsNotContainingMovie.push(list.name);
      return true;
    });

    if(this.state.dropdownVisible) {
      return (
        <div id="addToListDropdownContent" className="addToListDropdownContent">
          {
            listsNotContainingMovie.map((listName) => {
              return <div className="addToListElement" onClick={this.props.addToList.bind(this, listName, this.props.movieInformation)}>{listName}</div>;
            })
          }
        </div>
      );
    }
    return;
  }

  handleClickOutsideDropdown = (event) => {
    event.stopPropagation();
    if(event.target.className !== "addToListElement" && event.target.className !== "lightBoxButton lightBoxAddToListButton dropdown-toggle") {
      this.setState({
        dropdownVisible: false
      });
    }
  }

  onDropdownToggle = () => {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    });
  }

  render() {
    return (
      <div className="movieLightBoxContainer" onClick={(event) => {
        if(event.target === event.currentTarget) {
          this.props.exitLightBox();
        }
      }}>

        <div className="movieLightBox">
          <img className="posterLightBox" src={this.props.movieInformation.poster} alt={this.props.movieInformation.title}/>
          <div className="informationLightBox">
            <h1>{this.props.movieInformation.title} ({this.props.movieInformation.year})</h1>
            <br/>
          
            <p align="left">{this.props.movieInformation.genre} · {this.props.movieInformation.runtime}</p>
            <p align="left">IMDb Rating <b>{this.props.movieInformation.rating}</b></p>
            <br/>

            <p align="left">{this.props.movieInformation.plot}</p>
            <br/>

            <p align="left">Directed by <b>{this.props.movieInformation.director}</b></p>
            <br/>

            <div className="lightBoxButton lightBoxDeleteButton" onClick={this.props.deleteMovie.bind(this, this.props.movieInformation.id)}>
              Delete
            </div>
            <div className="addToListDropdownContainer">
              <div className="lightBoxButton lightBoxAddToListButton dropdown-toggle" onClick={this.onDropdownToggle}>
                Add To List
              </div>
              {this.displayDropdown()}
            </div>
          </div>
        </div>

      </div>
    );
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutsideDropdown);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutsideDropdown);
  }
}

export default MovieLightBox;