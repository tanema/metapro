const path = require('path');
const webpack = require('webpack');
const env = require('dotenv').config().parsed;

module.exports = {
  entry: {
    content_script: './src/metapro.js',
    background: './src/background.js',
  },
  output: {
    path: path.join(path.resolve(__dirname), 'extension', 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'src',
      'node_modules',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'API_CLIENT_ID': JSON.stringify(env.API_CLIENT_ID),
        'API_CLIENT_SECRET': JSON.stringify(env.API_CLIENT_SECRET),
      }
    }),
  ],
  devtool: 'sourcemap',
};
