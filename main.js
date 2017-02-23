/**
 * Created by omri on 2/23/17.
 */

function iterateCaches() {
  // try to put the video on that cache
  // update the cache server and move on to the next video
  // mark a video that was added in this iteration
}

function sortCachesForVideo() {
  // sort all the distinct caches according to the most common accessible cache from all the endpoints
}

function iterateVideos(){
  // for each video
  // take all the endpoints that request it.
  sortCachesForVideo();
  iterateCaches();
}

function Main() {
  var wasVideoAdd = false;
  while (true) {

    iterateVideos();

    if(!wasVideoAdd) {
      break;
    }
  }
}

Main();