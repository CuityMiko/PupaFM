'use strict'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  historyApiFallback: true
}).listen(3000, '127.0.0.1', (err, result) => {
  err && console.log(err)
  console.log('Listening at localhost:3000')
})
