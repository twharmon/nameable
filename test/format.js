const expect = require('chai').expect
const nameable = require('../src/index')


describe('format()', () => {
    let person = {
        ignored: 5,
        firstName: 'John',
        middleName: 'Wayne',
        lastName: 'Smith',
    }

    let noMiddleName = {
        firstName: 'John',
        lastName: 'Smith',
    }

    let onlyLastName = { lastName: 'Smith' }

    let longName = {
        firstName: 'John',
        middleName: 'Wayne',
        lastName: 'Washington',
    }

    it('should correctly format name', () => {
        const name = nameable.new(person)
        expect(name.format('Last, First M.')).to.be.equal('Smith, John W.')
    })

    it('should correctly format uppercase name', () => {
        const name = nameable.new(person)
        expect(name.format('Last FIRST Middle')).to.be.equal('Smith JOHN Wayne')
    })

    it('should correctly format lowercase name', () => {
        const name = nameable.new(person)
        expect(name.format('Last first m')).to.be.equal('Smith john w')
    })

    it('should correctly format initials without spaces', () => {
        const name = nameable.new(person)
        expect(name.format('FML')).to.be.equal('JWS')
    })

    it('should leave extra charachers in place', () => {
        const name = nameable.new(person)
        expect(name.format('Last (First:M)')).to.be.equal('Smith (John:W)')
    })

    it('should correctly handle null names at front', () => {
        const name = nameable.new(noMiddleName)
        expect(name.format('Middle First Last')).to.be.equal('John Smith')
        expect(name.format('Middle, First, Last')).to.be.equal('John, Smith')
        expect(name.format('Middle F. Last')).to.be.equal('J. Smith')
        expect(name.format('Middle F Last')).to.be.equal('J Smith')
    })

    it('should correctly handle null names in middle', () => {
        const name = nameable.new(noMiddleName)
        expect(name.format('First Middle Last')).to.be.equal('John Smith')
        expect(name.format('First Middle, Last')).to.be.equal('John Smith')
        expect(name.format('First M. Last')).to.be.equal('John Smith')
        expect(name.format('First M Last')).to.be.equal('John Smith')
    })

    it('should correctly handle null names at end', () => {
        const name = nameable.new(noMiddleName)
        expect(name.format('First Last Middle')).to.be.equal('John Smith')
        expect(name.format('First Last, Middle')).to.be.equal('John Smith')
        expect(name.format('First Last M.')).to.be.equal('John Smith')
        expect(name.format('First Last M')).to.be.equal('John Smith')
    })

    it('should correctly handle two null names at front', () => {
        const name = nameable.new(onlyLastName)
        expect(name.format('Middle First Last')).to.be.equal('Smith')
        expect(name.format('Middle, First, Last')).to.be.equal('Smith')
        expect(name.format('Middle F. Last')).to.be.equal('Smith')
        expect(name.format('Middle F Last')).to.be.equal('Smith')
    })

    it('should correctly handle two null names at end', () => {
        const name = nameable.new(onlyLastName)
        expect(name.format('Last, Middle First')).to.be.equal('Smith')
        expect(name.format('Last Middle, First')).to.be.equal('Smith')
        expect(name.format('Last M. F.')).to.be.equal('Smith')
        expect(name.format('Last M F')).to.be.equal('Smith')
    })

    it('should correctly handle a null name at end and at end', () => {
        const name = nameable.new(onlyLastName)
        expect(name.format('Middle, Last First')).to.be.equal('Smith')
        expect(name.format('Middle Last, First')).to.be.equal('Smith')
        expect(name.format('M. L. F.')).to.be.equal('S.')
        expect(name.format('M L F')).to.be.equal('S')
    })

    it('should correctly completely null name', () => {
        const name = nameable.new({})
        expect(name.format('Middle, Last First')).to.be.equal('')
        expect(name.format('Middle Last, First')).to.be.equal('')
        expect(name.format('M. L. F.')).to.be.equal('')
        expect(name.format('M L F')).to.be.equal('')
    })

    it('should correctly truncate name', () => {
        const name = nameable.new(longName)
        expect(name.format('Last, First M.', 8)).to.be.equal('Washi..., John W.')
    })

    it('should correctly truncate name with custom truncation', () => {
        const name = nameable.new(longName)
        expect(name.format('Last, First M.', 8, '.')).to.be.equal('Washing., John W.')
    })

    it('should throw if nothing passed to new()', () => {
        let error = null
        try {
            nameable.new()
        } catch(err) {
            error = err
        }
        expect(error).not.to.be.null
    })

    it('should throw if format not string', () => {
        const name = nameable.new(longName)
        let error = null
        try {
            name.format({ random: 'value' }, 3)
        } catch(err) {
            error = err
        }
        expect(error).not.to.be.null
    })

    it('should throw if maxLength <= truncation.length', () => {
        const name = nameable.new(longName)
        let error = null
        try {
            name.format('Last, First M.', 3)
        } catch(err) {
            error = err
        }
        expect(error).not.to.be.null
    })
})