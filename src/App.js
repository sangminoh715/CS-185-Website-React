import React, {Component} from 'react';

import Content from './components/Content'
import NavBar from './components/NavBar'

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

        <div className="content">
          <Content/>
        </div>
      </div>
    );
  }
}

export default App;