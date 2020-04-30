import React, {Component} from "react";

import "./Form.css";

export class Form extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      bio: "",
      message: "",
      visibility: "Private",
      email: ""
    };
  }

  onChange = (event) => {
    const updatedState = this.state;
    updatedState[event.target.id] = event.target.value;
    this.setState(updatedState);
  }

  onReset = (event) => {
    event.preventDefault();

    this.setState({
      name: "",
      bio: "",
      message: "",
      visibility: "Private",
      email: ""
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    if(this.state.name.length === 0) {
      alert("[Error] Name is a required field");
    } else if(this.state.name.length < 6) {
      alert("[Error] Name must be greater than 5 characters");
    } else if(this.state.message.length === 0) {
      alert("[Error] Message is a required field");
    } else if(this.state.message.length < 16) {
      alert("[Error] Message must be greater than 15 characters");
    } else {
      const formToSubmit = this.state;
      const currentDate = new Date();
      formToSubmit["date"] = currentDate.toLocaleString();
      this.props.addToGuestbook(formToSubmit);

      alert("[Success] Your form was received");
    }
  }

  render() {
    return (
      <div>
        <p>
          * <i>Indicates a required field</i>
          <br/>
          <br/>
        </p>

        <form>
          <label>
            <b>Name *</b>
            <br/>
            <input className="formField" type="text" id="name" value={this.state.name} maxLength="20" onChange={this.onChange}/>
          </label>
          <br/>

          <label>
            <b>Description</b>
            <br/>
            <input className="formField" type="text" id="bio" value={this.state.bio} maxLength="100" onChange={this.onChange}/>
          </label>
          <br/>

          <label>
            <b>Message *</b>
            <br/>
            <input className="formField" type="text" id="message" value={this.state.message} maxLength="500" onChange={this.onChange}/>
          </label>
          <br/>

          <label>
            <b>Visibility *</b>
            <br/>
            <select className="formField" id="visibility" value={this.state.visibility} onChange={this.onChange}>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </label>
          <br/>

          <label>
            <b>Email</b>
            <br/>
            <input className="formField" type="text" id="email" value={this.state.email} onChange={this.onChange}/>
          </label>
          <br/>

          <button className="formButton submitButton" onClick={this.onSubmit}>Submit</button>
          <button className="formButton resetButton" onClick={this.onReset}>Reset</button>
        </form>
      </div>
    );
  }
}

export default Form;