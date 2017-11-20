const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './javascript/index',
  output: {
    path: __dirname,
    filename: 'build/bundle.js',
    sourceMapFilename: 'sourcemap'
  },
  resolve: {
    // Allow to omit extensions when requiring these files
    extensions: ['.js', '.jsx'],
    alias: {
      /* eslint-disable key-spacing */
      assets:            path.resolve(__dirname, 'assets'),
      css:               path.resolve(__dirname, 'css'),
      shaders:           path.resolve(__dirname, 'shaders'),
      javascript:        path.resolve(__dirname, 'javascript'),
      actions:           path.resolve(__dirname, 'javascript', 'actions'),
      components:        path.resolve(__dirname, 'javascript', 'components'),
      reducers:          path.resolve(__dirname, 'javascript', 'reducers'),
      utility:           path.resolve(__dirname, 'javascript', 'utility'),

      webgl:             path.resolve(__dirname, 'javascript', 'WebGL'),
      'webgl-utilities': path.resolve(__dirname, 'javascript', 'WebGL', 'utility')
      /* eslint-enable key-spacing */
    }
  },
  module: {
    rules: [
      {
        test: /\.js$|.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.glsl$/,
        exclude: /node_modules/,
        use: 'raw-loader'
      },
      {
        test: /\.css|.scss$/,
        use: ExtractTextPlugin.extract({
          loader: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        })
      }
    ]
  },
  devtool: '#inline-source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: 'build/style.css',
      allChunks: true
    })
  ]
}
