const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  // We might want to consider enabling production mode if the build gets overly large.
  // Right now in the beginning, the build is so small that it can be easily analyzed on its own.
  mode: 'development',
  // Keep `require('some-node-module')` as-is in the bundle
  externals: [nodeExternals()],
  // Sourcemaps are not needed, it's easier to debug the build output this way
  devtool: false
};