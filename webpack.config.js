module.exports = {
  target: "atom",

  context: __dirname + '/src',

  entry: './index',

  output: {
    path: __dirname + '/dist',
    filename: "index.js",
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
         presets: ['react', 'es2015']
        }
      },
      {
        test: /\.coffee$/,
        loader: "coffee-loader"
      },
      // {
      //   test: /\.json$/,
      //   loader: "json-loader"
      // },
      // {
      //   test: /\.png$/,
      //   exclude: /node_modules/,
      //   loader: "file-loader"
      // }
    ],
  }
};
