import React, { Component } from 'react';
import D8News from './D8News';
import { BaseCarousel } from "./BaseCarousel/BaseCarousel";
import { newsService } from './services';
import Loader from 'react-loader-spinner';
import Fade from 'react-reveal/Fade';
import { formatAsCarouselCard, formatAsCard, formatAsCardRow } from './cardFormatters';
import PropTypes from "prop-types";
class NewsDisplay extends Component {

  state = {
    ourData: [],
    pages: 0,
    currentPage: 0,
    isLoaded: false,
    callErr: true,
    errMsg: ''
  };

  componentDidMount() {
    const res = newsService(this.props.data.feed + this.props.data.feedSection).then((feedData) => {
      this.setState({
        ourData: feedData.ourData,
        pages: feedData.pages,
        currentPage: feedData.currentPage,
        isLoaded: feedData.isLoaded,
        callErr: feedData.callErr,
      });
    }).catch((error) => {
      this.setState({
        isLoaded: error.isLoaded,
        callErr: error.callErr,
        errMsg: error.errMsg
      })
    });
    
    
  }

  render() {
    if ( !this.state.isLoaded ) {
      return(
        <div className="loader">
          <Loader
  	       type="ThreeDots"
    	     color="#5C6670"
    	     height="100"
    	     width="100"
      	  />
        </div>
      )
    }
    else if (this.state.callErr) {
      return(
        <Fade>
          <div className="errorContainer">
            <h3 className="errorTitle">Oops! Looks like the ASU Now News Feed could not be loaded.</h3>
            <p className="errorCode">{this.state.errMsg}</p>
          </div>
        </Fade>
      )
    }
    else {
      let newsItems = [...this.state.ourData];
      if(this.props.data.items){
        newsItems = newsItems.slice(0, parseInt(this.props.data.items));
      }
      if(this.props.data.view === "Carousel"){
        return (<BaseCarousel carouselItems={newsItems.map(formatAsCarouselCard)} perView="3" width="1400px" />);
      }
      else if(this.props.data.view === "Cards"){
        return (<D8News newsItems={newsItems.map(formatAsCard)} />)        
      }
      else if(this.props.data.view === "Horizontal"){
        return (<D8News newsItems={newsItems.map(formatAsCardRow)} />)
      }
      else {
        return (<div>data-view must be specified</div>);
      }
    }
  }
}

NewsDisplay.propTypes = {
  data: PropTypes.object.isRequired,
};

export default NewsDisplay;