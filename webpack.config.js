const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")

console.log("NODE_ENV: " + process.env.NODE_ENV)

const isProdEnv = process.env.NODE_ENV === "production"
const srcDir = path.resolve(__dirname, "src")
const buildDir = path.resolve(__dirname, "build")

module.exports = {
  entry: {
    htsd: path.resolve(srcDir, "htsd.js")
  },
  output: {
    path: buildDir,
    filename: "[name].min.js"
  },
  mode: isProdEnv ? "production" : "development",
  devtool: "source-map",
  devServer: {
    contentBase: buildDir
  },
  resolve: {
    extensions: [".js"]
  },
  performance: {
    maxAssetSize: 12 * 1024,
    maxEntrypointSize: 12 * 1024
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [buildDir],
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              injectType: "styleTag",
              attributes: { media: "screen" }
            }
          },
          { loader: "css-loader" }
        ]
      }
    ]
  }
}
