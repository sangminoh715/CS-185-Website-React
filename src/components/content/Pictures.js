import React, {Component} from 'react';

import PageHeader from "./PageHeader";

export class Pictures extends Component {
  render() {
    const title = "Pictures";
    const description = "This page features screenshots from a few of my all-time favorite games. Click on the image to view an enlarged version of the image.";

    return (
      <PageHeader tabTitle={title} tabDescription={description}/>
    );
  };
}

export default Pictures;