'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const ConfigBuilder = require('../../utils/configbuilder')
const rendererMap = require('../../renderermap')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.builder = new ConfigBuilder(this)
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.red('generator-mn') + '. A generator for modern Marionette Applications!'
    ));

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
      type: 'checkbox',
      name: 'renderers',
      message: 'Select one or more custom renderers',
      choices: [
        { name: 'Rivets', value: 'rivets', short: "Data binding library (blikblum's svelte fork)" },
        { name: 'Superviews', value: 'superviews', short: "Incremental DOM based template" },
        { name: 'Snabbdom', value: 'snabbdom', short: "Virtual DOM library" },
        { name: 'Virtual-DOM', value: 'virtual-dom', short: "Virtual DOM library" },
        { name: 'Inferno', value: 'inferno', short: "Virtual DOM library" }
      ]
    }, {
      type: 'checkbox',
      name: 'addons_snabbdom',
      message: 'Select Snabbdom addons',
      choices: [
        { name: 'JSX transformer', value: 'snabbdom-jsx' },
        { name: 'Hyperscript helpers', value: 'snabbdom-helpers' }
      ],
      when: function (answers) {
        return answers.renderers.indexOf('snabbdom') !== -1
      }
    },
    {
      type: 'checkbox',
      name: 'addons_inferno',
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
      name: 'addons_virtualdom',
      message: 'Select Virtual-DOM addons',
      choices: [
        { name: 'JSX transformer', value: 'virtual-dom-jsx' },
        { name: 'Hyperscript helpers', value: 'hyperscript-helpers' },
        { name: 'Handlebars to Hyperscript', value: 'handlebars-hyperscript' }
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
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.log(props)

      props.renderers.forEach(this.builder.addRequirement, this.builder)

      var addonsRequirements = Object.keys(props).reduce(function (memo, name) {
        if (name.indexOf('addons_') === 0) {
          return memo.concat(props[name])
        }
        return memo
      }, [])

      this.log(addonsRequirements)
      addonsRequirements.forEach(this.builder.addRequirement, this.builder)

      this.config.set('defaultRenderer', props.defaultRenderer)

      this.props = props
    });
  }

  writing() {
    let setupDef = { header: '', body: '' }
    let defaultRenderer = rendererMap[this.props.defaultRenderer] || this.props.defaultRenderer
    if (defaultRenderer) {
      setupDef.header = `import renderer from 'marionette.renderers/${defaultRenderer}'`
      setupDef.body = 'Marionette.View.setRenderer(renderer)'
    }
    this.builder.savePackageFile()
    this.builder.saveWebpackConfigFile()
    this.fs.copyTpl(
      this.templatePath('setup.js'),
      this.destinationPath('src/setup.js'),
      setupDef
    );
    this.fs.copy(
      this.templatePath('src'),
      this.destinationPath('src')
    );
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
  }

  install() {
    this.yarnInstall();
  }
};
