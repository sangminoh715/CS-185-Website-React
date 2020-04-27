import React, {Component} from 'react';

export class Project extends Component {
  render() {
    return (
      <div className="project">
        <div className="projectLink">
          <a href={this.props.project.link}>
            <img class="logo" src={this.props.project.image} alt={this.props.project.projectName + " Logo"}/>
          </a>
        </div>

        <div className="description">
          <p>
            <b>{this.props.project.projectName}</b>
            <br/>
            {this.props.project.tagline}
          </p>
        </div>
      </div>
    );
  };
}

export default Project;