// const [,, ...args] = process.argv
// console.log(args)

const argv = require('yargs').argv

console.log(argv.lang)
console.log(argv.component)