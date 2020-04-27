import React, {Component} from 'react';

import "./Tab.css";

export class Tab extends Component {
  constructor() {
    super();
    this.state = {
      isHovering: false,
      cursor: "default"
    };
  }

  highlightCurrentTab = () => {
    if(this.props.tab.id === this.props.activeTab) {
      return {
        backgroundColor: "#23272B",
        border: "1px solid black",
        cursor: this.state.cursor
      };
    } else {
      return (
        this.state.isHovering ? ({
          backgroundColor: "#31313B",
          border: "1px solid black",
          cursor: this.state.cursor
        }) : ({
          backgroundColor: "#343A40",
          border: "1px solid #343A40",
          cursor: this.state.cursor
        }));
    }
  };

  mouseEnter = () => {
    this.setState({
      isHovering: true,
      cursor: "pointer"
    });
  }

  mouseLeave = () => {
    this.setState({
      isHovering: false,
      cursor: "default"
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