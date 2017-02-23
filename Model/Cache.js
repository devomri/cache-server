/**
 * Created by omri on 2/23/17.
 */

class Cache {
    constructor(ID, capacity) {
        this.ID = ID;
        this.capacity = capacity;
        this.avaiableCapacity = capacity;
    }

    add(video) {
        this.avaiableCapacity -= video.size;
        this.videos = this.videos || [];
        this.videos.push(video);
    }
}

module.exports = Cache;