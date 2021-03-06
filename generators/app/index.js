'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const path = require('path')
const yosay = require('yosay')
const commandExists = require('command-exists')
const ConfigBuilder = require('../../utils/configbuilder')
const rendererMap = require('../../renderermap')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)
    this.DEVMODE = this.fs.exists(path.join(this.sourceRoot(), '..', '..', '..', 'yarn.lock'))
    this.builder = new ConfigBuilder(this)
  }
  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.red('generator-mn') + '. A generator for modern Marionette Applications!'
    ))

    let prompts = [{
      name: 'name',
      default: '',
      message: 'Application name',
      when: function () {
        return false // disable for now
      }
    }, {
      name: 'description',
      default: '',
      message: 'Application description',
      when: function () {
        return false // disable for now
      }
    }, {
      type: 'list',
      name: 'css',
      message: 'Select a CSS/UI framework',
      choices: [
        { name: 'None', value: '', short: 'No CSS/UI framework' },
        { name: 'Bootstrap 3', value: 'bootstrap3', short: 'Bootstrap v3' },
        { name: 'Bootstrap 4', value: 'bootstrap4', short: 'Bootstrap v4' },
        { name: 'Framework7', value: 'framework7', short: 'Framework7 mobile framework' }
      ]
    }, {
      type: 'checkbox',
      name: 'renderers',
      message: 'Select one or more custom renderers',
      choices: [
        { name: 'Snabbdom', value: 'snabbdom', short: 'Snabbdom (Virtual DOM library)' },
        { name: 'React', value: 'react', short: 'React' },                
        { name: 'Virtual-DOM', value: 'virtual-dom' },
        { name: 'Inferno', value: 'inferno', short: 'Inferno (Virtual DOM library)' },
        { name: 'Incremental-Bars', value: 'incremental-bars', short: 'Incremental-Bars (Incremental DOM backend for Handlebars)' },        
        { name: 'Tinybind', value: 'tinybind', short: `Tinybind (Rivets based data binding library)` }
      ]
    }, {
      type: 'checkbox',
      name: 'addons.snabbdom',
      message: 'Select Snabbdom addons',
      choices: [
        { name: 'JSX transformer', value: 'snabbdom-jsx' },
        { name: 'Hyperscript helpers', value: 'snabbdom-helpers' },
        { name: 'Custom Element', value: 'snabbdom-element' },
      ],
      when: function (answers) {
        return answers.renderers.indexOf('snabbdom') !== -1
      }
    },
    {
      type: 'checkbox',
      name: 'addons.inferno',
      message: 'Select Inferno addons',
      choices: [
        { name: 'JSX transformer', value: 'inferno-jsx' },
        { name: 'Hyperscript helpers', value: 'inferno-hyperscript' }
      ],
      when: function (answers) {
        return answers.renderers.indexOf('inferno') !== -1
      }
    },
    {
      type: 'checkbox',
      name: 'addons.virtualdom',
      message: 'Select Virtual-DOM addons',
      choices: [
        { name: 'JSX transformer', value: 'virtual-dom-jsx' },
        { name: 'Hyperscript helpers', value: 'hyperscript-helpers' },
        { name: 'Handlebars to Hyperscript', value: 'handlebars-hyperscript' },
        { name: 'Jade transformer', value: 'virtual-jade' }
      ],
      when: function (answers) {
        return answers.renderers.indexOf('virtual-dom') !== -1
      }
    },
    {
      type: 'list',
      name: 'defaultRenderer',
      message: 'Select the default renderer',
      when: function (answers) {
        return !!(answers.renderers && answers.renderers.length)
      },
      choices: function (answers) {
        return [{ name: 'builtin', value: '' }].concat(answers.renderers)
      }
    }, {
      type: 'checkbox',
      name: 'bb-mn-libraries',
      message: 'Backbone / Marionette libraries',
      choices: [
        {name: 'backbone-computedfields'},
        {name: 'backbone.validation'},
        {name: 'backbone.syphon'},
        {name: 'backbone.localstorage'},
        {name: 'radio.service'},
        {name: 'marionette.native'},
        {name: 'marionette.routing'},
        {name: 'marionette.modalservice'}
      ]
    }, {
      type: 'checkbox',
      name: 'extra',
      message: 'Extra features',
      choices: [
        {name: 'bottlejs', short: 'Dependency injection library'},
        {name: 'hygen', short: 'Code generator (preconfigured for model, view, route)'}
      ]
    }]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.DEVMODE && this.log('props', JSON.stringify(props))

      const addRequirement = this.builder.addRequirement.bind(this.builder)
      const requirementProps = ['bb-mn-libraries', 'extra', 'css', 'renderers']

      requirementProps.forEach(propName => {
        const propValue = props[propName]
        if (Array.isArray(propValue)) {
          propValue.forEach(addRequirement)
        } else {
          addRequirement(propValue)
        }        
      })
            
      const addonsRequirements = Object.keys(props.addons || {}).reduce(function (requirements, addonName) {
        return requirements.concat(props.addons[addonName])
      }, [])

      addonsRequirements.forEach(addRequirement)

      this.config.set('defaultRenderer', props.defaultRenderer)

      this.props = props
    })
  }

  writing () {
    let defaultRenderer = rendererMap[this.props.defaultRenderer] || this.props.defaultRenderer
    let setupDef = this.builder.getSetupDef(defaultRenderer)
    let sassDef = this.builder.getSassDef()

    this.DEVMODE && this.log('hygen', this.builder.hasRequirement('hygen'))

    this.builder.savePackageFile()
    this.builder.saveWebpackConfigFile()

    this.fs.copy(
      this.templatePath('src'),
      this.destinationPath('src')
    )

    if (this.builder.hasRequirement('hygen')) {
      this.fs.copy(
        this.templatePath('.hygen.js'),
        this.destinationPath('.hygen.js')
      )
      this.fs.copy(
        this.templatePath('.hygen-templates'),
        this.destinationPath('.hygen-templates')
      )
    }

    if (this.builder.hasRequirement('bottlejs')) {
      this.fs.copy(
        this.templatePath('common/di.js'),
        this.destinationPath('src/common/di.js')
      )
      this.fs.copy(
        this.templatePath('setup/services.js'),
        this.destinationPath('src/setup/services.js')
      )
    }

    if (this.builder.hasRequirement('snabbdom-element')) {
      this.fs.copy(
        this.templatePath('common/basecomponents.js'),
        this.destinationPath('src/common/basecomponents.js')
      )      
    }    

    this.fs.copyTpl(
      this.templatePath('setup/main.js'),
      this.destinationPath('src/setup/main.js'),
      setupDef
    )
    this.fs.copyTpl(
      this.templatePath('main.scss'),
      this.destinationPath('src/main.scss'),
      sassDef
    )    
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    )
    this.fs.copy(
      this.templatePath('jsconfig.json'),
      this.destinationPath('jsconfig.json')
    )
  }

  install () {
    const isYarnAvailable = commandExists.sync('yarnpkg')
    this.installDependencies({
      yarn: isYarnAvailable,
      npm: !isYarnAvailable,
      bower: false
    })
  }
}
