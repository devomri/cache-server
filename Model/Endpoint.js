/**
 * Created by omri on 2/23/17.
 */

class Endpoint {
    constructor(ID, datacenterLatency) {
        this.ID = ID;
        this.datacenterLatency = datacenterLatency;
        this.cacheLatencyList = [];
    }
}

module.exports = Endpoint;
