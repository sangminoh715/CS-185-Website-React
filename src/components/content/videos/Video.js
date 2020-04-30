import React, {Component} from 'react';

export class Video extends Component {
  render() {
    return (
      <div className={"videoContainer" + (this.props.videoContent.last ? " last" : "")}>
        <div className="info">
          <p>
            <i>{this.props.videoContent.title}</i> arranged by <b>{this.props.videoContent.arranger}</b>
          </p>
        </div>

        <div className="video">
          <iframe className="videoLink" src={this.props.videoContent.link} frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullscreen="" title={this.props.videoContent.title}/>
        </div>
      </div>
    );
  }
}

export default Video;