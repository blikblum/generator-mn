module.exports = {
  prompt: ({ inquirer, args }) => {
    if (args.name) {
      return Promise.resolve({ allow: true })
    }
    return inquirer.prompt([{
      type: 'list',
      name: 'fileScope',
      message: 'Scope:',
      choices: ['local', 'global']
    },
    {
      type: 'input',
      name: 'name',
      message: 'View name:'
    }])
  }
}
