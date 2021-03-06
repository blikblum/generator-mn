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
      'ie 11'
    ]
  }
}

var plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html')
  })
]

module.exports = function (env) {
  var isProd = env.mode === 'production'
  
  if (isProd) {
    plugins.push(new CleanPlugin([DIST_DIR + '/*.*']))
    plugins.push(new GenerateSW({
      swDest: path.join('sw.js')
    }))
    plugins.push(new MiniCSSExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    }))
  }

  return {
    entry: './src/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, DIST_DIR)
    },
    mode: isProd ? 'production' : 'development',    
    module: {
      rules: [{
        test: <%- jsFilePattern %>,
        include: [<%- babelIncludes %>],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [<%- babelPresets %>],
            plugins: [<%- babelPlugins %>]
          }
        }]
    }, {
      test: /\.css$/,
      use: [
        isProd ? MiniCSSExtractPlugin.loader : 'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(sass|scss)$/,
      use: [
        isProd ? MiniCSSExtractPlugin.loader : 'style-loader', 
        'css-loader', 
        'sass-loader'
      ]
     }<%- loaderBody %>]
    },
    resolve: {
      modules: [path.resolve(__dirname, './src/common'), 'node_modules']
    },    
    plugins: plugins,
    devtool: isProd ? prodDevTool : devDevTool
  }
}
