const path = require("path")
const { EnvironmentPlugin } = require("webpack")
const TerserPlugin = require("terser-webpack-plugin")

console.log("NODE_ENV: " + process.env.NODE_ENV)

const isProdEnv = process.env.NODE_ENV === "production"
const isDevServer = process.env.WEBPACK_SERVE === "true"
const srcDir = path.resolve(__dirname, "src")
const buildDir = path.resolve(__dirname, "build")

module.exports = {
  entry: {
    htsd: path.resolve(srcDir, "htsd.mjs"),
  },
  output: {
    path: buildDir,
    filename: "[name].min.js",
  },
  mode: isProdEnv ? "production" : "development",
  devtool: "source-map",
  devServer: {
    static: {
      directory: buildDir,
    },
  },
  resolve: {
    extensions: [".js"],
  },
  performance: {
    hints: (() => {
      if (isDevServer) {
        return false
      }
      if (isProdEnv) {
        return "error"
      }
      return "warning"
    })(),
    maxAssetSize: 12 * 1024,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [new EnvironmentPlugin(["npm_package_version"])],
  module: {
    rules: [
      {
        test: (f) => path.extname(f) === ".mjs" && f.startsWith(srcDir + "/"),
        loader: "babel-loader",
      },
      {
        test: /\.lazy\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              injectType: "lazyStyleTag",
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },
}
