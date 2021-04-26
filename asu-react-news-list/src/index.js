import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import D8News from './D8News';

let appRoots = document.getElementsByClassName('clas-news-react-base');

for (let element of appRoots) {
  ReactDOM.render(<D8News dataFromPage={element.dataset} />, element);
}

var pageCount = 0;

function hasReachedBottom() {
  return ( (window.innerHeight + window.scrollY) >= document.body.offsetHeight );
}

window.onscroll = function() {
  if ( hasReachedBottom() && document.getElementsByClassName('loader').length == 0 ) {
    pageCount++;
    var nextPage = document.getElementById('clas-news-react-more-'+pageCount+'');
    if(nextPage != null) {
      ReactDOM.render(<D8News dataFromPage={nextPage.dataset} />, nextPage);
    }

  }
}
