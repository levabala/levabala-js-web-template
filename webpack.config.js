const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: ['./src/js/main.js', './src/app.scss'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
        // enforce: "pre", // preload the jshint loader
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/transform-flow-comments',
                '@babel/plugin-transform-flow-strip-types',
                '@babel/plugin-proposal-class-properties',
                [
                  '@babel/plugin-proposal-pipeline-operator',
                  { proposal: 'minimal' },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
            },
          },
        ],
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
  mode: 'development',
};
