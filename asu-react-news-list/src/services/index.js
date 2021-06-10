import axios from 'axios';
import { shortenText } from '../utils';

const newsService = (feedURL) => {
    const finishedList = [];
    let interestsGroup = feedURL.split("&").slice(1, 50)
    //split feedURL as I was getting a bug where if the first interest had no space (e.g. &Generosity) it would refuse to run the app at all. Split and sliced to return original feedURL minus additional interests
    return axios.get(feedURL.split("&").slice(0, 1)).then(response => {
        //Filters through interests property from feed Obj to find matches to tag filters
        //splits interest tags from feed data and compares to tags selected by user, and pushes news articles that match selected tags to the array of displayed articles
        if(interestsGroup.length > 0){

          for (let i = 0; i < response.data.nodes.length; i++){
            if (response.data.nodes[i].node.interests.split("|").some(interest => interestsGroup.includes(interest))){
              finishedList.push({
                nid: response.data.nodes[i].node.nid,
                teaser: shortenText(response.data.nodes[i].node.clas_teaser, 120),
                title: shortenText(response.data.nodes[i].node.title, 30),
                image_url: response.data.nodes[i].node.image_url,
                image_alt: response.data.nodes[i].node.image_alt,
                path: response.data.nodes[i].node.path,
                saf: response.data.nodes[i].node.field_saf,
                interests: response.data.nodes[i].node.interests
              });
            }
          }
          return {
            ourData: finishedList,
            pages: response.data.pager.pages,
            currentPage: response.data.pager.page,
            isLoaded: true,
            callErr: false,
          };
        }
        else {
          return {
            ourData: response.data.nodes,
          };
        }
        }).catch((error) => {
          console.log({error});
            // API call error catching
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw new Error({
                  isLoaded: true,
                  callErr: true,
                  errMsg: 'Server responded with a status code of: ' + error.response.status
                });
    
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                throw new Error({
                  isLoaded: true,
                  callErr: true,
                  errMsg: 'The request was made but no response was received.'
                })
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            //display config info for error
            console.log(error.config);
        });
}


export { newsService };