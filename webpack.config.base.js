'use strict'

import path from 'path'

export default {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      // include: [path.resolve(__dirname, 'src')],
      exclude: /node_modules/,
      loaders: ['babel']
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'url'
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url?limit=10000!img?progressive=true'
    }],
    noParse: /node_modules\/json-schema\/lib\/validate\.js/
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
    alias: {}
  },

  plugins: [

  ],

  externals: [
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
  ]

  // node: {
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty'
  // }
}
