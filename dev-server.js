'use strict'

const webpack = require('webpack'),
  WebpackDevServer = require('webpack-dev-server'),
  config = require('./webpack.config.dev')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  historyApiFallback: true
}).listen(3000, '127.0.0.1', (err, result) => {
  err && console.log(err)
  console.log('Listening at localhost:3000')
})