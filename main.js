const fs = require('fs');
const parse = require('./parser');

let wasVideoAdd = false;
let objectsModel = {};

function iterateCaches(sortedCachesForVideo, video) {
  for(let i = 0; i < sortedCachesForVideo.length; i++){
    const cache = sortedCachesForVideo[i];
    if(cache.avaiableCapacity >= video.size) {
      cache.add(video);
      wasVideoAdd = true;
      break;
    }
  }
}

function sortCachesForVideo(cachesForVideo) {
  return objectsModel.caches.reduce((caches, cache) => {
    if(cachesForVideo[cache.ID]){
      caches.push(cache);
    }
    return caches;
  }, []).sort((cacheA, cacheB) => {
    return objectsModel.endpointsByCache[cacheA.ID].length - objectsModel.endpointsByCache[cacheB.ID].length;
  });
}

function iterateVideos(){
  objectsModel.sortedVideos.forEach((video) => {
    const cachesForVideo = objectsModel.endpointsByVideo[video.ID].reduce((caches, endpoint) => {
      endpoint.cacheLatencyList.forEach(c => {
        caches[c.cacheID] = true;
      });
      return caches;
    }, {});

    const sortedCachesForVideo = sortCachesForVideo(cachesForVideo);
    iterateCaches(sortedCachesForVideo, video);
  });
}

function Main() {
  fs.readFile('./DataAccess/Data/kittens.in', 'utf-8', (err, input) => {
    objectsModel = parse(input);

    objectsModel.sortedVideos = new Array(...objectsModel.videos).sort((videoA, videoB) => {
      const videoATotalRequests = (objectsModel.requestByVideo[videoA.ID] || []).reduce((total, request) => request.iterations + total, 0);
      const videoBTotalRequests = (objectsModel.requestByVideo[videoB.ID] || []).reduce((total, request) => request.iterations + total, 0);
      return videoATotalRequests - videoBTotalRequests;
    });

    while (true) {
      wasVideoAdd = false;
      iterateVideos();

      if(!wasVideoAdd) {
        break;
      }
    }


    const cacheCount = objectsModel.caches.reduce((caches, cache) => {
      if(cache.videos.length === 0){
        return caches;
      }
      return caches + 1;

    }, 0);

    let data = cacheCount + "\n";

    objectsModel.caches.forEach((cache) => {
      if(cache.videos.length !== 0){
        data += cache.ID + " " + cache.videos.map((video) => video.ID).join(" ") + "\n";
      }
    });

    fs.writeFile("./ouput.txt", data, () => {
      console.log("done");
    })
  })

}

Main();