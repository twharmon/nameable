const expect = require('chai').expect
const nameable = require('../src/index')

describe('new()', () => {
    it('should correctly create new name', () => {
        const person = {
            id: 5,
            firstName: 'John',
            middleName: 'Wayne',
            lastName: 'Smith',
        }

        const name = nameable.new(person)
    
        expect(name.first).to.be.equal('John')
        expect(name.middle).to.be.equal('Wayne')
        expect(name.last).to.be.equal('Smith')
    })
})