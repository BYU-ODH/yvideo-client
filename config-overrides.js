//This File is a temporary workaround for webpack 5
//Once a fix has been found, please replace the current start in package.json with react-scripts start
//Then delete this file

webpack = require("webpack")

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer"),
  }
  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"]
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: "process",
    }),
  ]

  return config
}