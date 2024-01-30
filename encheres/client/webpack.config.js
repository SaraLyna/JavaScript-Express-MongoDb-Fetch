import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const __dirname = path.dirname(new URL(import.meta.url).pathname); 

const PRODUCTION = false;

export default {
  entry: path.resolve(__dirname, '../server/index.js'),

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'scripts/bundle.js'
  },

  mode :  (PRODUCTION ? 'production' : 'development'),
  devtool : (PRODUCTION ? undefined : 'eval-source-map'),

  devServer: {
      static: {
	       publicPath: path.resolve(__dirname, 'public'),
	       watch : true
      },
      host: 'localhost',
      port : 8888,
      open : true
  },

  module: {
    rules : [
      {
        test: /\.(m?js*)/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
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


  externals : {
    react: 'React',
    reactdom: 'ReactDom',
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new CopyPlugin({
  	    patterns: [
          {
            context: path.resolve(__dirname, "src", "html"),
            from: '**/*.html',
            to:   'html/[name].html',
            noErrorOnMissing: true
          },
          {
            context: path.resolve(__dirname, "vendor"),
            from: '**/*.js',
            to:  'vendor',
            noErrorOnMissing: true
          },
          {
            context: path.resolve(__dirname, "src", "images"),
            from: '**/*',
            to:   'images/[name][ext]',
            noErrorOnMissing: true
          },
          {
            context: path.resolve(__dirname, "src", "style"),
            from: '**/*',
            to:   'style/[name][ext]',
            noErrorOnMissing: true
          },
  	    ]
  	})
  ]
};

