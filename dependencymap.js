module.exports = {
  rivets: {
    dependencies: ['rivets', 'rivets-backbone-adapter'],
    devDependencies: ['html-loader'],
    loaders: [{body: `{
      test: /\\.html$/,
      use: ['html-loader']
    }`}]
  },

  superviews: {
    dependencies: ['incremental-dom'],
    devDependencies: ['superviews.js', 'superviews-loader'],
    loaders: [{body: `{
        test: /\\.sview$/,
        use: ['superviews-loader']
    }`}]
  }
}