const path = require('path')

module.exports = {
  templates: `${__dirname}/_templates`,
  helpers: {
    relativePath: (from, to) => path.relative(from, to),
    rootDir: ()=> __dirname
  }
}