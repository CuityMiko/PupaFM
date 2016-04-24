import path from 'path'
import webpack from 'webpack'
// import ExtractTextPlugin from 'extract-text-webpack-plugin'
import baseConfig from './webpack.config.base'

const config = {
  ...baseConfig,

  devtool: 'cheap-module-source-map',

  entry: './app/index',

  output: {
    ...baseConfig.output,

    publicPath: './dist/'
  },

  module: {
    ...baseConfig.module,

    loaders: [
      ...baseConfig.module.loaders,
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'app')],
        exclude: /node_modules/,
        loaders: ['babel']
      }, {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
      // {
      //   test: /\.scss$/,
      //   loader: ExtractTextPlugin.extract(
      //     'style',
      //     'css',
      //     'sass'
      //   )
      // }
    ]
  },

  plugins: [
    ...baseConfig.plugins,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    // new ExtractTextPlugin('style.css', { allChunks: true })
  ]
}

export default config
