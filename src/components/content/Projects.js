import React, {Component} from 'react';

import PageHeader from "./PageHeader";

export class Projects extends Component {
  render() {
    const title="Projects";
    const description="This page features several projects that I have worked on during my undergraduate studies at the University of California - Santa Barbara. Click on the project logo to go to the project website.";

    return (
      <PageHeader tabTitle={title} tabDescription={description}/>
    );
  };
}

export default Projects;