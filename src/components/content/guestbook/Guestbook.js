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
      messages: []
    };

    this.addToGuestbook = (filledForm) => {
      Firebase.database().ref("data").push().set(filledForm);
    };
  }

  createCardForMessage = (message) => {
    return (
      <div>{message.date}</div>
    );
  }

  render() {
    const title = "Guestbook";
    const description = "Let me know that you have stopped by!";

    return (
      <div>
        <PageHeader tabTitle={title} tabDescription={description}/>
        <div className="guestbookContainer">
          <div className="guestbookForm">
            <Form addToGuestbook={this.addToGuestbook}/>
          </div>
          <div className="guestbookMessages">
            {
              this.state.messages.map((message) => {
                return this.createCardForMessage(message);
              })
            }
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if(!Firebase.apps.length) {
      Firebase.initializeApp(FirebaseConfig);
    }

    Firebase.database().ref("data").on("value", (snapshot) => {
      const receivedValue = snapshot.val();
      this.setState({
        messages: Object.values(receivedValue)
      });
    });
  }
}

export default Guestbook;