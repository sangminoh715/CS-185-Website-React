import React, {Component} from 'react';

import Tab from "./Tab";

export class NavBar extends Component {
  render() {
    return this.props.tabs.map((tab) => (
      <Tab tab={tab} activeTab={this.props.activeTab} changeActiveTab={this.props.changeActiveTab}/>
    ));
  }
}

export default NavBar;