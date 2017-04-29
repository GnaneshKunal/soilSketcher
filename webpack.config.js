module.exports = {
  entry: [
    './public/src/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  module: {
    loaders: [{
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};