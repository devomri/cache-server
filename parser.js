let Video = require("./Model/Video");
let Endpoint = require("./Model/Endpoint");
let CacheLatency = require("./Model/CacheLatency");
let Request = require("./Model/Request");
let Cache = require("./Model/Cache");

module.exports = function(input) {
    let videos = [];
    let endpoints = [];
    let requests = [];
    let caches = [];

    let lines = input.split("\n");
    let firstLineData = lines[0].split(" ");
    let videosNumber = firstLineData[0];
    let endpointsNumber = firstLineData[1];
    let requestDescriptorsNumber = firstLineData[2];
    let cahceNumber = firstLineData[3];
    let chacheSize = firstLineData[4];

    let secondLineData = lines[1].split(" ");
    for (let v = 0; v < videosNumber; v++) {
        videos[v] = new Video(v, secondLineData[v]);
    }

    let lineIndex = 1;
    let currLine;
    for (let e = 0; e < endpointsNumber; e++) {
        lineIndex++;
        currLine = lines[lineIndex].split(" ");
        endpoints[e] = new Endpoint(e, currLine[0]);

        let numberOfConnectedCaches = currLine[1];
        let cacheLatencyArray = [];
        for (c = 0; c < numberOfConnectedCaches; c++) {
            lineIndex++;
            currLine = lines[lineIndex].split(" ");
            let cacheId = currLine[0];
            let latency = currLine[1];
            cacheLatencyArray.push(new CacheLatency(cacheId, latency));
        }

        endpoints[e].cacheLatencyList = cacheLatencyArray;
    }

    // Read requests
    for (let r = 0; r < requestDescriptorsNumber; r++){
        lineIndex++;
        currLine = lines[lineIndex].split(" ");
        let videoId = currLine[0];
        let endpointId = currLine[1];
        let requestsNumber = currLine[2];
        requests.push(new Request(videoId, endpointId, requestsNumber));
    }

    for (let c = 0; c < cahceNumber; c++) {
        caches.push(new Cache(c, chacheSize));
    }

    // Create return object
    let requestByVideo = [];
    for(let v = 0; v < videos.length; v++) {
        let currVideoId = videos[v].ID;
        requestByVideo[currVideoId] = [];

        for (r = 0; r < requests.length; r++) {
            if (requests[r].videoID == currVideoId) {
                requestByVideo[currVideoId].push(requests[r])
            }
        }
    }
    
    let endpointsByCache = [];
    for (let c = 0; c < caches.length; c++) {
        let currCacheId = caches[c].ID;
        endpointsByCache[currCacheId] = [];
        
        for (let e = 0; e < endpoints.length; e++) {
            if (endpoints[e].cacheID == currCacheId) {
                endpointsByCache[currCacheId].push(endpoints[e]);
            }
        }
    }
    
    let endpointsByVideo = [];
    for (v = 0; v < videos.length; v++) {
        let currVideoId = videos[v].ID;
        endpointsByVideo[currVideoId] = [];
        
        for (let e = 0; e < endpoints.length; e++) {
            if (endpoints[e].videoID == currVideoId) {
                endpointsByVideo[currVideoId].push(endpoints[e]);
            }
        }
    }

    return {
        requestByVideo,
        endpointsByCache,
        endpointsByVideo,
        videos
    };
};
