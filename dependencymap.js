module.exports = {
  rivets: {
    dependencies: ['rivets', 'rivets-backbone-adapter'],
    devDependencies: ['html-loader'],
    loaders: [{body: `{
      test: /-tpl\\.html$/,
      use: ['html-loader']
    }`}]
  },

  superviews: {
    dependencies: ['incremental-dom'],
    devDependencies: ['superviews.js', 'superviews-loader'],
    loaders: [{body: `{
        test: /-tpl\\.html$/,
        use: ['babel-loader', 'superviews-loader']
    }`}]
  },

  'incremental-bars': {
    dependencies: ['incremental-dom', 'handlebars'],
    devDependencies: ['incremental-bars-loader'],
    loaders: [{body: `{
        test: /-tpl\\.html$/,
        use: ['babel-loader', 'incremental-bars-loader']
    }`}]
  },

  'virtual-dom': {
    dependencies: ['virtual-dom']
  },

  'virtual-dom-jsx': {
    devDependencies: ['virtual-dom-loader'],
    loaders: [{body: `{
        test: /\\.jsx$/,
        use: ['virtual-dom-loader']
    }`}]
  },

  'virtual-jade': {
    devDependencies: ['virtual-jade-loader'],
    loaders: [{body: `{
        test: /\\.pug$/,
        use: ['virtual-jade-loader']
    }`}]
  },

  'hyperscript-helpers': {
    dependencies: ['hyperscript-helpers']
  },

  'handlebars-hyperscript': {
    devDependencies: ['virtual-dom-handlebars-loader', 'virtual-dom-handlebars'],
    loaders: [{body: `{
        test: /-tpl\\.html$/,
        use: ['virtual-dom-handlebars-loader']
    }`}]
  },

  'snabbdom': {
    dependencies: ['snabbdom']
  },

  'snabbdom-jsx': {
    devDependencies: ['snabbdom-pragma'],
    loaders: [{body: `{
        test: /\\.jsx$/,
        use: [{
          loader: 'babel-loader', 
          options: {
            plugins: ['transform-react-jsx', { pragma: 'Snabbdom.createElement'}]
          }]
    }`}]
  },

  'snabbdom-helpers': {
    dependencies: ['snabbdom-helpers']
  },

  'snabbdom': {
    dependencies: ['snabbdom']
  }
}