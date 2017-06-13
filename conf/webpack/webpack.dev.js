const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var path = require('path');
var fs = require('fs');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const resolveOwn = relativePath => path.resolve(__dirname, '.', relativePath);

var backendConfig = {
  entry: [
    require.resolve('../polyfills'),
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?noInfo=false',
    resolveOwn("../../src/index.js"),
  ],
  output: {
    path: resolveOwn('../../public/build/'),
    filename: 'static/js/main.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/'
  },
  plugins: [
    // new CopyWebpackPlugin([
    //         { 
    //           from: resolveOwn('../../public/assets'),
    //           to: 'assets' 
    //         }
    //     ]),
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: resolveOwn('../../public/index.html'),
    //   filename: "main.html"
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        'REACT_APP_BASEURL': JSON.stringify(process.env.REACT_APP_BASEURL)
      }
    }),
    new ExtractTextPlugin({
            filename: 'static/css/[name].css',
            allChunks: true,
            disable: process.env.NODE_ENV !== 'production'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  bail: true,
  devtool: 'cheap-module-source-map',

  module: {

    strictExportPresence: true,

    rules: [
      // TODO: Disable require.ensure as it's not a standard language feature.
      // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
      // { parser: { requireEnsure: false } },

      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [{
          options: {
            formatter: eslintFormatter,
            // @remove-on-eject-begin
            baseConfig: {
              extends: [require.resolve('eslint-config-react-app')],
            },
            ignore: false,
            useEslintrc: false,
            // @remove-on-eject-end
          },
          loader: require.resolve('eslint-loader'),
        }, ],
        include: [resolveOwn('../../server'), resolveOwn('../../src')],
      },

      // ** ADDING/UPDATING LOADERS **
      // The "file" loader handles all assets unless explicitly excluded.
      // The `exclude` list *must* be updated with every change to loader extensions.
      // When adding a new loader, you must add its `test`
      // as a new entry in the `exclude` list in the "file" loader.

      // "file" loader makes sure those assets end up in the `build` folder.
      // When you `import` an asset, you get its filename.
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.scss$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.svg$/,
        ],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      // "url" loader works just like "file" loader but it also embeds
      // assets smaller than specified size as data URLs to avoid requests.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.svg$/,
        use: [{
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [{
                  removeTitle: false
                }],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        include: [resolveOwn('../../server'), resolveOwn('../../src')],
        
        loader:  'babel-loader',
        options: {
          // @remove-on-eject-begin
          babelrc: false,
          presets: [require.resolve('babel-preset-react-app')],
          // @remove-on-eject-end
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel']
        },
         
      },
    
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      { 
        test: [/\.scss$/,/\.css$/],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          use: [
            //require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                  localIdentName: '[local].[hash:8]',
                  modules: true
              }
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            {
              loader: require.resolve('sass-loader')
            }
          ]
        }),
      },
    ],
  },
}

exports = module.exports = backendConfig