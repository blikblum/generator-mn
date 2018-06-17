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
    dependencies: ['snabbdom-pragma-lite'],
    devDependencies: ['babel-plugin-transform-react-jsx', 'babel-plugin-jsx-pragmatic'],
    supportsJSX: true,
    babelPlugins: [`['transform-react-jsx', {pragma: 'h'}]`,
      `['babel-plugin-jsx-pragmatic', {module: 'snabbdom-pragma-lite', import: 'h', export: 'createElement'}]`]
  },

  react: {
    dependencies: ['react', 'react-dom'],
    devDependencies: ['babel-preset-react'],
    supportsJSX: true,
    babelPresets: [`'react'`]
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
    supportsJSX: true,
    babelPlugins: [`['inferno', {imports: true, pragma: ''}]`]
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

  'marionette.native': {
    dependencies: ['marionette.native']
  },

  'marionette.routing': {
    dependencies: ['marionette.routing']
  },

  bootstrap3: {
    dependencies: ['bootstrap3'],
    devDependencies: ['url-loader', 'file-loader', 'imports-loader'],
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
    }, {
      test: /bootstrap.+\\.js$/,
      use: "imports-loader?jQuery=jquery,$=jquery,this=>window"
    }`}],
    sass: {
      header: `
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";      
@import "~bootstrap-sass/assets/stylesheets/bootstrap";`
    }
  },

  bootstrap4: {
    dependencies: ['bootstrap4', 'popper.js', 'font-awesome'],
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
    sass: {
      header: `
@import "~bootstrap/scss/bootstrap";
$fa-font-path: "~font-awesome/fonts";
@import '~font-awesome/scss/font-awesome.scss';
`
    }
  },

  framework7: {
    dependencies: ['framework7', 'marionette.f7'],
    devDependencies: ['file-loader'],
    babelIncludes: ['node_modules/framework7', 'node_modules/dom7', 'node_modules/template7'],
    loaders: [{
      body: `{
        test: /\\.png$/,
        use: "file-loader"
      }`
    }],
    setup: {
      header: `import 'framework7/dist/css/framework7.css'
import Framework7 from 'framework7'
import Popup from 'framework7/dist/components/popup/popup.js'
`,
      body: `Framework7.use([Popup])`
    }
  }
}
