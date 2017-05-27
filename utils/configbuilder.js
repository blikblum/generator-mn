var dependencyMap = require('../dependencymap.js')

function getDependencies(requirements, fieldName) {
  return requirements.reduce(function (memo, item) {
    var def = dependencyMap[item]
    var dependencies
    if (dependencies = def[fieldName]) {
      dependencies.forEach(function (dependency) {
        memo[dependency.name] = dependency.version
      })
    }
    return memo
  }, {})
}

class ConfigBuilder {
  constructor (generator) {
    this.requirements = []
    this.generator = generator
  }

  addRequirement(requirement) {
    if (this.requirements.indexOf(requirement) === -1) this.dependencies.push(requirement)
  }

  savePackageFile() {
    var fileContents = this.generator.fs.readJSON(this.generator.templatePath('package.json'))
    var dependencies = getDependencies(this.requirements, 'dependencies')
    var devDependencies = getDependencies(this.requirements, 'devDependencies')
    Object.assign(fileContents.dependencies, dependencies)
    Object.assign(fileContents.devDependencies, devDependencies)
    this.generator.fs.writeJSON(this.generator.destinationPath('package.json'), fileContents)
  }

  saveWebpackConfigFile() {
    var template = this.generator.fs.read(this.templatePath('webpack.config.js'))


  }
}

module.exports = ConfigBuilder