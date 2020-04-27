import React, {Component} from 'react';

export class GameContent extends Component {
  render() {
    return (
      <div className={"gameContent" + (this.props.gameInfo.last ? " last" : "")}>
        <h2>
          {this.props.gameInfo.title}
        </h2>

        <div className="quote">
          <div>
            <p className="text">
              {this.props.gameInfo.quote}
            </p>
            <p className="character">
              {"- " + this.props.gameInfo.quoteCharacter}
            </p>
          </div>
        </div>

        <div className="screenshots">
          {
            this.props.gameInfo.images.map((image) => (
              <img className="screenshot" src={image} alt=""/>
            ))
          }
        </div>
      </div>
    );
  };
}

export default GameContent;