const rules = [
    { format: 'First', replaceKey: 'first' },
    { format: 'Middle', replaceKey: 'middle' },
    { format: 'Last', replaceKey: 'last' },

    { format: 'FIRST', replaceKey: 'first', transform: s => s.toUpperCase() },
    { format: 'MIDDLE', replaceKey: 'middle', transform: s => s.toUpperCase() },
    { format: 'LAST', replaceKey: 'last', transform: s => s.toUpperCase() },

    { format: 'first', replaceKey: 'first', transform: s => s.toLowerCase() },
    { format: 'middle', replaceKey: 'middle', transform: s => s.toLowerCase() },
    { format: 'last', replaceKey: 'last', transform: s => s.toLowerCase() },

    { format: 'F', replaceKey: 'first', transform: s => s.slice(0, 1) },
    { format: 'M', replaceKey: 'middle', transform: s => s.slice(0, 1) },
    { format: 'L', replaceKey: 'last', transform: s => s.slice(0, 1) },

    { format: 'f', replaceKey: 'first', transform: s => s.slice(0, 1).toLowerCase() },
    { format: 'm', replaceKey: 'middle', transform: s => s.slice(0, 1).toLowerCase() },
    { format: 'l', replaceKey: 'last', transform: s => s.slice(0, 1).toLowerCase() },
]

const wordBoundaryRegex = new RegExp(/\b/)
const initialPunctRegex = new RegExp(/^[\.,]/)
const postSpacePunctRegex = new RegExp(/ [\.,]/, 'g')
const multiSpaceRegex = new RegExp(/\s\s+/, 'g')
const finalCommaRegex = new RegExp(/,$/)

class Name {
    constructor(first, middle, last) {
        this.first = first
        this.middle = middle
        this.last = last
    }

    /**
     * Format the name into a string
     * @param {string} format How to format the name (Eg. Last, First M.)
     * @param {number} maxLength The maximum length of each the first, middle, and last names
     * @param {string} truncation String used at end of name if truncated
     */
    format(format = 'First Middle Last', maxLength = 1e2, truncation = '...') {
        if (typeof format !== 'string') {
            throw Error('format must be string')
        }
        if (maxLength <= truncation.length) {
            throw Error('maxLength must be greater than truncation.length')
        }
        
        let name = ''
        while (format.length > 0) {
            let found = false
            for (const rule of rules) {
                if (format.slice(0, rule.format.length) === rule.format) {
                    if (this[rule.replaceKey]) {
                        let next = this[rule.replaceKey]
                        if (rule.transform) {
                            next = rule.transform(next)
                        }
                        name += next
                    }
                    format = format.slice(rule.format.length)
                    found = true
                    break
                }
            }
            if (found !== true) {
                name += format.slice(0, 1)
                format = format.slice(1)
            }
        }

        for (const part of name.split(wordBoundaryRegex)) {
            if (part.length > maxLength) {
                name = name.replace(part, part.slice(0, maxLength - truncation.length) + truncation)
            }
        }
        
        return name
            .replace(initialPunctRegex, '')
            .replace(postSpacePunctRegex, '')
            .replace(multiSpaceRegex, ' ')
            .trim()
            .replace(finalCommaRegex, '')
    }
}

module.exports = Name
