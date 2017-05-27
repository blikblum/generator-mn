'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const ConfigBuilder = require('../../utils/configbuilder')

module.exports = class extends Generator {
  prompting() {
    this.builder = new ConfigBuilder(this)
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.red('generator-mn') + '. A generator for modern Marionette Applications!'
    ));

    const prompts = [{
      type: 'checkbox',
      name: 'renderers',
      message: 'Select one or more custom renderers',
      choices:[
        {name: 'Rivets', value: 'rivets', short: "Data binding library (blikblum's svelte fork)"},
        {name: 'Superviews', value: 'superviews', short: "Incremental DOM based template"},
        {name: 'Snabbdom', value: 'snabbdom', short: "Virtual DOM library"},
        {name: 'Virtual-DOM', value: 'virtualdom', short: "Virtual DOM library"},
        {name: 'Inferno', value: 'inferno', short: "Virtual DOM library"}
      ]
    },
      {
        type: 'list',
        name: 'defaultRenderer',
        message: 'Select the default renderer',
        when: function (answers) {
          return !!(answers.renderers && answers.renderers.length)
        },
        choices: function (answers) {
          return ['builtin'].concat(answers.renderers)
        }
      }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.log(props)
      this.props = props;
    });
  }

  writing() {
    this.builder.savePackageFile()
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies();
  }
};
