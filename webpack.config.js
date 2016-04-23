'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  context: __dirname,
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    './app/index.js'
  ],
  output: {
    path: path.resolve(__dirname, '/app/assets/'),
    publicPath: 'http://localhost:3000/app/assets/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: [path.resolve(__dirname, 'app')],
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    }, {
      test: /\.scss$/,
      include: [path.resolve(__dirname, 'app')],
      loader: 'style!css!sass'
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'url'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=10240'
    }, {
      test: /\.json$/,
      loader: 'json'
    }],
    noParse: /node_modules\/json-schema\/lib\/validate\.js/
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new webpack.DefinePlugin({
    //   __DEV__: true,
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('development')
    //   }
    // })
  ],
  target: 'electron'
  // node: {
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty'
  // }
}
