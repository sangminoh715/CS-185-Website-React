import React, {Component} from 'react';

import PageHeader from "./PageHeader";

export class Home extends Component {
  render() {
    const title="Welcome to My Portfolio";
    const description="";

    return (
      <PageHeader tabTitle={title} tabDescription={description}/>
    );
  }
}

export default Home;