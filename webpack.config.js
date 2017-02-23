var path = require('path')
var webpack = require("webpack")
var precss = require('precss')
var postcssImport = require('postcss-import')
var cssnext = require('postcss-cssnext')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './index.js',
  template: './index.html',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015'],
        plugins: ['transform-class-properties']
      }
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    }]
  },
  postcss: function (webpack) {
    return [
      postcssImport({
        addDependencyTo: webpack
      }),
      precss,
      cssnext()
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        // 'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
