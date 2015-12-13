module.exports = {
  target: 'atom',

  context: __dirname + '/src',

  entry: './index',

  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ],
  }
};
