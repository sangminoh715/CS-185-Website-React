import React, {Component} from 'react';

import GameContent from "./GameContent";
import PageHeader from "../PageHeader";

import "./Pictures.css";

export class Pictures extends Component {
  render() {
    const title = "Pictures";
    const description = "This page features screenshots from a few of my all-time favorite games. Click on the image to view an enlarged version of the image.";

    const games = [
      {
        title: "Hollow Knight",
        quote: "Precept Twenty-Seven: 'Eat As Much As You Can'. When having a meal, eat as much as you possibly can. This gives you extra energy, and means you can eat less frequently.",
        quoteCharacter: "Zote the Mighty",
        imageIds: [0, 1, 2],
        last: false
      },
      {
        title: "Celeste",
        quote: "If this is all coming from inside me, why does it want to hurt me? I'm a trespasser in my own world.",
        quoteCharacter: "Madeline",
        imageIds: [3, 4, 5, 6],
        last: false
      },
      {
        title: "Ori and the Blind Forest",
        quote: "Though they are gone from our forest, there is no time to grieve... Remember those who have passed and they will forever live on.",
        quoteCharacter: "Sein",
        imageIds: [7, 8, 9, 10],
        last: true
      }
    ];

    return (
      <div>
        <PageHeader tabTitle={title} tabDescription={description}/>
        <div className="picturesContainer">
          {
            games.map((game) => (
              <GameContent gameInfo={game} useLargeViewer={this.props.useLargeViewer}/>
            ))
          }
        </div>
      </div>
    );
  };
}

export default Pictures;