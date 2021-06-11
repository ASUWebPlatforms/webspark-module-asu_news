import React, { Component } from 'react';
import './D8News.css';
import Fade from 'react-reveal/Fade';

class D8News extends Component {
  render() {
    console.log({oops: this.props.newsItems});
    return (
      <Fade>
        <div className="D8News">
          <div className="container">
              <div className="row row-spaced">
                {this.props.newsItems}
              </div>
          </div>
        </div>
      </Fade>
    );
  }
}

export default D8News;
