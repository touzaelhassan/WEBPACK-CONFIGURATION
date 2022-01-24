const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  // 1 - Mode
  mode: 'development',

  // 2 - Entry
  entry: {
    main: path.resolve(__dirname, 'src/js/index.js'),
  },

  // 3 - Output
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'js/[name].js',
    assetModuleFilename: 'images/[name].[ext]',
    clean: true,
  },

  // 5 - Loaders
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },

      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|jpeg)$/,
        type: 'asset/resource',
      },
    ],
  },

  // 4 - Webpack Server
  devServer: {
    port: 9000,
    open: true,
    static: {
      directory: path.join(__dirname, 'build'),
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },

  // 5 - Plugins
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
    }),

    new MiniCssExtractPlugin({ filename: 'css/style.css' }),
    new CssMinimizerPlugin(),
  ],
};
