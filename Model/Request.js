/**
 * Created by omri on 2/23/17.
 */

class Request {
    constructor(videoID, endpointID, iterations) {
        this.videoID = videoID;
        this.endpointID = endpointID;
        this.iterations = iterations;
    }
}

module.exports = Request;