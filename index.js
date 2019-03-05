const Name = require('./Name')

module.exports = {
    config(config) {
        this.firstKey = config.firstKey
        this.middleKey = config.middleKey
        this.lastKey = config.lastKey
    },
    
    new(nameable) {
        if ([this.firstKey, this.middleKey, this.lastKey].includes(undefined)) {
            throw Error('you must first set config before creating a new name')
        }
        return new Name(
            nameable[this.firstKey],
            nameable[this.middleKey],
            nameable[this.lastKey],
        )
    },
}
