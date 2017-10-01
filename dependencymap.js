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

  'snabbdom-jsx': {
    dependencies: ['snabbdom-pragma'],
    devDependencies: ['babel-plugin-transform-react-jsx'],
    loaders: [{body: `{
        test: /\\.jsx$/,
        use: [{
          loader: 'babel-loader', 
          options: {
            plugins: [
              ['transform-react-jsx', {pragma: 'Snabbdom.createElement'}]
            ]
          }
        }]
    }`}]
  },

  'snabbdom-helpers': {
    dependencies: ['snabbdom-helpers']
  },

  snabbdom: {
    dependencies: ['snabbdom']
  },

  inferno: {
    dependencies: ['inferno']
  },

  'inferno-jsx': {
    devDependencies: ['babel-plugin-inferno'],
    loaders: [{body: `{
        test: /\\.jsx$/,
        use: [{
          loader: 'babel-loader', 
          options: {
            plugins: [["inferno", {
              "imports": true,
              "pragma": ""
            }]]
          }
        }]
    }`}]
  },

  'inferno-hyperscript': {
    dependencies: ['inferno-hyperscript']
  },

  'backbone-computedfields': {
    dependencies: ['backbone-computedfields']
  },

  'backbone.validation': {
    dependencies: ['backbone.validation']
  },

  'backbone.syphon': {
    dependencies: ['backbone.syphon']
  },

  'backbone.localstorage': {
    dependencies: ['backbone.localstorage']
  },

  bootstrap3: {
    dependencies: ['bootstrap'],
    devDependencies: ['url-loader', 'file-loader'],
    loaders: [{body: `{
      test: /\\.(woff|woff2)$/,
      use: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\\.ttf$/,
      use: "url-loader?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\\.eot$/,
      use: "file-loader"
    }, {
      test: /\\.svg$/,
      use: "url-loader?limit=10000&mimetype=image/svg+xml"
    }`}],
    setup: {
      header: 'import \'bootstrap/dist/css/bootstrap.css\''
    }
  },

  framework7: {
    dependencies: ['framework7', 'marionette.f7'],
    devDependencies: ['file-loader'],
    loaders: [{
      body: `{
        test: /\\.png$/,
        use: "file-loader"
      }`
    }],
    setup: {
      header: 'import \'framework7/dist/css/framework7.material.css\''
    }
  }
};
