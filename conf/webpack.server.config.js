var path = require('path');

module.exports = {
  entry: './server/index.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'backend.js'
  }
}