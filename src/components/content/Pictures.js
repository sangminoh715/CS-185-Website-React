import React, {Component} from 'react';

import GameContent from "./GameContent";
import PageHeader from "./PageHeader";

import "./Pictures.css";
import hk0 from "../../images/pictures/hollowknight1.jpg";
import hk1 from "../../images/pictures/hollowknight2.jpg";
import hk2 from "../../images/pictures/hollowknight3.jpg";
import cel0 from "../../images/pictures/celeste1.jpg";
import cel1 from "../../images/pictures/celeste2.jpg";
import cel2 from "../../images/pictures/celeste3.png";
import cel3 from "../../images/pictures/celeste4.png";
import ori0 from "../../images/pictures/ori1.jpg";
import ori1 from "../../images/pictures/ori2.jpg";
import ori2 from "../../images/pictures/ori3.jpg";
import ori3 from "../../images/pictures/ori4.jpg";

export class Pictures extends Component {
  render() {
    const title = "Pictures";
    const description = "This page features screenshots from a few of my all-time favorite games. Click on the image to view an enlarged version of the image.";

    const games = [
      {
        title: "Hollow Knight",
        quote: "Precept Twenty-Seven: 'Eat As Much As You Can'. When having a meal, eat as much as you possibly can. This gives you extra energy, and means you can eat less frequently.",
        quoteCharacter: "Zote the Mighty",
        images: [hk0, hk1, hk2],
        last: false
      },
      {
        title: "Celeste",
        quote: "If this is all coming from inside me, why does it want to hurt me? I'm a trespasser in my own world.",
        quoteCharacter: "Madeline",
        images: [cel0, cel1, cel2, cel3],
        last: false
      },
      {
        title: "Ori and the Blind Forest",
        quote: "Though they are gone from our forest, there is no time to grieve... Remember those who have passed and they will forever live on.",
        quoteCharacter: "Sein",
        images: [ori0, ori1, ori2, ori3],
        last: true
      }
    ];

    return (
      <div>
        <PageHeader tabTitle={title} tabDescription={description}/>
        <div className="picturesContainer">
          {
            games.map((game) => (
              <GameContent gameInfo={game}/>
            ))
          }
        </div>
      </div>
    );
  };
}

export default Pictures;