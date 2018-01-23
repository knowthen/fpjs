module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
  },
  watch: true,
  devServer: {
    contentBase: './src',
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
            plugins: [
              require('babel-plugin-transform-object-rest-spread'),
              require('regenerator-transform'),
            ],
          },
        },
      },
    ],
  },
};
