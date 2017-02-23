var Video = require("./Model/Video");
var Endpoint = require("./Model/Endpoint");
var CacheLatency = require("./Model/CacheLatency");

module.exports = function(input) {
    var videos = [];
    var endpoints = [];

    var lines = input.split("\n");
    var firstLineData = lines[0].split(" ");
    var videosNumber = firstLineData[0];
    var endpointsNumber = firstLineData[1];
    var requestDescriptors = firstLineData[2];
    var cahceNumber = firstLineData[3];
    var chacheSize = firstLineData[4];

    var secondLineData = lines[1].split(" ");
    for (v = 0; v < videosNumber; v++) {
        videos[0] = new Video(v, secondLineData[v]);
    }

    var lineIndex = 2;
    for (e = 0; e < endpointsNumber; e++) {
        var currLine = lines[lineIndex].split(" ");
        endpoints[e] = new Endpoint(e, currLine[0]);

        var numberOfConnectedCaches = currLine[1];
        var cacheLatencyArray = [];
        for (c = 0; c < numberOfConnectedCaches; c++) {
            lineIndex++;
            currLine = lines[lineIndex].split(" ");
            var cacheId = currLine[0];
            var latency = currLine[1];
            cacheLatencyArray.push(CacheLatency(cacheId, latency));
        }
    }


    console.log("End Parse");
  // return an object containing all the object models.
};
