module.exports = {
  prompt: ({ inquirer, args }) => {
    if (args.name && typeof args.collection === 'string') {
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
      message: 'Model name:'
    },
    {
      type: 'input',
      name: 'collection',
      message: 'Collection name:',
      default ({name}) {
        return name + 's'
      }
    }])
  }
}
