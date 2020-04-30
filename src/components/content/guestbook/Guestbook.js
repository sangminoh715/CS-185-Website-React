import React, {Component} from "react";

import FirebaseConfig from "../../config/FirebaseConfig";
import Form from "./Form";
import MessageCard from "./MessageCard";
import PageHeader from "../PageHeader";

import "./Guestbook.css";

const Firebase = require("firebase");

export class Guestbook extends Component {
  constructor() {
    super();

    this.state = {

    };

    this.addToGuestbook = (message) => {

    };
  }

  getMessages = () => {
    return "f";
  }

  render() {
    const title = "Guestbook";
    const description = "Let me know that you have stopped by!";

    return (
      <div>
        <PageHeader tabTitle={title} tabDescription={description}/>
        <div className="guestbookContainer">
          <div className="guestbookForm">
            <Form onSubmit={this.addToGuestbook}/>
          </div>
          <div className="guestbookMessages">
            {this.getMessages()}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if(!Firebase.apps.length) {
      Firebase.initializeApp(FirebaseConfig);
    }
  }
}

export default Guestbook;