const Benchmark = require('benchmark')
const nameable = require('./src/index')

nameable.config({
    firstKey: 'firstName',
    middleKey: 'middleName',
    lastKey: 'lastName',
})


const suite = new Benchmark.Suite

const person = {
    firstName: 'John',
    middleName: 'Wayne',
    lastName: 'Smithsonian',
}

const formats = [
    'Last, First M.',
    'Last, F M',
    'first middle last',
    'FML',
]

for (const format of formats) {
    suite.add(format, () => nameable.new(person).format(format))
}

suite.on('cycle', e => console.log(String(e.target)))

suite.run()