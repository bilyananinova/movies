let id = require('uniqid');

class Movie {
    constructor(title, description, img) {
        this.title = title,
        this.description = description,
        this.img = img
        this.id = id()
    }
}

module.exports = {
    Movie
}