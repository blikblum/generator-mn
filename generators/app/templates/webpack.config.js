var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var WorkboxPlugin = require('workbox-webpack-plugin')
var CleanPlugin = require('clean-webpack-plugin')

<%- require %>

var isProd = process.argv.indexOf('-p') !== -1
var DIST_DIR = 'dist'

var envPresetConfig = {
  modules: false,
  targets: {
    browsers: [
      'ie 11',
      'last 2 versions',
      'Firefox ESR'
    ]
  }
}

var plugins = [
  new ExtractTextPlugin('styles.css'),

  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html')
  }),

  new WorkboxPlugin({
    globDirectory: DIST_DIR,
    globPatterns: ['**/*.{html,js,css}'],
    swDest: path.join(DIST_DIR, 'sw.js')
  })
]

if (isProd) plugins.push (new CleanPlugin([DIST_DIR + '/*.*']))

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, DIST_DIR)
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', envPresetConfig]
          ]
        }
      }]
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }, {
      test: /\.(sass|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }<%- loaderBody %>]
  },
  plugins: plugins,
  devtool: isProd ? undefined : 'source-map'
}
