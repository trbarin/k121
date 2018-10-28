const webpack = require("webpack");
const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = env => {
  const BUILD_FOLDER = "dist";
  const BUNDLE_NAME = "bundle";
  const START_PAGE = "";
  const DEV_MODE = env != "production";

  const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash:8].bundle.css",
    disable: false
  });

  const configuration = {
    context: path.join(__dirname, "src"),
    entry: ["./index.js"],
    output: {
      path: path.join(__dirname, BUILD_FOLDER),
      filename: `${BUNDLE_NAME}.js`
    },
    module: {
      rules: [
        {
          test: /\.exec\.js$/,
          use: ["script-loader"]
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: ["html-loader"]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "es2015",
                    {
                      modules: false
                    }
                  ]
                ]
              }
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)/,
          use: [
            {
              loader: "url-loader",
              query: {
                limit: 5000,
                name: "[name].[hash:8].[ext]"
              }
            },
            {
              loader: "image-webpack-loader",
              query: {
                mozjpeg: {
                  quality: 65
                }
              }
            }
          ]
        },
        {
          test: /\.(css|scss)$/,
          use: ["css-hot-loader"].concat(
            extractSass.extract({
              fallback: "style-loader",
              use: [
                {
                  loader: "css-loader"
                },
                {
                  loader: "sass-loader",
                  options: {
                    includePaths: ["src/assets/style"]
                  }
                }
              ]
            })
          )
        }
        // {
        //   test: /\.(woff2?|ttf|eot)$/,
        //   use: [{
        //     loader: "file-loader",
        //     options: { name: "./fonts/[hash:8].[ext]" }
        //   }]
        // },
        // {
        //   test: /\.(jpg|png|svg|ico)$/,
        //   use: [{
        //     loader: "file-loader",
        //     options: { name: "./images/[hash:8].[ext]" }
        //   }]
        // },
      ]
    },
    resolve: {
      modules: [path.join(__dirname, "node_modules")],
      alias: {
        locales: path.resolve(__dirname, "./src/locales/locales")
      }
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ExtractTextPlugin(`${BUNDLE_NAME}.css`),
      new HtmlWebpackPlugin({
        template: "index.html",
        favicon: "images/favicon.png",
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true
      }),
      new webpack.ProvidePlugin({
        locales: "locales",
        jQuery: "jquery",
        jquery: "jquery",
        Popper: "popper.js",
        $: "jquery",
        firebase: "firebase"
      }),
      new webpack.DefinePlugin({
        "process.env": {
          API_URL: JSON.stringify(
            DEV_MODE
              ? "http://localhost:3000/"
              : "https://k121-backend.herokuapp.com/"
          )
        }
      })
    ]
  };

  /** DEVELOPMENT CONFIGURATION **/
  if (DEV_MODE) {
    configuration.devtool = "source-map";

    configuration.devServer = {
      contentBase: false,
      compress: true,
      open: true,
      openPage: START_PAGE,
      hot: true
    };

    configuration.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  /** PRODUCTION CONFIGURATION **/
  if (!DEV_MODE) {
    configuration.plugins.push(new CleanWebpackPlugin([BUILD_FOLDER]));
    configuration.plugins.push(new UglifyJSPlugin());
    configuration.plugins.push(new OptimizeCSSAssets());
  }

  return configuration;
};
