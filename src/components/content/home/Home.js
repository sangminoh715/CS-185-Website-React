import React, {Component} from 'react';

import PageHeader from "../PageHeader";

import "./Home.css";
import picture from "../../../images/home/sangminoh.png";

export class Home extends Component {
  render() {
    const title = "Welcome to My Portfolio";
    const description = "";

    return (
      <div>
        <PageHeader tabTitle={title} tabDescription={description}/>
        <div className="pageContent">
          <img className="picture" src={picture} alt="Sang Min Oh"/>
          <div className="aboutMe">
            <p>
              <b>About Me</b>
              <br/><br/>
              My name is Sang Min Oh and I am currently a Masters student in the Electrical and Computer Engineering department at the University of California - Santa Barbara. My major focus is in Computer Architecture and my minor focus is in Networking/Distributed Systems.
              <br/><br/>
              This is my portfolio for CS 185 (Spring 2020).
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;