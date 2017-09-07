const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var fs = require('fs');
var cssvariables = require('postcss-css-variables');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const resolveOwn = relativePath => path.resolve(__dirname, '.', relativePath);


// Options for PostCSS as we reference these options twice
// Adds vendor prefixing to support IE9 and above
const postCSSLoaderOptions = {
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
    require('postcss-nested'),
    cssvariables({
      /*options*/
      preserve:true // If true, computes the variable and set it as fallback for var()
    }),
    require('postcss-object-fit-images')
  ],
};


var backendConfig = {
  entry: [
    //require.resolve('../polyfills'),
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
    new webpack.DefinePlugin({
      'process.env': {
           'PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new ExtractTextPlugin({
            filename: 'static/css/[name].css',
            allChunks: true,
            //ignoreOrder: true,
            disable: process.env.NODE_ENV !== 'production'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],

  bail: true,
  devtool: 'cheap-module-source-map',
  stats: {
      colors: true,
      chunks: false,
      children: false
  },
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
        include: [
          resolveOwn('../../server'), 
          resolveOwn('../../src'), 
          resolveOwn('../../node_modules/cude-cms')
        ],
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
        include: [
          resolveOwn('../../server'), 
          resolveOwn('../../src'), 
          resolveOwn('../../node_modules/cude-cms')
        ],
        
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
      // By default we support CSS Modules with the extension .modules.css
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: require.resolve('style-loader'),
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: false,
                   
                     localIdentName: '[local]_[hash:base64:5]',
                  },
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: postCSSLoaderOptions,
                },
              ],
            },
            
          )
        ),
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      },
      // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
      // using the extension .modules.css
      {
        test: /\.module\.css$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: require.resolve('style-loader'),
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: false,
                    sourceMap: true,
                    modules: true,
                    localIdentName: '[local]_[hash:base64:5]',
                  },
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: postCSSLoaderOptions,
                },
              ],
            },
          )
        ),
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      },
      
    ],
  },
}

exports = module.exports = backendConfig