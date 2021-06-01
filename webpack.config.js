'use strict'
const path = require('path')

module.exports = {
  // provide the app's title in webpack's name field, so that
  // it can be accessed in index.html to inject the correct title.
  output: {
    filename: '[name].js'
  },
  externals: {},
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  }
}
