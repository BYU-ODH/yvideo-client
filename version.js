// prints the version to the console
import { resolve } from 'path'
const package_root = resolve(__dirname)
const package_json = require(`${package_root}/package.json`)
console.log(package_json.version)