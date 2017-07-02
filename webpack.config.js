const webpack = require("webpack");

const env = process.env.NODE_ENV;

const config = {
  entry: "./src",
  output: {
    library: "SwiftyDevtools",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          compilerOptions: {
            declaration: false
          }
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(env)
      }
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};

if (env === "production") {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
