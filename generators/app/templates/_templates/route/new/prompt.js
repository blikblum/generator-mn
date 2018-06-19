module.exports = {
  prompt: ({ inquirer, args }) => {
    if (args.path) {
      return Promise.resolve({ allow: true })
    }
    return inquirer.prompt([{
      type: 'input',
      name: 'path',
      message: 'Route path:'
    },
    {
      type: 'input',
      name: 'routeName',
      message: 'Route name:'
    },
    {
      type: 'input',
      name: 'viewName',
      message: 'View name:'
    }])
  }
}
