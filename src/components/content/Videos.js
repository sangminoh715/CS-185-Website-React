import React, {Component} from 'react';

import PageHeader from "./PageHeader";
import Video from "./Video";

import "./Videos.css";

export class Videos extends Component {
  render() {
    const title = "Videos";
    const description = "This page features some YouTube videos of songs that I am trying to learn on the piano.";

    const videos = [
      {
        title: "My Dearest",
        arranger: "Animenz Piano Sheets",
        link: "https://www.youtube.com/embed/Pi8xsZXibIc",
        last: false
      },
      {
        title: "Phantasmal Woods",
        arranger: "Poma",
        link: "https://www.youtube.com/embed/a8QNP4UYE-k",
        last: false
      },
      {
        title: "Hopes & Dreams / His Theme",
        arranger: "Zeyun Music",
        link: "https://www.youtube.com/embed/SG8s6_vRYew",
        last: true
      }
    ];

    return (
      <div>
        <PageHeader tabTitle={title} tabDescription={description}/>
        <div className="videosContainer">
          {
            videos.map((video) => (
              <Video videoContent={video}/>
            ))
          }
        </div>
      </div>
    );
  };
}

export default Videos;