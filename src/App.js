import React, {Component} from 'react';

import ContentContainer from "./components/content/ContentContainer";
import EnlargedViewer from "./components/content/EnlargedViewer";
import NavBar from "./components/navigation/NavBar";

import "./App.css"

export class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 0,

      usingLargeViewer: false,
      imageToEnlarge: -1
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
    }
  }

  render() {
    const tabs = [
      {id: 0, title: "Home"},
      {id: 1, title: "Projects"},
      {id: 2, title: "Pictures"},
      {id: 3, title: "Videos"}
    ];

    var largeViewer;
    if(this.state.usingLargeViewer) {
      largeViewer = <EnlargedViewer imageId={this.state.imageToEnlarge} exitLargeViewer={this.exitLargeViewer}/>;
    } else {
      largeViewer = <div></div>;
    }

    return (
      <div className="body">
        <div className="navBar">
          <NavBar tabs={tabs} activeTab={this.state.activeTab} changeActiveTab={this.changeActiveTab}/>
        </div>

        <div className="contentContainer">
          <ContentContainer activeTab={this.state.activeTab} useLargeViewer={this.useLargeViewer}/>
        </div>

        {largeViewer}
      </div>
    );
  }
}

export default App;