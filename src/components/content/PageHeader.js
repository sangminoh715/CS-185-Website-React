import React, {Component} from 'react';

import "./PageHeader.css";

export class PageHeader extends Component {
  render() {
    return (
      <div className="pageTitle">
        <h1>
          {this.props.tabTitle}
        </h1>

        <div className="pageDescription">
          <div>
            <p>
              {this.props.tabDescription}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default PageHeader;