var dependencyMap = require('../dependencymap')
var packageVersionMap = require('../packageversionmap')

function reduceField(requirements, fieldName, callback, initial) {
  return requirements.reduce(function (memo, item) {
    var def = dependencyMap[item]
    var entry = def[fieldName]
    if (entry) return callback(memo, entry)
    return memo
  }, initial)
}

function addDependencies(memo, dependencies) {
  dependencies.forEach(function (dependency) {
    memo[dependency] = packageVersionMap[dependency]
  })
  return memo
}

class ConfigBuilder {
  constructor (generator) {
    this.requirements = []
    this.generator = generator
  }

  addRequirement(requirement) {
    if (this.requirements.indexOf(requirement) === -1) this.requirements.push(requirement)
  }

  savePackageFile() {
    var fileContents = this.generator.fs.readJSON(this.generator.templatePath('package.json'))
    var dependencies = reduceField(this.requirements, 'dependencies', addDependencies, {})
    var devDependencies = reduceField(this.requirements, 'devDependencies', addDependencies, {})
    Object.assign(fileContents.dependencies, dependencies)
    Object.assign(fileContents.devDependencies, devDependencies)
    this.generator.fs.writeJSON(this.generator.destinationPath('package.json'), fileContents)
  }

  saveWebpackConfigFile() {
    var loadersDef = reduceField(this.requirements, 'loaders', function (memo, loaders) {
      loaders.forEach(function (item) {
        if (item.body) memo.body += ',' + item.body
        if (item.require) memo.require += ',' + item.require
      })
      return memo
    }, {require: '', body: ''})


    this.generator.fs.copyTpl(
      this.generator.templatePath('webpack.config.js'),
      this.generator.destinationPath('webpack.config.js'),
      {loaderBody: loadersDef.body, require: loadersDef.require}
    )
  }
}

module.exports = ConfigBuilder