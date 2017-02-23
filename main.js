const fs = require('fs');
const parse = require('./parser');

let wasVideoAdd = false;
let objectsModel = {};

function iterateCaches(sortedCachesForVideo) {
  // try to put the video on that cache
  // update the cache server and move on to the next video
  // mark a video that was added in this iteration
}

function sortCachesForVideo(cachesForVideo) {
  // sort all the distinct caches according to the most common accessible cache from all the endpoints
}

function iterateVideos(){
  objectsModel.sortedVideos.forEach((video) => {
    const cachesForVideo = Object.keys(objectsModel.endpointsByVideo[video.id].reduce((caches, endpoint) => {
      endpoint.cacheLatencyList.forEach(c => caches[c.cacheID]);
      return caches;
    }, {}));

    const sortedCachesForVideo = sortCachesForVideo(cachesForVideo);
    iterateCaches(sortedCachesForVideo);

  });
}

function Main() {
  fs.readFile('./DataAccess/Data/kittens.in', 'utf-8', (err, input) => {
    objectsModel = parse(input);

    objectsModel.sortedVideos = objectsModel.videoes.sort((videoA, videoB) => {
      const videoATotalRequests = objectsModel.requestsByVideo[videoA.ID].reduce((total, request) => request.iterations + total, 0);
      const videoBTotalRequests = objectsModel.requestsByVideo[videoB.ID].reduce((total, request) => request.iterations + total, 0);
      return videoATotalRequests - videoBTotalRequests;
    });

    while (true) {

      iterateVideos();

      if(!wasVideoAdd) {
        break;
      }
    }
  })

}

Main();