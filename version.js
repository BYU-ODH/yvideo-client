// prints the version to the console
const path = require('path')
const package_root = path.resolve(__dirname) 
const package_json = require(`${package_root}/package.json`)
console.log(package_json.version)

