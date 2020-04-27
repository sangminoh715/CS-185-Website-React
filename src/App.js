import React, {Component} from 'react';

import ContentContainer from './components/content/ContentContainer'
import NavBar from './components/navigation/NavBar'

import "./App.css"

export class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 0
    }
    this.changeActiveTab = (id) => {
      this.setState({
        activeTab: id
      });
    };
  }

  render() {
    const tabs = [
      {id: 0, title: "Home"},
      {id: 1, title: "Projects"},
      {id: 2, title: "Pictures"},
      {id: 3, title: "Videos"}
    ];

    return (
      <div className="body">
        <div className="navBar">
          <NavBar tabs={tabs} activeTab={this.state.activeTab} changeActiveTab={this.changeActiveTab}/>
        </div>

        <div className="contentContainer">
          <ContentContainer activeTab={this.state.activeTab}/>
        </div>
      </div>
    );
  }
}

export default App;