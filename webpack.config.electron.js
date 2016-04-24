// translate main.js

import webpack from 'webpack'
import baseConfig from './webpack.config.base'

export default {
  ...baseConfig,

  devtool: 'source-map',

  entry: './main.dev',

  output: {
    path: __dirname,
    filename: './main.js'
  },

  module: {
    loaders: [
      ...baseConfig.module.loaders,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    // new webpack.BannerPlugin(
    //   'require("source-map-support").install();',
    //   { raw: true, entryOnly: false }
    // ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  node: {
    __dirname: false,
    __filename: false
  },

  // externals: [
  //   ...baseConfig.externals,
  //   'source-map-support'
  // ]
}
