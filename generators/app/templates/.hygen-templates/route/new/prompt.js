const camelize = require('../../_utils/camelize')

module.exports = {
  prompt: ({ inquirer, args }) => {
    if (args.path && args.viewName && args.routeName) {
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
      message: 'Route name:',
      default ({path}) {
        return camelize(path, '/') + 'Route'
      }
    },
    {
      type: 'input',
      name: 'viewName',
      message: 'View name:',
      default ({path}) {
        return camelize(path, '/') + 'View'
      }
    }])
  }
}
