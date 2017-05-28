var gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var path = require('path');
var fs = require('fs');
var DeepMerge = require('deep-merge');
var nodemon = require('nodemon');
var WebpackDevServer = require('webpack-dev-server');
require('dotenv').config()

const resolveOwn = relativePath => path.resolve(__dirname, '.', relativePath);



process.env.NODE_ENV = 'development'


var deepmerge = DeepMerge(function (target, source, key) {
  if (target instanceof Array) {
    return [].concat(target, source);
  }
  return source;
});

// generic
var defaultConfig = {
  module: {
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

      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [
            //require.resolve('style-loader'), //not working with sass
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
            // {
            //   loader: require.resolve('sass-loader')
            // }
          ]
        }),
      },
    ],
  },
};

if (process.env.NODE_ENV !== 'production') {
  //defaultConfig.devtool = '#eval-source-map';
  defaultConfig.devtool = 'cheap-module-source-map';
}

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
    path: resolveOwn('./build'),
    filename: 'static/js/main.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveOwn('./public/index.html'),
      filename: "main.html"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'REACT_APP_BASEURL': JSON.stringify(process.env.REACT_APP_BASEURL)
      }
    }),
    new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
    })
  ]
});




var backendConfig = config({
  entry: [
    require.resolve('./conf/polyfills'),
    resolveOwn("./src/app.js"), //this is the part that the server renders
  ],
  target: 'node',
  //externals: [nodeExternals()],
  output: {
    path: resolveOwn('./build/static/js'),
    filename: 'app.js',
    libraryTarget: 'commonjs2'
  },
  node: {
    __dirname: true,
    __filename: true
  },
  module: {
    rules: []
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
  webpack(frontendConfig).run(onBuild(done));
});

gulp.task('frontend-watch', function () {
  webpack(frontendConfig).watch(100, onBuild());

  //   new WebpackDevServer(webpack(frontendConfig), {
  //     publicPath: frontendConfig.output.publicPath,
  //   }).listen(3000, 'localhost', function (err, result) {
  //     if(err) {
  //       console.log(err);
  //     }
  //     else {
  //       console.log('webpack dev server listening at localhost:3000');
  //     }
  //   });

});

gulp.task('backend-build', function (done) {
  webpack(backendConfig).run(onBuild(done));
});

gulp.task('backend-watch', function (done) {
  var firedDone = false;
  webpack(backendConfig).watch(100, function (err, stats) {
    if (!firedDone) {
      firedDone = true;
      done();
    }

    nodemon.restart();
  });
});

gulp.task('build', ['frontend-build', 'backend-build']);
gulp.task('watch', ['frontend-watch', 'backend-watch']);

gulp.task('run', ['frontend-watch', 'backend-watch'], function () {
  nodemon({
    script: resolveOwn('./server/index'),
    exec: "babel-node",
  }).on('restart', function () {
    console.log('Patched!');
  });
});