# Nameable [![Build Status](https://travis-ci.com/twharmon/nameable.svg?branch=master)](https://travis-ci.com/twharmon/nameable)
Format and truncate names of people.

## Getting Started
`npm install --save nameable`

## Setup
Set the configuration for the whole project.

```
const nameable = require('nameable')

nameable.config({
    firstKey: 'firstName',
    middleKey: 'middleName',
    lastKey: 'lastName',
})
```

## Usage
```
const nameable = require('nameable')

const person = {
    firstName: 'John',
    middleName: 'Wayne',
    lastName: 'Smith',
}

const name = nameable.new(person)

console.log(name.format('Last, First M.')) // Smith, John W.
```
