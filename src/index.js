const Name = require('./Name')

module.exports = {
    config(config) {
        this.firstKey = config.firstKey
        this.middleKey = config.middleKey
        this.lastKey = config.lastKey
    },
    
    new(nameable) {
        return new Name(
            nameable[this.firstKey],
            nameable[this.middleKey],
            nameable[this.lastKey],
        )
    },
}
