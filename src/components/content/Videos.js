import React, {Component} from 'react';

import PageHeader from "./PageHeader";

export class Videos extends Component {
  render() {
    const title="Videos";
    const description="This page features some YouTube videos of songs that I am trying to learn on the piano.";

    return (
      <PageHeader tabTitle={title} tabDescription={description}/>
    );
  };
}

export default Videos;