# Nameable

```
const nameable = require('nameable')

nameable.config({
    firstKey: 'first',
    middleKey: 'middle',
    lastKey: 'last',
})

const person = {
    first: 'John',
    middle: 'Wayne',
    last: 'Smith',
}

const name = nameable.new(person)

console.log(name.format('Last, First M.')) // Smith, John W.
```