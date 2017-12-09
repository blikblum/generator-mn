var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var WorkboxPlugin = require('workbox-webpack-plugin')

<%- require %>

var isProd = process.argv.indexOf('-p') !== -1
var DIST_DIR = 'dist'

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
          presets: [['es2015', {modules: false}]]
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
  plugins: [
    new ExtractTextPlugin('styles.css'),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),

    new WorkboxPlugin({
      globDirectory: DIST_DIR,
      globPatterns: ['**/*.{html,js,css}'],
      swDest: path.join(DIST_DIR, 'sw.js')
    })
  ],
  devtool: isProd ? undefined : 'source-map'
}
