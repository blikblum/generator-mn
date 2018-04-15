var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCSSExtractPlugin = require('mini-css-extract-plugin')
var {GenerateSW} = require('workbox-webpack-plugin')
var CleanPlugin = require('clean-webpack-plugin')

<%- require %>

var DIST_DIR = 'dist'
var devDevTool = 'source-map' // see https://webpack.js.org/configuration/devtool/ for options
var prodDevTool = false

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
  new MiniCSSExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "[name].css",
    chunkFilename: "[id].css"
  }),

  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html')
  }),

  new GenerateSW({
    globDirectory: DIST_DIR,
    globPatterns: ['**/*.{html,js,css}'],
    swDest: path.join(DIST_DIR, 'sw.js')
  })
]

module.exports = function (env) {
  var isProd = env.production

  if (isProd) plugins.push(new CleanPlugin([DIST_DIR + '/*.*']))

  return {
    entry: './src/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, DIST_DIR)
    },
    module: {
      rules: [{
        test: /\.js$/,
        include: [<% for(var i=0; i<babelIncludes.length; i++) {%>
        path.resolve('<%=babelIncludes[i]%>'),<% } %>],
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
      use: [
      MiniCSSExtractPlugin.loader,
      'css-loader'
      ]
    }, {
      test: /\.(sass|scss)$/,
      use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader']
     }<%- loaderBody %>]
    },
    plugins: plugins,
    devtool: isProd ? prodDevTool : devDevTool
  }
}
