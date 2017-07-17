const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const fs = require('fs-extra');
const DeepMerge = require('deep-merge');
const Visualizer = require('webpack-visualizer-plugin');
const webpackSourceMapSupport = require("webpack-source-map-support");
var cssvariables = require('postcss-css-variables');
require('dotenv').config()
const resolveOwn = relativePath => path.resolve(__dirname, '.', relativePath);

// remove current build
fs.emptyDirSync(resolveOwn("./public/build/"));

const deepmerge = DeepMerge(function (target, source, key) {
  if (target instanceof Array) {
    return [].concat(target, source);
  }
  return source;
});


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

// generic
const defaultConfig = {
  bail: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: 'source-map',
  stats: {
      colors: true,
      chunks: false,
      children: false
  },
  performance: {
    hints: process.env.NODE_ENV !== 'production' ? "warning" : false,
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
            loader: require.resolve('react-svg-loader'),
            query: {
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
        },
      },
      // The notation here is somewhat confusing.
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader normally turns CSS into JS modules injecting <style>,
      // but unlike in development configuration, we do something different.
      // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
      // (second argument), then grabs the result CSS and puts it into a
      // separate file in our build process. This way we actually ship
      // a single CSS file in production instead of JS code injecting <style>
      // tags. If you use code splitting, however, any async bundles will still
      // use the "style" loader inside the async code so CSS from them won't be
      // in the main CSS file.
      // By default we support CSS Modules with the extension .modules.css
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              //fallback: require.resolve('style-loader'),
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
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
             // fallback: require.resolve('style-loader'),
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
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
};


function config(overrides) {
  return deepmerge(defaultConfig, overrides || {});
}

const commonPlugins = [
  new webpack.DefinePlugin({
      'process.env': {
           'PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
           'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
  }),
  new ExtractTextPlugin({
            filename: 'build/static/css/[name].css',
            allChunks: true,
            //ignoreOrder: true,
            // dont use in development, here we want the hot stuff ;P
            disable: process.env.NODE_ENV !== 'production'
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
]

if(process.env.NODE_ENV === 'production'){
  commonPlugins.push(
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),
  )
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
    ...commonPlugins,
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
    ...commonPlugins,
    // //These files are handled by frontend builder
    // new webpack.IgnorePlugin(/\.(less|bmp|gif|jpe?g|png|scss|css)$/),
  ],
});


if(process.env.NODE_ENV === 'development'){
  backendConfig.plugins.push[new webpackSourceMapSupport()]
  frontendConfig.plugins.push[new Visualizer()]
}


// tasks
function onBuild(done) {
  return function (err, stats) {
    if (err) {
      err && console.log(err);
    }else{
      console.log(stats.toString({
          chunks: false, // Makes the build much quieter
          colors: true
      }));
    }
    // KILL EVERYTHING IF FAILING
    if (err || stats.hasErrors()) {
      process.exit()
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

gulp.task('frontend-build-dev', function (done) {
  process.env.BABEL_ENV = 'development';
  process.env.NODE_ENV = 'development';
  webpack(frontendConfig).run(onBuild(done));
});

gulp.task('backend-build-dev', function (done) {
  process.env.BABEL_ENV = 'development';
  process.env.NODE_ENV = 'development';
  webpack(backendConfig).run(onBuild(done));
});

gulp.task('build', ['frontend-build', 'backend-build']);

gulp.task('run', ['frontend-build-dev', 'backend-build-dev'], function () {
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
