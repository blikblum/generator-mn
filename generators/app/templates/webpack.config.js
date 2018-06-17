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
  var isProd = env && env.production

  if (isProd) plugins.push(new CleanPlugin([DIST_DIR + '/*.*']))

  return {
    entry: './src/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, DIST_DIR)
    },
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
        MiniCSSExtractPlugin.loader,
        'css-loader'
      ]
    }, {
      test: /\.(sass|scss)$/,
      use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader']
     }<%- loaderBody %>]
    },
    resolve: {
      modules: [path.resolve(__dirname, './src/common'), 'node_modules']
    },    
    plugins: plugins,
    devtool: isProd ? prodDevTool : devDevTool
  }
}
