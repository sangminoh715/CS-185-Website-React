import React, {Component} from 'react';

import ContentContainer from "./components/content/ContentContainer";
import EnlargedViewer from "./components/content/pictures/EnlargedViewer";
import NavBar from "./components/navigation/NavBar";
import ToTopButton from "./components/navigation/ToTopButton";

import "./App.css"

export class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 0,

      usingLargeViewer: false,
      imageToEnlarge: -1,

      toTopButtonVisible: false
    }

    this.changeActiveTab = (id) => {
      this.setState({
        activeTab: id
      });
    };

    this.useLargeViewer = (imageId) => {
      document.body.classList.add("fixedView");
      this.setState({
        usingLargeViewer: true,
        imageToEnlarge: imageId
      });
    };

    this.exitLargeViewer = () => {
      document.body.classList.remove("fixedView");
      this.setState({
        usingLargeViewer: false,
        imageToEnlarge: -1
      });
    };

    this.showToTopButton = () => {
      this.setState({
        toTopButtonVisible: true
      });
    };

    this.hideToTopButton = (shouldScrollToTop) => {
      if(shouldScrollToTop) {
        document.body.scrollIntoView({block: "start", behavior: "smooth"});
      }

      this.setState({
        toTopButtonVisible: false
      });
    }
  }

  getEnlargedViewer = () => {
    if(this.state.usingLargeViewer) {
      return <EnlargedViewer imageId={this.state.imageToEnlarge} exitLargeViewer={this.exitLargeViewer}/>;
    }
  }

  getToTopButton = () => {
    if(this.state.toTopButtonVisible) {
      return <ToTopButton scrollToTop={this.hideToTopButton}/>;
    }
  }

  handleScroll = (event) => {
    if(event.target.scrollingElement.scrollTop > (event.srcElement.body.clientHeight / 3)) {
      this.showToTopButton();
    } else {
      this.hideToTopButton(false);
    }
  }

  render() {
    const tabs = [
      {id: 0, title: "Home"},
      {id: 1, title: "Projects"},
      {id: 2, title: "Pictures"},
      {id: 3, title: "Videos"},
      {id: 4, title: "Guestbook"},
      {id: 5, title: "Movie List"}
    ];

    return (
      <div className="mainBody">
        <div className="navBar">
          <NavBar tabs={tabs} activeTab={this.state.activeTab} changeActiveTab={this.changeActiveTab}/>
        </div>

        <div className="contentContainer">
          <ContentContainer activeTab={this.state.activeTab} useLargeViewer={this.useLargeViewer} useMovieLightBox={this.showMovieLightBox} />
        </div>

        {this.getEnlargedViewer()}

        {this.getToTopButton()}
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
}

export default App;