var gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var fs = require('fs');
var DeepMerge = require('deep-merge');

require('dotenv').config()
const resolveOwn = relativePath => path.resolve(__dirname, '.', relativePath);


var deepmerge = DeepMerge(function (target, source, key) {
  if (target instanceof Array) {
    return [].concat(target, source);
  }
  return source;
});

// generic
var defaultConfig = {
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
        include: [resolveOwn('./server'), resolveOwn('./src')],
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
          name: 'build/static/media/[name].[hash:8].[ext]',
        },
      },
      // "url" loader works just like "file" loader but it also embeds
      // assets smaller than specified size as data URLs to avoid requests.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'build/static/media/[name].[hash:8].[ext]',
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
        include: [resolveOwn('./server'), resolveOwn('./src')],
        
        loader: require.resolve('babel-loader'),
        options: {
          // @remove-on-eject-begin
          babelrc: false,
          presets: [require.resolve('babel-preset-react-app')],
          // @remove-on-eject-end
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
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
};


function config(overrides) {
  return deepmerge(defaultConfig, overrides || {});
}

// frontend

var frontendConfig = config({
  entry: [
    require.resolve('./conf/polyfills'),
    resolveOwn("./src/index.js"),
  ],
  output: {
    path: resolveOwn('./public'),
    filename: 'build/static/js/main.js',
    chunkFilename: 'build/static/js/[name].chunk.js',
    publicPath: '/'
  },
  plugins: [
    new CopyWebpackPlugin([
            { 
              from: './public/assets',
              to: 'build/assets' 
            }
        ]),
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: resolveOwn('./public/index.html'),
    //   filename: "main.html"
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        'REACT_APP_BASEURL': JSON.stringify(process.env.REACT_APP_BASEURL)
      }
    }),
    new ExtractTextPlugin({
            filename: 'build/static/css/[name].css',
            allChunks: true
    }),
    //  // Minify the code.
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     // Disabled because of an issue with Uglify breaking seemingly valid code:
    //     // https://github.com/facebookincubator/create-react-app/issues/2376
    //     // Pending further investigation:
    //     // https://github.com/mishoo/UglifyJS2/issues/2011
    //     comparisons: false,
    //   },
    //   output: {
    //     comments: false,
    //   },
    //   sourceMap: true,
    // }),
  ]
});




var backendConfig = config({
  entry: [
    require.resolve('./conf/polyfills'),
    resolveOwn("./src/serverRender.js"),
  ],
  target: 'node',
  //externals: [nodeExternals()],
  output: {
    path: resolveOwn('./public/build/server'),
    filename: 'serverRender.js',
    libraryTarget: 'commonjs2'
  },
  node: {
  
    __dirname: true,
    __filename: true,
    
  },

  plugins: [
    new webpack.IgnorePlugin(/\.(less|bmp|gif|jpe?g|png)$/),
    new webpack.DefinePlugin({
      'process.env': {
        'REACT_APP_BASEURL': JSON.stringify(process.env.REACT_APP_BASEURL)
      }
    }),
    new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
    })
  ],
});

// tasks

function onBuild(done) {
  return function (err, stats) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }

    if (done) {
      done();
    }
  }
}

gulp.task('frontend-build', function (done) {
  process.env.BABEL_ENV = 'production';
  process.env.NODE_ENV = 'production';
  webpack(frontendConfig).run(onBuild(done));
});


gulp.task('backend-build', function (done) {
  process.env.BABEL_ENV = 'production';
  process.env.NODE_ENV = 'production';
  webpack(backendConfig).run(onBuild(done));
});

gulp.task('build', ['frontend-build', 'backend-build']);

gulp.task('run', function () {
  const nodemon = require('nodemon')
  nodemon({
    script: resolveOwn('./server/index'),
    "watch": [
      "./server/"
     ],
   // exec: "babel-node",
  }).on('restart', function () {
    console.log('Patched!');
  });
});