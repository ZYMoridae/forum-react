/*
    ./webpack.config.js
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})


module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/': {
        target: 'http://kayla.pixelforcesystems.com.au/',
        secure: false,
        changeOrigin: true
      }
    },
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": true }
  },
  module: {
    rules: [{
        test: /\.jsx?$/, // Transform all .js/.jsx files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
      },
    }],
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {
        presets:[ 'es2017', 'react', 'stage-3' ]
      } },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/, query: {
        presets:[ 'es2017', 'react', 'stage-3' ]
      } },
      { test: /\.css$/, loader: ['css-loader', 'style-loader'], include: /node_modules/ },
      { test: /\.svg$/, loader: 'svg-inline-loader', exclude: /node_modules/},
      {loader: 'style-loader!css-loader', test: /\.css$/},
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}