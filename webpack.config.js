const path = require("path")
const { EnvironmentPlugin } = require("webpack")
const TerserPlugin = require("terser-webpack-plugin")

console.log("NODE_ENV: " + process.env.NODE_ENV)

const isProdEnv = process.env.NODE_ENV === "production"
const isDevServer = process.env.WEBPACK_DEV_SERVER === "true"
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
    hints: (() => {
      if (isProdEnv && !isDevServer) {
        return "error"
      }
      if (isDevServer) {
        return false
      }
      return "warning"
    })(),
    maxAssetSize: 12 * 1024
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
  plugins: [new EnvironmentPlugin(["npm_package_version"])],
  module: {
    rules: [
      {
        test: f => path.extname(f) === ".js" && f.startsWith(srcDir + "/"),
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
