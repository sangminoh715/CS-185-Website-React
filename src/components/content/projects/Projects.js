import React, {Component} from 'react';

import PageHeader from "../PageHeader";
import Project from "./Project";

import "./Projects.css";
import projectImage0 from "../../../images/projects/eternal_flight_logo.png";
import projectImage1 from "../../../images/projects/act_logo.png";

export class Projects extends Component {
  render() {
    const title = "Projects";
    const description = "This page features several projects that I have worked on during my undergraduate studies at the University of California - Santa Barbara. Click on the project logo to go to the project website.";

    const projects = [
      {
        link: "https://sites.google.com/view/eternalflight", 
        image: projectImage0, 
        projectName: "Eternal Flight",
        tagline: "In-Flight Drone Battery Switching"
      },
      {
        link: "https://sites.google.com/view/automatic-calorie-tracker", 
        image: projectImage1, 
        projectName: "Automatic Calorie Tracker",
        tagline: "Nutrition Facts Scanner for Easy Calorie Tracking"
      }
    ];

    return (
      <div>
        <PageHeader tabTitle={title} tabDescription={description}/>
        <div className="projectsContainer">
          {
            projects.map((project) => ( 
              <Project project={project}/>
            ))
          }
        </div>
      </div>
    );
  };
}

export default Projects;