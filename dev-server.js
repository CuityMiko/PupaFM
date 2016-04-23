'use strict'

const webpack = require('webpack')
const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config')

const app = express()
const compiler = webpack(config)
const PORT = 3000

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: false,
  stats: {
    colors: true
  }
}))

// hot
app.use(webpackHotMiddleware(compiler))

app.listen(PORT, 'localhost', (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`Listening at http://localhost:${PORT}`)
})
