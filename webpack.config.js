const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/spicetify-private-session.js',
  output: {
    filename: 'spicetify-private-session.js',
    path: __dirname + '/dist',
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
};