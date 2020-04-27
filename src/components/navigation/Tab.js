import React, {Component} from 'react';

import "./Tab.css";

export class Tab extends Component {
  constructor() {
    super();
    this.state = {
      isHovering: false
    };
  }

  highlightCurrentTab = () => {
    if(this.props.tab.id === this.props.activeTab) {
      return {
        backgroundColor: "#23272B",
        border: "1px solid black"
      };
    } else {
      return (this.state.isHovering ? ({
          backgroundColor: "#31313B",
          border: "1px solid black"
        }) : ({
          backgroundColor: "#343A40",
          border: "1px solid #343A40"
        }));
    }
  };

  mouseEnter = () => {
    this.setState({
      isHovering: true
    });
  }

  mouseLeave = () => {
    this.setState({
      isHovering: false
    });
  }

  render() {
    return (
      <div className="tab" style={this.highlightCurrentTab()} onClick={this.props.changeActiveTab.bind(this, this.props.tab.id)} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        {this.props.tab.title}
      </div>
    );
  }
}

export default Tab;