const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const PRODUCTION = false;

module.exports = {

  entry: {
    commissaire: path.resolve(__dirname, 'src','scripts', 'commissaire-priseur.js'),
    encherisseur : path.resolve(__dirname, 'src','scripts', 'encherisseur.js')
  },

  output: {
    path: path.resolve(__dirname, '../server/public'),
    filename: 'scripts/[name]-bundle.js'
  },

  mode :  (PRODUCTION ? 'production' : 'development'),
  devtool : 'source-map',


  devServer: {
    static: {
      publicPath: path.resolve(__dirname, "../public"),
      watch: true,
    },
    host: "localhost",
    port: 8080,
    open: true,
  },

  module: {
    rules : [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif)/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name : '[name].[ext]',
              outputPath : 'images'
            }
          }
        ]
      }
    ]
  },



  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/html/commissaire-priseur.html",
        filename: "../public/html/commissaire-priseur.html",
        chunks : ['commissaire-priseur']
    }),

    new HtmlWebpackPlugin({
      template: "./src/html/encherisseur.html",
      filename: "../public/html/encherisseur.html",
      chunks : ['encherisseur']
    }),

    new CopyPlugin({
      patterns: [
        {
          context: path.resolve(__dirname, "src", "html"),
          from: "**/about.html",
          to: "html",
        },
        {
          context: path.resolve(__dirname, "src", "html"),
          from: "**/accueil.html",
          to: "html",
        },
        {
          context: path.resolve(__dirname, "src", "html"),
          from: "**/erreur.html",
          to: "html",
        },
        {
          context: path.resolve(__dirname, "src", "images"),
          from: "./*.jpg",
          to: "images",
        },
        {
          context: path.resolve(__dirname, "src", "style"),
          from: "./*.css",
          to: "style",
        },
      ]
   })
  ]

};
